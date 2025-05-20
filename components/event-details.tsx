"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, MapPin, Users, Share2, Heart } from "lucide-react"
import Image from "next/image"

interface EventDetailsProps {
  id: string
}

export function EventDetails({ id }: EventDetailsProps) {
  const [isSaved, setIsSaved] = useState(false)

  // This would be fetched from your API based on the ID
  const event = {
    id,
    title: "Summer Music Festival",
    description:
      "Join us for three days of amazing music across five stages featuring top artists from around the world. Enjoy food vendors, art installations, and more in the beautiful setting of Central Park.",
    longDescription:
      "The Summer Music Festival is the premier music event of the season, featuring over 50 artists across multiple genres. From rock and pop to electronic and hip-hop, there's something for everyone. In addition to the music, explore art installations, gourmet food vendors, and interactive experiences throughout the festival grounds. VIP packages include exclusive viewing areas, premium food and beverage options, and special artist meet-and-greets.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "June 15-17, 2024",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    organizer: "Festival Productions Inc.",
    category: "Music",
    attendees: 1250,
  }

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
            <p>{event.longDescription}</p>
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
