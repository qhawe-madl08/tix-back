import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import eventRoutes from "./routes/eventRoutes"
import ticketRoutes from "./routes/ticketRoutes"
import organizerRoutes from "./routes/organizerRoutes"
import adminRoutes from "./routes/adminRoutes"

// Load environment variables
dotenv.config()

// Initialize Prisma client
export const prisma = new PrismaClient()

// Create Express app
const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/events", eventRoutes)
app.use("/tickets", ticketRoutes)
app.use("/organizers", organizerRoutes)
app.use("/admin", adminRoutes)

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "API is running" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect()
  process.exit(0)
})
