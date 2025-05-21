"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getEvents } from "@/lib/api"

export function FeaturedEvents() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Optionally, pass params to filter for "featured" events if your API supports it
        const data = await getEvents({ featured: "true" })
        setEvents(data)
      } catch (err) {
        setError("Failed to load featured events.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!events.length) return <div>No featured events found.</div>

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Events</h2>
        <Link href="/events">
          <Button variant="outline">View All</Button>
        </Link>
      </div>
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
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
