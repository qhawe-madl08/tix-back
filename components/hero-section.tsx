import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-90" />
      <div className="relative container mx-auto px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Find and book</span>
            <span className="block text-rose-500">amazing events</span>
          </h1>
          <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Discover concerts, sports, theater, and more. Get tickets to your favorite events in just a few clicks.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start gap-4">
            <Link href="/events">
              <Button size="lg">Browse Events</Button>
            </Link>
            <Link href="/organizers/apply">
              <Button variant="outline" size="lg">
                Become an Organizer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
