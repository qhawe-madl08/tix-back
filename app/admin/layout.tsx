import type React from "react"
import { AdminNav } from "@/components/admin-nav"

export const metadata = {
  title: "Admin | Event Ticketing Platform",
  description: "Admin dashboard for event management",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-1">
          <AdminNav />
        </div>
        <div className="md:col-span-4">{children}</div>
      </div>
    </div>
  )
}
