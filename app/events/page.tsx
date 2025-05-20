import { EventsFilter } from "@/components/events-filter"
import { EventsList } from "@/components/events-list"
import { Pagination } from "@/components/pagination"

export const metadata = {
  title: "Browse Events | Event Ticketing Platform",
  description: "Discover and book tickets for upcoming events",
}

export default function EventsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Browse Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <EventsFilter />
        </div>
        <div className="md:col-span-3">
          <EventsList />
          <div className="mt-8">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}
