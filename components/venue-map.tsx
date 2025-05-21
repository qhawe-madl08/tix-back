"use client"

import { useEffect, useState } from "react"
import { getEvent } from "@/lib/api"

export function VenueMap({ eventId }: { eventId: string }) {
  const [venue, setVenue] = useState<{ name: string; address: string; mapUrl?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVenue() {
      setLoading(true)
      setError(null)
      try {
        const event = await getEvent(eventId)
        setVenue({
          name: event.venueName || event.location || "Venue",
          address: event.venueAddress || event.address || "",
          mapUrl: event.venueMapUrl || event.mapUrl || "",
        })
      } catch (err) {
        setError("Failed to load venue information.")
      } finally {
        setLoading(false)
      }
    }
    fetchVenue()
  }, [eventId])

  if (loading) return <div>Loading venue map...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!venue) return <div>No venue information available.</div>

  return (
    <div className="rounded-md border p-4">
      <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
      <p className="mb-4 text-muted-foreground">{venue.address}</p>
      {venue.mapUrl ? (
        <iframe
          src={venue.mapUrl}
          title="Venue Map"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "8px" }}
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="text-muted-foreground">Map not available for this venue.</div>
      )}
    </div>
  )
}