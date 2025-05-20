import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function FeaturedEvents() {
  // This would be fetched from your API
  const events = [
    {
      id: "1",
      title: "Summer Music Festival",
      image: "/placeholder.svg?height=400&width=600",
      date: "June 15-17, 2024",
      location: "Central Park, New York",
      category: "Music",
    },
    {
      id: "2",
      title: "Tech Conference 2024",
      image: "/placeholder.svg?height=400&width=600",
      date: "July 10-12, 2024",
      location: "Convention Center, San Francisco",
      category: "Conference",
    },
    {
      id: "3",
      title: "International Food Festival",
      image: "/placeholder.svg?height=400&width=600",
      date: "August 5-7, 2024",
      location: "Downtown, Chicago",
      category: "Food & Drink",
    },
  ]

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
