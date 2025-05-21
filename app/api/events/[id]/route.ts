import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    headers,
    method: "GET",
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch event" }, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data)
}
