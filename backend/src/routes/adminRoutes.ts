import express from "express"
import { prisma } from "../index"
import { authenticate, authorizeRoles } from "../middleware/auth"
import { z } from "zod"

const router = express.Router()

// Validation schema
const updateUserRoleSchema = z.object({
  role: z.enum(["USER", "ORGANIZER", "ADMIN"]),
})

// Get all users (admin only)
router.get("/users", authenticate, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            tickets: true,
            organizedEvents: true,
          },
        },
      },
    })

    res.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update user role (admin only)
router.put("/users/:id/role", authenticate, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const { id } = req.params
    const validation = updateUserRoleSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const { role } = validation.data

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    res.json({
      message: "User role updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error updating user role:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get system stats (admin only)
router.get("/stats", authenticate, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const userCount = await prisma.user.count()
    const eventCount = await prisma.event.count()
    const ticketCount = await prisma.ticket.count()

    const ticketSales = await prisma.ticket.aggregate({
      _count: true,
    })

    const upcomingEvents = await prisma.event.count({
      where: {
        date: {
          gte: new Date(),
        },
      },
    })

    res.json({
      users: userCount,
      events: {
        total: eventCount,
        upcoming: upcomingEvents,
      },
      tickets: {
        total: ticketCount,
      },
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
