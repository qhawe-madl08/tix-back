import express from "express"
import { prisma } from "../index"
import { authenticate, authorizeRoles } from "../middleware/auth"

const router = express.Router()

// Get organizer's events
router.get("/my-events", authenticate, authorizeRoles("ORGANIZER", "ADMIN"), async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        organizerId: req.user!.id,
      },
      include: {
        ticketTypes: true,
      },
    })

    res.json(events)
  } catch (error) {
    console.error("Error fetching organizer events:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get ticket sales for an event
router.get("/events/:eventId/sales", authenticate, async (req, res) => {
  try {
    const { eventId } = req.params

    // Check if event exists and user is authorized
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }

    if (event.organizerId !== req.user!.id && req.user!.role !== "ADMIN") {
      return res.status(403).json({ error: "Not authorized to access this event data" })
    }

    // Get ticket sales data
    const ticketTypes = await prisma.ticketType.findMany({
      where: { eventId },
      include: {
        _count: {
          select: {
            tickets: true,
          },
        },
      },
    })

    const salesData = ticketTypes.map((type) => ({
      ticketTypeId: type.id,
      name: type.name,
      price: type.price,
      totalAvailable: type.quantity,
      sold: type._count.tickets,
      revenue: type._count.tickets * type.price,
    }))

    const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0)
    const totalSold = salesData.reduce((sum, item) => sum + item.sold, 0)

    res.json({
      eventId,
      ticketSales: salesData,
      summary: {
        totalRevenue,
        totalSold,
      },
    })
  } catch (error) {
    console.error("Error fetching ticket sales:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Apply to become an organizer
router.post("/apply", authenticate, async (req, res) => {
  try {
    // Check if user is already an organizer
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    if (user.role === "ORGANIZER" || user.role === "ADMIN") {
      return res.status(400).json({ error: "User is already an organizer or admin" })
    }

    // Update user role to organizer
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        role: "ORGANIZER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    res.json({
      message: "Successfully upgraded to organizer role",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error applying for organizer role:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
