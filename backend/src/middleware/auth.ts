import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface TokenPayload {
  userId: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        role: string
      }
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" })
    }

    const token = authHeader.split(" ")[1]
    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error("JWT_SECRET is not defined")
    }

    const decoded = jwt.verify(token, secret) as TokenPayload

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    }

    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Not authorized to access this resource" })
    }

    next()
  }
}
