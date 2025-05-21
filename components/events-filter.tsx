"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventsFilter({
  onFilter,
}: {
  onFilter?: (filters: { search: string; category: string }) => void
}) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onFilter) {
      onFilter({ search, category })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Search events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
          <SelectItem value="music">Music</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="conference">Conference</SelectItem>
          <SelectItem value="workshop">Workshop</SelectItem>
          {/* Add more categories as needed */}
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full">
        Filter
      </Button>
    </form>
  )
}