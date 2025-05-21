const API_URL = process.env.NEXT_PUBLIC_API_URL

// Helper to build URLs
function buildUrl(path: string, params?: Record<string, string>) {
  const url = new URL(`${API_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  }
  return url.toString()
}

// Fetch all events (optionally filtered)
export async function getEvents(params?: Record<string, string>) {
  const response = await fetch(buildUrl("/events", params), {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch events")
  }

  return response.json()
}

// Fetch a single event by ID
export async function getEvent(id: string) {
  const response = await fetch(buildUrl(`/events/${id}`), {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch event")
  }

  return response.json()
}

// Purchase tickets
export async function purchaseTickets(data: {
  eventId: string
  tickets: Array<{ typeId: string; quantity: number }>
  customerInfo: Record<string, string>
}) {
  const response = await fetch(buildUrl("/tickets/purchase"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to purchase tickets")
  }

  return response.json()
}

// Fetch tickets for the logged-in user
export async function getUserTickets() {
  const response = await fetch(buildUrl("/tickets/my-tickets"), {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user tickets")
  }

  return response.json()
}

// Optionally: Fetch ticket types for an event (if your backend supports it)
export async function getTicketTypes(eventId: string) {
  const response = await fetch(buildUrl(`/events/${eventId}/ticket-types`), {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch ticket types")
  }

  return response.json()
}

// Optionally: User authentication (example)
export async function loginUser(email: string, password: string) {
  const response = await fetch(buildUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Failed to login")
  }

  return response.json()
}

export async function registerUser(data: { name: string; email: string; password: string }) {
  const response = await fetch(buildUrl("/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to register")
  }

  return response.json()
}

// Add more API functions as needed, always using buildUrl and API_URL
