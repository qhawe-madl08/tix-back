"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getEvents } from "@/lib/api"

export function EventsList({
  search = "",
  category = "",
  page = 1,
  pageSize = 9,
}: {
  search?: string
  category?: string
  page?: number
  pageSize?: number
}) {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      setError(null)
      try {
        const params: Record<string, string> = {
          page: page.toString(),
          pageSize: pageSize.toString(),
        }
        if (search) params.search = search
        if (category) params.category = category

        const data = await getEvents(params)
        setEvents(data.events || data) // Adjust if your API returns { events, totalPages }
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        setError("Failed to load events.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [search, category, page, pageSize])

  if (loading) return <div>Loading events...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!events.length) return <div>No events found.</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <Badge className="absolute top-2 right-2">{event.category}</Badge>
          </div>
          <CardHeader>
            <h3 className="text-xl font-bold">{event.title}</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <CalendarDays className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <Link href={`/events/${event.id}`}>
              <Button className="mt-4 w-full">View Details</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}