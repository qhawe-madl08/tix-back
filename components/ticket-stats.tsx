import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TicketIcon, Calendar, Clock, ArrowUpRight } from "lucide-react"

export function TicketStats() {
  // This would be fetched from your API
  const stats = {
    totalTickets: 5,
    upcomingEvents: 2,
    pastEvents: 3,
    nextEvent: {
      title: "Summer Music Festival",
      date: "June 15, 2024",
      daysUntil: 21,
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          <TicketIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTickets}</div>
          <p className="text-xs text-muted-foreground">Tickets purchased</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
          <p className="text-xs text-muted-foreground">Events to attend</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Past Events</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pastEvents}</div>
          <p className="text-xs text-muted-foreground">Events attended</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Event</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.nextEvent.daysUntil} days</div>
          <p className="text-xs text-muted-foreground">Until {stats.nextEvent.title}</p>
        </CardContent>
      </Card>
    </div>
  )
}
