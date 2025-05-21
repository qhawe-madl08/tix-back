import express, { Request, Response, NextFunction } from "express"
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
const NODE_ENV = process.env.NODE_ENV || "development"

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
)
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" })
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err)
  res.status(500).json({ error: "Internal server error" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${NODE_ENV}]`)
})

// Handle graceful shutdown
const shutdown = async () => {
  console.log("Shutting down gracefully...")
  await prisma.$disconnect()
  process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
