import { NextResponse } from "next/server"

// This is a simple example of how to create a route handler
// that would proxy requests to your backend API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Forward the request to your backend API
  const response = await fetch(`${process.env.API_URL}/events?${searchParams.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      // Add any authentication headers if needed
    },
  })

  const data = await response.json()

  return NextResponse.json(data)
}
