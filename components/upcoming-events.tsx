import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function UpcomingEvents() {
  // This would be fetched from your API
  const events = [
    {
      id: "1",
      title: "Summer Music Festival",
      image: "/placeholder.svg?height=400&width=600",
      date: "June 15-17, 2024",
      time: "12:00 PM - 11:00 PM",
      location: "Central Park, New York",
      status: "Confirmed",
    },
    {
      id: "2",
      title: "Tech Conference 2024",
      image: "/placeholder.svg?height=400&width=600",
      date: "July 10-12, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center, San Francisco",
      status: "Confirmed",
    },
  ]

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">You don't have any upcoming events.</p>
        <Link href="/events">
          <Button variant="outline" className="mt-4">
            Browse Events
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <Badge className="absolute top-2 right-2">{event.status}</Badge>
          </div>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/events/${event.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
            <Link href={`/dashboard/tickets/${event.id}`}>
              <Button>View Tickets</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
