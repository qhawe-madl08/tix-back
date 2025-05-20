import express from "express"
import { prisma } from "../index"
import { authenticate } from "../middleware/auth"
import { z } from "zod"
import crypto from "crypto"

const router = express.Router()

// Validation schema
const purchaseSchema = z.object({
  eventId: z.string().uuid(),
  ticketTypeId: z.string().uuid(),
  quantity: z.number().int().positive(),
})

// Get user's tickets
router.get("/my-tickets", authenticate, async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        userId: req.user!.id,
      },
      include: {
        event: true,
        ticketType: true,
      },
    })

    res.json(tickets)
  } catch (error) {
    console.error("Error fetching tickets:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Purchase tickets
router.post("/purchase", authenticate, async (req, res) => {
  try {
    const validation = purchaseSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const { eventId, ticketTypeId, quantity } = validation.data

    // Check if ticket type exists and has enough available tickets
    const ticketType = await prisma.ticketType.findUnique({
      where: { id: ticketTypeId },
    })

    if (!ticketType) {
      return res.status(404).json({ error: "Ticket type not found" })
    }

    if (ticketType.quantity < quantity) {
      return res.status(400).json({ error: "Not enough tickets available" })
    }

    // Create tickets
    const tickets = []

    for (let i = 0; i < quantity; i++) {
      // Generate unique QR code
      const qrCode = crypto.randomBytes(16).toString("hex")

      const ticket = await prisma.ticket.create({
        data: {
          userId: req.user!.id,
          eventId,
          ticketTypeId,
          qrCode,
        },
        include: {
          event: true,
          ticketType: true,
        },
      })

      tickets.push(ticket)
    }

    // Update available ticket quantity
    await prisma.ticketType.update({
      where: { id: ticketTypeId },
      data: {
        quantity: ticketType.quantity - quantity,
      },
    })

    res.status(201).json({
      message: "Tickets purchased successfully",
      tickets,
    })
  } catch (error) {
    console.error("Error purchasing tickets:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Verify ticket
router.post("/verify/:qrCode", authenticate, async (req, res) => {
  try {
    const { qrCode } = req.params

    const ticket = await prisma.ticket.findFirst({
      where: { qrCode },
      include: {
        event: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" })
    }

    if (ticket.isUsed) {
      return res.status(400).json({ error: "Ticket has already been used" })
    }

    // Mark ticket as used
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticket.id },
      data: { isUsed: true },
      include: {
        event: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    res.json({
      message: "Ticket verified successfully",
      ticket: updatedTicket,
    })
  } catch (error) {
    console.error("Error verifying ticket:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
