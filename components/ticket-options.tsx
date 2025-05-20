"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface TicketOptionsProps {
  eventId: string
}

export function TicketOptions({ eventId }: TicketOptionsProps) {
  const { toast } = useToast()
  const [quantities, setQuantities] = useState({
    general: 0,
    vip: 0,
  })

  // This would be fetched from your API based on the eventId
  const ticketTypes = [
    {
      id: "general",
      name: "General Admission",
      price: 75,
      description: "Access to all main stages and general festival grounds",
      available: 500,
    },
    {
      id: "vip",
      name: "VIP Pass",
      price: 150,
      description: "Premium viewing areas, exclusive lounges, and complimentary refreshments",
      available: 100,
    },
  ]

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 0) return
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const subtotal = ticketTypes.reduce((sum, ticket) => {
    return sum + ticket.price * (quantities[ticket.id as keyof typeof quantities] || 0)
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

    // In a real app, you would add these to a cart
    toast({
      title: "Tickets added to cart",
      description: `${totalTickets} ticket(s) added to your cart`,
    })
  }

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
                onClick={() => handleQuantityChange(ticket.id, quantities[ticket.id as keyof typeof quantities] - 1)}
                disabled={quantities[ticket.id as keyof typeof quantities] <= 0}
              >
                -
              </Button>
              <Input
                type="number"
                min="0"
                value={quantities[ticket.id as keyof typeof quantities] || 0}
                onChange={(e) => handleQuantityChange(ticket.id, Number.parseInt(e.target.value) || 0)}
                className="w-16 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(ticket.id, quantities[ticket.id as keyof typeof quantities] + 1)}
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
