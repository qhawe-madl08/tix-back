"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { getEvent } from "@/lib/api" // Or import a getTicketTypes(eventId) if you have one

interface TicketType {
  id: string
  name: string
  price: number
  description: string
  available: number
}

interface TicketOptionsProps {
  eventId: string
}

export function TicketOptions({ eventId }: TicketOptionsProps) {
  const { toast } = useToast()
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTicketTypes() {
      setLoading(true)
      setError(null)
      try {
        // Fetch event details and extract ticket types
        const event = await getEvent(eventId)
        setTicketTypes(event.ticketTypes || [])
        // Initialize quantities for each ticket type
        const initialQuantities: Record<string, number> = {}
        ;(event.ticketTypes || []).forEach((tt: TicketType) => {
          initialQuantities[tt.id] = 0
        })
        setQuantities(initialQuantities)
      } catch (err) {
        setError("Failed to load ticket types.")
      } finally {
        setLoading(false)
      }
    }
    fetchTicketTypes()
  }, [eventId])

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 0) return
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const subtotal = ticketTypes.reduce((sum, ticket) => {
    return sum + ticket.price * (quantities[ticket.id] || 0)
  }, 0)

  const handleAddToCart = () => {
    const totalTickets = Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
    if (totalTickets === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to continue",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would add these to a cart or context
    toast({
      title: "Tickets added to cart",
      description: `${totalTickets} ticket(s) added to your cart`,
    })
  }

  if (loading) return <div>Loading ticket options...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!ticketTypes.length) return <div>No ticket types available for this event.</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ticketTypes.map((ticket) => (
          <div key={ticket.id} className="space-y-2">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{ticket.name}</h3>
                <p className="text-sm text-muted-foreground">{ticket.description}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${ticket.price}</p>
                <p className="text-xs text-muted-foreground">{ticket.available} available</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(ticket.id, (quantities[ticket.id] || 0) - 1)}
                disabled={(quantities[ticket.id] || 0) <= 0}
              >
                -
              </Button>
              <Input
                type="number"
                min="0"
                value={quantities[ticket.id] || 0}
                onChange={(e) => handleQuantityChange(ticket.id, Number.parseInt(e.target.value) || 0)}
                className="w-16 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(ticket.id, (quantities[ticket.id] || 0) + 1)}
                disabled={(quantities[ticket.id] || 0) >= ticket.available}
              >
                +
              </Button>
            </div>
            <Separator className="my-4" />
          </div>
        ))}

        <div className="flex justify-between font-medium">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <p className="text-xs text-muted-foreground">Additional fees and taxes will be calculated at checkout</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
