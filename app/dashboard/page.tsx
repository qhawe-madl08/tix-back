import { UpcomingEvents } from "@/components/upcoming-events"
import { TicketStats } from "@/components/ticket-stats"

export const metadata = {
  title: "Dashboard | Event Ticketing Platform",
  description: "Manage your tickets and events",
}

export default function DashboardPage() {
  return (
    <div>
      <TicketStats />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Upcoming Events</h2>
        <UpcomingEvents />
      </div>
    </div>
  )
}
