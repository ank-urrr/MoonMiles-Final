"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Star, TrendingUp, Palmtree, Mountain, Building2, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const destinations = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: "/eiffel-tower-paris-at-night-with-lights.jpg",
    tags: ["Popular", "Romantic", "City"],
    rating: 4.8,
    price: "$1,200",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "/bali-temple-on-cliff-overlooking-ocean-sunset.jpg",
    tags: ["Adventure", "Nature", "Budget"],
    rating: 4.9,
    price: "$800",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "/tokyo-neon-lights-shibuya-crossing-at-night.jpg",
    tags: ["Popular", "City", "Culture"],
    rating: 4.7,
    price: "$1,500",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    image: "/dubai-skyline-with-burj-khalifa-at-sunset.jpg",
    tags: ["Luxury", "City", "Popular"],
    rating: 4.6,
    price: "$2,000",
  },
  {
    id: "london",
    name: "London",
    country: "UK",
    image: "/london-tower-bridge-at-dusk-blue-hour.jpg",
    tags: ["Popular", "City", "Culture"],
    rating: 4.5,
    price: "$1,400",
  },
  {
    id: "new-york",
    name: "New York",
    country: "USA",
    image: "/new-york-city-manhattan-skyline-night-lights.jpg",
    tags: ["Popular", "City", "Nightlife"],
    rating: 4.7,
    price: "$1,600",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    image: "/maldives-overwater-bungalow-turquoise-water.jpg",
    tags: ["Luxury", "Beach", "Romantic"],
    rating: 4.9,
    price: "$3,500",
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: "/santorini-white-buildings-blue-domes-sunset.jpg",
    tags: ["Romantic", "Seasonal", "Beach"],
    rating: 4.8,
    price: "$1,800",
  },
]

const filterTags = [
  { label: "All", icon: Filter },
  { label: "Popular", icon: TrendingUp },
  { label: "Beach", icon: Palmtree },
  { label: "Mountain", icon: Mountain },
  { label: "City", icon: Building2 },
  { label: "Romantic", icon: Heart },
]

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "All" || dest.tags.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Explore <span className="text-primary">Destinations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
          >
            Discover breathtaking locations around the world. From tropical beaches to vibrant cities, find your perfect
            getaway.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-xl bg-card border-border"
              />
            </div>
          </motion.div>

          {/* Filter Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filterTags.map((tag) => (
              <Button
                key={tag.label}
                variant={activeFilter === tag.label ? "default" : "outline"}
                onClick={() => setActiveFilter(tag.label)}
                className={`rounded-full ${activeFilter === tag.label ? "btn-gradient text-white border-0" : ""}`}
              >
                <tag.icon className="w-4 h-4 mr-2" />
                {tag.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/destinations/${destination.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {destination.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-1 text-primary mb-2">
                        <Star className="w-4 h-4 fill-primary" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{destination.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {destination.country}
                        </p>
                        <p className="text-primary font-semibold">From {destination.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setActiveFilter("All")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
