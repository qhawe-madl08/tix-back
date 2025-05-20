import { HeroSection } from "@/components/hero-section"
import { FeaturedEvents } from "@/components/featured-events"
import { EventCategories } from "@/components/event-categories"
import { Newsletter } from "@/components/newsletter"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <FeaturedEvents />
      <EventCategories />
      <Newsletter />
    </div>
  )
}
