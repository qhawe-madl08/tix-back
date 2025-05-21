"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getUserTickets } from "@/lib/api" // <-- Implement this API call

type Ticket = {
  id: string
  eventId: string
  eventName: string
  eventImage: string
  ticketType: string
  date: string // ISO string or formatted date
  location: string
  qrCode: string
  isPast?: boolean
}

export function UserTickets() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [tickets, setTickets] = useState<{ upcoming: Ticket[]; past: Ticket[] }>({ upcoming: [], past: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTickets() {
      setLoading(true)
      setError(null)
      try {
        const data: Ticket[] = await getUserTickets()
        // Split tickets into upcoming and past based on date
        const now = new Date()
        const upcoming: Ticket[] = []
        const past: Ticket[] = []
        data.forEach((ticket) => {
          const eventDate = new Date(ticket.date)
          if (eventDate >= now) {
            upcoming.push(ticket)
          } else {
            past.push(ticket)
          }
        })
        setTickets({ upcoming, past })
      } catch (err) {
        setError("Failed to load your tickets.")
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [])

  const renderTickets = (ticketList: Ticket[]) => {
    if (loading) {
      return <div>Loading tickets...</div>
    }
    if (error) {
      return <div className="text-red-500">{error}</div>
    }
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
