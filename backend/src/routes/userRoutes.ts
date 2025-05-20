import express from "express"
import { prisma } from "../index"
import { authenticate } from "../middleware/auth"
import { z } from "zod"
import bcrypt from "bcrypt"

const router = express.Router()

// Validation schema
const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
})

// Get current user profile
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update user profile
router.put("/me", authenticate, async (req, res) => {
  try {
    const validation = updateUserSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const { name, email, currentPassword, newPassword } = validation.data

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: "Current password is required to set a new password" })
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Current password is incorrect" })
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        name: name !== undefined ? name : user.name,
        email: email !== undefined ? email : user.email,
        password: newPassword ? await bcrypt.hash(newPassword, 10) : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
