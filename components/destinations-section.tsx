"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Star, Thermometer } from "lucide-react"

const destinations = [
  {
    name: "Paris",
    country: "France",
    image: "/eiffel-tower-paris-at-night-with-lights.jpg",
    description: "The City of Light awaits with iconic landmarks, world-class cuisine, and romantic ambiance.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"],
    rating: 4.9,
    weather: "15°C",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "/bali-temple-on-cliff-overlooking-ocean-sunset.jpg",
    imageZoom: 1.12,
    description: "Tropical paradise with stunning temples, lush rice terraces, and pristine beaches.",
    highlights: ["Ubud Temples", "Rice Terraces", "Beach Clubs"],
    rating: 4.8,
    weather: "28°C",
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "/tokyo-neon-lights-shibuya-crossing-at-night.jpg",
    imageZoom: 1.12,
    description: "Where ancient tradition meets cutting-edge technology in a mesmerizing urban landscape.",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Mt. Fuji"],
    rating: 4.9,
    weather: "18°C",
  },
  {
    name: "Dubai",
    country: "UAE",
    image: "/dubai-skyline-with-burj-khalifa-at-sunset.jpg",
    description: "A dazzling metropolis of luxury, architectural marvels, and desert adventures.",
    highlights: ["Burj Khalifa", "Desert Safari", "Palm Jumeirah"],
    rating: 4.7,
    weather: "32°C",
  },
  {
    name: "London",
    country: "UK",
    image: "/london-tower-bridge-at-dusk-blue-hour.jpg",
    description: "Historic charm meets modern vibrancy in this iconic world capital.",
    highlights: ["Big Ben", "Tower Bridge", "Buckingham Palace"],
    rating: 4.8,
    weather: "12°C",
  },
  {
    name: "New York",
    country: "USA",
    image: "/new-york-city-manhattan-skyline-night-lights.jpg",
    description: "The city that never sleeps, filled with culture, entertainment, and endless possibilities.",
    highlights: ["Times Square", "Central Park", "Statue of Liberty"],
    rating: 4.8,
    weather: "16°C",
  },
]

export function DestinationsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 bg-secondary/20 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Popular{" "}
            <span className="bg-gradient-to-r from-primary via-[#FF5F6D] to-accent bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Discover the world's most breathtaking locations, handpicked for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[3/4]"
              onMouseEnter={() => setHoveredCard(destination.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img
                src={destination.image || "/placeholder.svg"}
                alt={`${destination.name}, ${destination.country}`}
                className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                  destination.imageZoom ? `scale-[${destination.imageZoom}] group-hover:scale-125` : "group-hover:scale-110"
                }`}
              />

              {/* Default overlay - shows name and country */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity duration-300 ${
                  hoveredCard === destination.name ? "opacity-0" : "opacity-100"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 ${
                  hoveredCard === destination.name ? "opacity-0" : "opacity-100"
                }`}
              >
                <h3 className="text-2xl font-bold text-foreground mb-1">{destination.name}</h3>
                <p className="text-muted-foreground">{destination.country}</p>
              </div>

              {/* Hover overlay with detailed info */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredCard === destination.name ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-background/85 backdrop-blur-sm p-6 flex flex-col justify-between pointer-events-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-foreground">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4 fill-primary" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mb-4">{destination.description}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <Thermometer className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Avg. {destination.weather}</span>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight) => (
                        <span key={highlight} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{destination.country}</span>
                </div>
              </motion.div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
