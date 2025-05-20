"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function UserTickets() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // This would be fetched from your API
  const tickets = {
    upcoming: [
      {
        id: "ticket1",
        eventId: "1",
        eventName: "Summer Music Festival",
        eventImage: "/placeholder.svg?height=400&width=600",
        ticketType: "VIP Pass",
        date: "June 15-17, 2024",
        location: "Central Park, New York",
        qrCode: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "ticket2",
        eventId: "2",
        eventName: "Tech Conference 2024",
        eventImage: "/placeholder.svg?height=400&width=600",
        ticketType: "General Admission",
        date: "July 10-12, 2024",
        location: "Convention Center, San Francisco",
        qrCode: "/placeholder.svg?height=200&width=200",
      },
    ],
    past: [
      {
        id: "ticket3",
        eventId: "3",
        eventName: "Winter Concert Series",
        eventImage: "/placeholder.svg?height=400&width=600",
        ticketType: "General Admission",
        date: "December 10-12, 2023",
        location: "Music Hall, Boston",
        qrCode: "/placeholder.svg?height=200&width=200",
      },
    ],
  }

  const renderTickets = (ticketList: typeof tickets.upcoming) => {
    if (ticketList.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tickets found.</p>
          <Link href="/events">
            <Button variant="outline" className="mt-4">
              Browse Events
            </Button>
          </Link>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {ticketList.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative h-48 md:h-full">
                <Image
                  src={ticket.eventImage || "/placeholder.svg"}
                  alt={ticket.eventName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:col-span-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{ticket.eventName}</h3>
                    <Badge>{ticket.ticketType}</Badge>
                    <p className="mt-4 text-sm text-muted-foreground">{ticket.date}</p>
                    <p className="text-sm text-muted-foreground">{ticket.location}</p>
                  </div>
                  <div className="hidden md:block">
                    <Image src={ticket.qrCode || "/placeholder.svg"} alt="QR Code" width={100} height={100} />
                  </div>
                </div>
                <CardFooter className="px-0 pt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    <QrCode className="mr-2 h-4 w-4" /> View Ticket
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="mt-6">
        {renderTickets(tickets.upcoming)}
      </TabsContent>
      <TabsContent value="past" className="mt-6">
        {renderTickets(tickets.past)}
      </TabsContent>
    </Tabs>
  )
}
