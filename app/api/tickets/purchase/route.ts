import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // Forward the request to your backend API
  const response = await fetch(`${process.env.API_URL}/tickets/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any authentication headers if needed
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  return NextResponse.json(data)
}
