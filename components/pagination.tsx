"use client"

import { Button } from "@/components/ui/button"

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}) {
  const handlePrev = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </Button>
      <span className="px-2 text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  )
}