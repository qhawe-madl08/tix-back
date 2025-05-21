"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, MapPin, Users, Share2, Heart } from "lucide-react"
import Image from "next/image"
import { getEvent } from "@/lib/api"

interface EventDetailsProps {
  id: string
}

export function EventDetails({ id }: EventDetailsProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEvent(id)
        setEvent(data)
      } catch (err) {
        setError("Failed to load event details.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!event) return null

  return (
    <div>
      <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <Badge className="mb-2">{event.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{event.attendees} attending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Organized by {event.organizer}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsSaved(!isSaved)}>
            <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="lineup">Lineup</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{event.longDescription || event.description}</p>
          </div>
        </TabsContent>
        <TabsContent value="lineup" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>Lineup information will be announced soon.</p>
          </div>
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>Frequently asked questions will be posted here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
