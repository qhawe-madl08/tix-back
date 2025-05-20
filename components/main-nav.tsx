import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from "lucide-react"
import { UserNav } from "@/components/user-nav"

export function MainNav() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            EventTix
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/events" className="text-sm font-medium hover:underline">
              Events
            </Link>
            <Link href="/organizers" className="text-sm font-medium hover:underline">
              Organizers
            </Link>
            <Link href="/venues" className="text-sm font-medium hover:underline">
              Venues
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search events..."
              className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background"
            />
          </div>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
