import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface TokenPayload {
  userId: string
  role: string
  // Add other custom claims here if needed
}

// Extend Express Request type to include user
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

/**
 * Authentication middleware.
 * Checks for JWT in Authorization header (Bearer) or cookies.
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined

    // Prefer Authorization header, fallback to cookie
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token
    }

    if (!token) {
      return res.status(401).json({ error: "Authentication required" })
    }

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
    console.error("Auth error:", error)
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

/**
 * Authorization middleware.
 * Restricts access to users with specific roles.
 */
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
