import { EventDetails } from "@/components/event-details"
import { TicketOptions } from "@/components/ticket-options"
import { VenueMap } from "@/components/venue-map"
import { RelatedEvents } from "@/components/related-events"

export const metadata = {
  title: "Event Details | Event Ticketing Platform",
  description: "View details and purchase tickets for this event",
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <EventDetails id={params.id} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="md:col-span-2">
          <VenueMap />
        </div>
        <div className="md:col-span-1">
          <TicketOptions eventId={params.id} />
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <RelatedEvents eventId={params.id} />
      </div>
    </div>
  )
}
