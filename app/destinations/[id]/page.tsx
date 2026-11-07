"use client"

import { use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Thermometer,
  DollarSign,
  Plane,
  Hotel,
  Car,
  Sun,
  Cloud,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const destinationsData: Record<
  string,
  {
    name: string
    country: string
    image: string
    description: string
    rating: number
    mood: string[]
    bestTime: string
    weather: { temp: string; condition: string }
    budget: { flights: string; hotels: string; transport: string; total: string }
    thingsToDo: { title: string; description: string }[]
    itinerary: { day: number; title: string; activities: string[] }[]
  }
> = {
  paris: {
    name: "Paris",
    country: "France",
    image: "/eiffel-tower-paris-at-night-with-lights.jpg",
    description:
      "The City of Light enchants visitors with its iconic landmarks, world-class museums, and romantic ambiance. From the Eiffel Tower to charming cafés, Paris offers an unforgettable experience.",
    rating: 4.8,
    mood: ["Romantic", "Cultural", "Luxury"],
    bestTime: "April - June, September - November",
    weather: { temp: "15°C - 25°C", condition: "Mild" },
    budget: { flights: "$600 - $1,200", hotels: "$150 - $400/night", transport: "$50/day", total: "$1,200 - $2,500" },
    thingsToDo: [
      { title: "Eiffel Tower", description: "Iconic iron tower with stunning city views" },
      { title: "Louvre Museum", description: "World's largest art museum" },
      { title: "Montmartre", description: "Bohemian hilltop district" },
      { title: "Seine River Cruise", description: "Romantic boat ride through the city" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Iconic Landmarks",
        activities: ["Eiffel Tower visit", "Seine River cruise", "Dinner in Le Marais"],
      },
      { day: 2, title: "Art & Culture", activities: ["Louvre Museum", "Tuileries Garden", "Musée d'Orsay"] },
      { day: 3, title: "Local Experience", activities: ["Montmartre exploration", "Sacré-Cœur", "Local café hopping"] },
    ],
  },
  bali: {
    name: "Bali",
    country: "Indonesia",
    image: "/bali-temple-on-cliff-overlooking-ocean-sunset.jpg",
    description:
      "A tropical paradise known for its stunning temples, lush rice terraces, and beautiful beaches. Bali offers a perfect blend of adventure, relaxation, and spiritual experiences.",
    rating: 4.9,
    mood: ["Adventure", "Nature", "Relaxing"],
    bestTime: "April - October",
    weather: { temp: "27°C - 32°C", condition: "Tropical" },
    budget: { flights: "$400 - $900", hotels: "$50 - $200/night", transport: "$20/day", total: "$800 - $1,800" },
    thingsToDo: [
      { title: "Ubud Rice Terraces", description: "Stunning green rice paddies" },
      { title: "Tanah Lot Temple", description: "Iconic sea temple at sunset" },
      { title: "Mount Batur", description: "Sunrise trek to active volcano" },
      { title: "Seminyak Beach", description: "Beach clubs and surfing" },
    ],
    itinerary: [
      { day: 1, title: "Temple & Culture", activities: ["Tanah Lot Temple", "Uluwatu Temple", "Kecak fire dance"] },
      {
        day: 2,
        title: "Nature Adventure",
        activities: ["Mount Batur sunrise trek", "Hot springs", "Coffee plantation"],
      },
      { day: 3, title: "Beach & Relaxation", activities: ["Seminyak beach", "Spa treatment", "Beach club sunset"] },
    ],
  },
  tokyo: {
    name: "Tokyo",
    country: "Japan",
    image: "/tokyo-neon-lights-shibuya-crossing-at-night.jpg",
    description:
      "A fascinating blend of ultra-modern and traditional, Tokyo offers cutting-edge technology, ancient temples, incredible food, and vibrant nightlife all in one city.",
    rating: 4.7,
    mood: ["Cultural", "Urban", "Foodie"],
    bestTime: "March - May, September - November",
    weather: { temp: "10°C - 28°C", condition: "Seasonal" },
    budget: { flights: "$700 - $1,400", hotels: "$100 - $300/night", transport: "$30/day", total: "$1,500 - $3,000" },
    thingsToDo: [
      { title: "Shibuya Crossing", description: "World's busiest pedestrian crossing" },
      { title: "Senso-ji Temple", description: "Ancient Buddhist temple" },
      { title: "Tsukiji Market", description: "Fresh sushi and street food" },
      { title: "Akihabara", description: "Electronics and anime district" },
    ],
    itinerary: [
      { day: 1, title: "Modern Tokyo", activities: ["Shibuya Crossing", "Harajuku", "Shinjuku nightlife"] },
      { day: 2, title: "Traditional Side", activities: ["Senso-ji Temple", "Asakusa", "Ueno Park"] },
      { day: 3, title: "Food & Shopping", activities: ["Tsukiji Market", "Ginza shopping", "Robot Restaurant"] },
    ],
  },
  dubai: {
    name: "Dubai",
    country: "UAE",
    image: "/dubai-skyline-with-burj-khalifa-at-sunset.jpg",
    description:
      "A futuristic metropolis rising from the desert, Dubai amazes with record-breaking architecture, luxury shopping, and unique experiences from desert safaris to indoor skiing.",
    rating: 4.6,
    mood: ["Luxury", "Adventure", "Shopping"],
    bestTime: "November - March",
    weather: { temp: "20°C - 35°C", condition: "Hot & Dry" },
    budget: { flights: "$500 - $1,100", hotels: "$150 - $500/night", transport: "$40/day", total: "$2,000 - $4,000" },
    thingsToDo: [
      { title: "Burj Khalifa", description: "World's tallest building" },
      { title: "Desert Safari", description: "Dune bashing and camel rides" },
      { title: "Dubai Mall", description: "Ultimate shopping experience" },
      { title: "Palm Jumeirah", description: "Iconic man-made island" },
    ],
    itinerary: [
      { day: 1, title: "Iconic Dubai", activities: ["Burj Khalifa", "Dubai Mall", "Dubai Fountain show"] },
      {
        day: 2,
        title: "Desert Adventure",
        activities: ["Morning desert safari", "Camel ride", "BBQ dinner under stars"],
      },
      { day: 3, title: "Luxury & Leisure", activities: ["Palm Jumeirah", "Atlantis Aquaventure", "Marina cruise"] },
    ],
  },
  london: {
    name: "London",
    country: "UK",
    image: "/london-tower-bridge-at-dusk-blue-hour.jpg",
    description:
      "A global city steeped in history yet thoroughly modern. London offers royal palaces, world-class museums, West End shows, and a vibrant multicultural food scene.",
    rating: 4.5,
    mood: ["Cultural", "Historic", "Urban"],
    bestTime: "May - September",
    weather: { temp: "8°C - 22°C", condition: "Mild & Rainy" },
    budget: { flights: "$500 - $1,000", hotels: "$150 - $350/night", transport: "$40/day", total: "$1,400 - $2,800" },
    thingsToDo: [
      { title: "Tower of London", description: "Historic castle and crown jewels" },
      { title: "British Museum", description: "World-famous collection of artifacts" },
      { title: "West End", description: "World-class theatre shows" },
      { title: "Borough Market", description: "Gourmet food paradise" },
    ],
    itinerary: [
      { day: 1, title: "Royal London", activities: ["Buckingham Palace", "Westminster Abbey", "Big Ben"] },
      { day: 2, title: "History & Culture", activities: ["Tower of London", "British Museum", "Covent Garden"] },
      { day: 3, title: "Modern London", activities: ["South Bank", "Tate Modern", "West End show"] },
    ],
  },
  "new-york": {
    name: "New York",
    country: "USA",
    image: "/new-york-city-manhattan-skyline-night-lights.jpg",
    description:
      "The city that never sleeps offers endless entertainment, iconic landmarks, diverse neighborhoods, and experiences you won't find anywhere else in the world.",
    rating: 4.7,
    mood: ["Urban", "Cultural", "Nightlife"],
    bestTime: "April - June, September - November",
    weather: { temp: "0°C - 30°C", condition: "Seasonal" },
    budget: { flights: "$400 - $900", hotels: "$200 - $500/night", transport: "$30/day", total: "$1,600 - $3,500" },
    thingsToDo: [
      { title: "Statue of Liberty", description: "Iconic symbol of freedom" },
      { title: "Central Park", description: "Urban oasis in Manhattan" },
      { title: "Times Square", description: "Bright lights and Broadway" },
      { title: "Brooklyn Bridge", description: "Historic bridge with stunning views" },
    ],
    itinerary: [
      { day: 1, title: "Manhattan Icons", activities: ["Statue of Liberty", "Ellis Island", "One World Observatory"] },
      { day: 2, title: "Culture & Arts", activities: ["Met Museum", "Central Park", "Broadway show"] },
      { day: 3, title: "Neighborhoods", activities: ["Brooklyn Bridge walk", "DUMBO", "Williamsburg"] },
    ],
  },
  maldives: {
    name: "Maldives",
    country: "Maldives",
    image: "/maldives-overwater-bungalow-turquoise-water.jpg",
    description:
      "Paradise on Earth with crystal-clear waters, pristine white beaches, and luxurious overwater villas. The perfect destination for romance and ultimate relaxation.",
    rating: 4.9,
    mood: ["Luxury", "Romantic", "Relaxing"],
    bestTime: "November - April",
    weather: { temp: "28°C - 32°C", condition: "Tropical" },
    budget: {
      flights: "$800 - $1,500",
      hotels: "$500 - $2,000/night",
      transport: "$100/day",
      total: "$3,500 - $8,000",
    },
    thingsToDo: [
      { title: "Snorkeling", description: "Colorful coral reefs and marine life" },
      { title: "Sunset Cruise", description: "Romantic dhoni boat ride" },
      { title: "Spa Experience", description: "Overwater spa treatments" },
      { title: "Underwater Dining", description: "Unique dining experience" },
    ],
    itinerary: [
      { day: 1, title: "Arrival & Relaxation", activities: ["Resort check-in", "Beach exploration", "Sunset dinner"] },
      { day: 2, title: "Ocean Adventures", activities: ["Snorkeling trip", "Dolphin watching", "Overwater spa"] },
      { day: 3, title: "Island Romance", activities: ["Private beach picnic", "Sunset cruise", "Stargazing"] },
    ],
  },
  santorini: {
    name: "Santorini",
    country: "Greece",
    image: "/santorini-white-buildings-blue-domes-sunset.jpg",
    description:
      "A volcanic island paradise famous for its white-washed buildings, blue-domed churches, and spectacular sunsets over the Aegean Sea.",
    rating: 4.8,
    mood: ["Romantic", "Scenic", "Relaxing"],
    bestTime: "April - October",
    weather: { temp: "18°C - 30°C", condition: "Mediterranean" },
    budget: { flights: "$600 - $1,200", hotels: "$200 - $600/night", transport: "$40/day", total: "$1,800 - $4,000" },
    thingsToDo: [
      { title: "Oia Sunset", description: "World-famous sunset views" },
      { title: "Wine Tasting", description: "Local Assyrtiko wines" },
      { title: "Caldera Cruise", description: "Sail the volcanic crater" },
      { title: "Red Beach", description: "Unique volcanic beach" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Explore Oia",
        activities: ["Walk the caldera path", "Blue dome churches", "Sunset at Oia castle"],
      },
      { day: 2, title: "Sea & Wine", activities: ["Caldera cruise", "Hot springs", "Wine tasting tour"] },
      { day: 3, title: "Island Discovery", activities: ["Red Beach", "Ancient Akrotiri", "Fira shopping"] },
    ],
  },
}

export default function DestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const destination = destinationsData[id]

  if (!destination) {
    return (
      <main id="main-content" className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 px-4 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Destination not found</h1>
          <Link href="/destinations">
            <Button>Back to Destinations</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <img
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-6xl mx-auto">
          <Link href="/destinations">
            <Button variant="ghost" className="mb-4 text-foreground/80 hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
            </Button>
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-foreground font-medium">{destination.rating}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">{destination.name}</h1>
            <p className="text-xl text-muted-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {destination.country}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mood & Weather Indicators */}
      <section className="py-8 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              {destination.mood.map((tag) => (
                <Badge key={tag} className="btn-gradient text-white border-0 px-4 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Best: {destination.bestTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-primary" />
                <span>{destination.weather.temp}</span>
              </div>
              <div className="flex items-center gap-2">
                {destination.weather.condition.includes("Tropical") ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Cloud className="w-5 h-5 text-primary" />
                )}
                <span>{destination.weather.condition}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Description & Things to Do */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">About {destination.name}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{destination.description}</p>
              </motion.div>

              {/* Things to Do */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Things to Do</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.thingsToDo.map((thing, index) => (
                    <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-foreground mb-1">{thing.title}</h3>
                        <p className="text-muted-foreground text-sm">{thing.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* AI Recommended Itinerary Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">AI Recommended Itinerary</h2>
                </div>
                <div className="space-y-4">
                  {destination.itinerary.map((day) => (
                    <Card key={day.day} className="bg-card border-border">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="w-8 h-8 rounded-full btn-gradient text-white flex items-center justify-center text-sm font-bold">
                            {day.day}
                          </span>
                          <h3 className="font-semibold text-foreground">{day.title}</h3>
                        </div>
                        <ul className="space-y-2 ml-11">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="text-muted-foreground text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Budget & CTAs */}
            <div className="space-y-6">
              {/* Budget Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Estimated Budget</h2>
                <div className="space-y-3">
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Plane className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground">Flights</span>
                      </div>
                      <span className="font-semibold text-foreground">{destination.budget.flights}</span>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Hotel className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground">Hotels</span>
                      </div>
                      <span className="font-semibold text-foreground">{destination.budget.hotels}</span>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Car className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground">Transport</span>
                      </div>
                      <span className="font-semibold text-foreground">{destination.budget.transport}</span>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-primary/50">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-foreground">Total Estimate</span>
                      </div>
                      <span className="font-bold text-primary">{destination.budget.total}</span>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-3"
              >
                <Link href={`/itinerary-planner?destination=${destination.name}`} className="block">
                  <Button className="w-full btn-gradient text-white py-6 text-lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Plan This Trip with AI
                  </Button>
                </Link>
                <Button variant="outline" className="w-full py-6 bg-transparent">
                  <Plane className="w-5 h-5 mr-2" />
                  Find Best Flights
                </Button>
                <Button variant="outline" className="w-full py-6 bg-transparent">
                  <Hotel className="w-5 h-5 mr-2" />
                  Compare Hotels
                </Button>
                <Button variant="outline" className="w-full py-6 bg-transparent">
                  <Car className="w-5 h-5 mr-2" />
                  Transport Options
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
