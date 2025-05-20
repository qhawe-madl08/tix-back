import { Card, CardContent } from "@/components/ui/card"
import { Music, Ticket, Utensils, Briefcase, Gamepad2, Film } from "lucide-react"
import Link from "next/link"

export function EventCategories() {
  const categories = [
    {
      name: "Concerts",
      icon: <Music className="h-8 w-8 mb-2" />,
      color: "bg-pink-100 dark:bg-pink-900",
      textColor: "text-pink-500",
      href: "/events?category=concerts",
    },
    {
      name: "Sports",
      icon: <Ticket className="h-8 w-8 mb-2" />,
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-500",
      href: "/events?category=sports",
    },
    {
      name: "Food & Drink",
      icon: <Utensils className="h-8 w-8 mb-2" />,
      color: "bg-yellow-100 dark:bg-yellow-900",
      textColor: "text-yellow-500",
      href: "/events?category=food-drink",
    },
    {
      name: "Business",
      icon: <Briefcase className="h-8 w-8 mb-2" />,
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-500",
      href: "/events?category=business",
    },
    {
      name: "Gaming",
      icon: <Gamepad2 className="h-8 w-8 mb-2" />,
      color: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-500",
      href: "/events?category=gaming",
    },
    {
      name: "Cinema",
      icon: <Film className="h-8 w-8 mb-2" />,
      color: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-500",
      href: "/events?category=cinema",
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className={`flex flex-col items-center justify-center p-6 ${category.color}`}>
                <div className={category.textColor}>{category.icon}</div>
                <h3 className="font-medium text-center">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
