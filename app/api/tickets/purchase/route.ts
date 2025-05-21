import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // Prepare headers and forward auth/cookies if present
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }
  const authHeader = request.headers.get("authorization")
  if (authHeader) {
    headers["authorization"] = authHeader
  }
  const cookie = request.headers.get("cookie")
  if (cookie) {
    headers["cookie"] = cookie
  }

  // Forward the request to your backend API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/purchase`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    return NextResponse.json(
      { error: error.error || "Failed to purchase tickets" },
      { status: response.status }
    )
  }

  const data = await response.json()
  return NextResponse.json(data)
}
