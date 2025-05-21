import { useState } from "react"
import { EventsFilter } from "@/components/events-filter"
import { EventsList } from "@/components/events-list"
import { Pagination } from "@/components/pagination"

export const metadata = {
  title: "Browse Events | Event Ticketing Platform",
  description: "Discover and book tickets for upcoming events",
}

export default function EventsPage() {
  const [filters, setFilters] = useState<{ search: string; category: string }>({ search: "", category: "" })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // This handler will be called by EventsList when total pages change
  const handleTotalPages = (pages: number) => {
    setTotalPages(pages)
    // If current page is out of range, reset to 1
    if (page > pages) setPage(1)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Browse Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <EventsFilter
            onFilter={(f) => {
              setFilters(f)
              setPage(1)
            }}
          />
        </div>
        <div className="md:col-span-3">
          <EventsList
            search={filters.search}
            category={filters.category}
            page={page}
            pageSize={9}
            onTotalPages={handleTotalPages}
          />
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
