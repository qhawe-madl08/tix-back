import { NextResponse } from "next/server"

// Real-world proxy: forwards query params and cookies/auth headers if present
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Prepare backend URL
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/events?${searchParams.toString()}`

  // Forward cookies and headers for authentication/session if needed
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  // Optionally forward the Authorization header if present
  const authHeader = request.headers.get("authorization")
  if (authHeader) {
    headers["authorization"] = authHeader
  }

  // Optionally forward cookies
  const cookie = request.headers.get("cookie")
  if (cookie) {
    headers["cookie"] = cookie
  }

  const response = await fetch(backendUrl, {
    headers,
    // Forward credentials if needed (for SSR, not for client-side fetch)
    // credentials: "include", // Not supported in edge runtime, but kept for reference
    method: "GET",
    // cache: "no-store", // Uncomment if you want to disable caching
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data)
}
