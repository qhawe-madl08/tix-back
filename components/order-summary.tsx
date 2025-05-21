import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Ticket = {
  type: string
  quantity: number
  price: number
}

type OrderDetails = {
  eventName: string
  eventDate: string
  tickets: Ticket[]
  fees: number
  taxes: number
}

export function OrderSummary({ orderDetails }: { orderDetails: OrderDetails }) {
  // Calculate totals
  const subtotal = orderDetails.tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)
  const total = subtotal + orderDetails.fees + orderDetails.taxes

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">{orderDetails.eventName}</h3>
          <p className="text-sm text-muted-foreground">{orderDetails.eventDate}</p>
        </div>

        <Separator />

        <div className="space-y-2">
          {orderDetails.tickets.map((ticket, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <p>{ticket.type}</p>
                <p className="text-sm text-muted-foreground">Qty: {ticket.quantity}</p>
              </div>
              <p>${(ticket.price * ticket.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Service Fees</p>
            <p>${orderDetails.fees.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Taxes</p>
            <p>${orderDetails.taxes.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between font-medium border-t pt-4">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </CardFooter>
    </Card>
  )
}
