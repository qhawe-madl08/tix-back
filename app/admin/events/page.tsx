import { Button } from "@/components/ui/button"
import { AdminEventsList } from "@/components/admin-events-list"
import Link from "next/link"

export default function AdminEventsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <Link href="/admin/events/create">
          <Button>Create New Event</Button>
        </Link>
      </div>
      <AdminEventsList />
    </div>
  )
}
