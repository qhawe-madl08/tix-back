"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getEvents, getEvent } from "@/lib/api"

export function RelatedEvents({ eventId }: { eventId: string }) {
  const [related, setRelated] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRelated() {
      setLoading(true)
      setError(null)
      try {
        // Fetch the current event to get its category
        const event = await getEvent(eventId)
        // Fetch events in the same category, excluding the current event
        const data = await getEvents({ category: event.category })
        const filtered = (data.events || data).filter((e: any) => e.id !== eventId)
        setRelated(filtered.slice(0, 3)) // Show up to 3 related events
      } catch (err) {
        setError("Failed to load related events.")
      } finally {
        setLoading(false)
      }
    }
    fetchRelated()
  }, [eventId])

  if (loading) return <div>Loading related events...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!related.length) return <div>No related events found.</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {related.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="relative h-40">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <Badge className="absolute top-2 right-2">{event.category}</Badge>
          </div>
          <CardHeader>
            <h3 className="text-lg font-bold">{event.title}</h3>
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