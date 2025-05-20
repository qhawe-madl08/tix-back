import express from "express"
import { prisma } from "../index"
import { authenticate, authorizeRoles } from "../middleware/auth"
import { z } from "zod"

const router = express.Router()

// Validation schemas
const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  date: z.string().transform((str) => new Date(str)),
  endDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  location: z.string(),
  imageUrl: z.string().optional(),
  ticketTypes: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .optional(),
})

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
          },
        },
        ticketTypes: true,
      },
    })

    res.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get event by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
          },
        },
        ticketTypes: true,
      },
    })

    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }

    res.json(event)
  } catch (error) {
    console.error("Error fetching event:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Create event (requires authentication and organizer/admin role)
router.post("/", authenticate, authorizeRoles("ORGANIZER", "ADMIN"), async (req, res) => {
  try {
    const validation = eventSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    const { ticketTypes, ...eventData } = validation.data

    const event = await prisma.event.create({
      data: {
        ...eventData,
        organizerId: req.user!.id,
        ticketTypes: ticketTypes
          ? {
              create: ticketTypes,
            }
          : undefined,
      },
      include: {
        ticketTypes: true,
      },
    })

    res.status(201).json(event)
  } catch (error) {
    console.error("Error creating event:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update event
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params
    const validation = eventSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors })
    }

    // Check if event exists and user is authorized
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    })

    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" })
    }

    // Only allow organizer or admin to update
    if (existingEvent.organizerId !== req.user!.id && req.user!.role !== "ADMIN") {
      return res.status(403).json({ error: "Not authorized to update this event" })
    }

    const { ticketTypes, ...eventData } = validation.data

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: eventData,
      include: {
        ticketTypes: true,
      },
    })

    res.json(updatedEvent)
  } catch (error) {
    console.error("Error updating event:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete event
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params

    // Check if event exists and user is authorized
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    })

    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" })
    }

    // Only allow organizer or admin to delete
    if (existingEvent.organizerId !== req.user!.id && req.user!.role !== "ADMIN") {
      return res.status(403).json({ error: "Not authorized to delete this event" })
    }

    await prisma.event.delete({
      where: { id },
    })

    res.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Error deleting event:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
