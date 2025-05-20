import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Forward the request to your backend API
  const response = await fetch(`${process.env.API_URL}/events/${id}`, {
    headers: {
      "Content-Type": "application/json",
      // Add any authentication headers if needed
    },
  })

  const data = await response.json()

  return NextResponse.json(data)
}
