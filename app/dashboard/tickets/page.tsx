import { UserTickets } from "@/components/user-tickets"

export const metadata = {
  title: "My Tickets | Event Ticketing Platform",
  description: "View and manage your purchased tickets",
}

export default function TicketsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
      <UserTickets />
    </div>
  )
}
