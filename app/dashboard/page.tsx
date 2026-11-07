"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, Calendar, Heart, Settings, LogOut, ChevronRight, Clock, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-provider"

const savedTrips = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    image: "/bali-temple-on-cliff-overlooking-ocean-sunset.jpg",
    dates: "Mar 15 - Mar 22, 2025",
    status: "Upcoming",
  },
  {
    id: 2,
    destination: "Paris, France",
    image: "/eiffel-tower-paris-at-night-with-lights.jpg",
    dates: "Jun 1 - Jun 8, 2025",
    status: "Planning",
  },
]

const recentTrips = [
  {
    id: 1,
    destination: "Tokyo, Japan",
    image: "/tokyo-neon-lights-shibuya-crossing-at-night.jpg",
    dates: "Dec 10 - Dec 17, 2024",
    rating: 5,
  },
  {
    id: 2,
    destination: "Dubai, UAE",
    image: "/dubai-skyline-with-burj-khalifa-at-sunset.jpg",
    dates: "Oct 5 - Oct 12, 2024",
    rating: 4,
  },
]

const favoriteDestinations = [
  { name: "Maldives", image: "/maldives-beach.png" },
  { name: "Santorini", image: "/santorini-village.png" },
  { name: "New York", image: "/new-york-city-manhattan-skyline-night-lights.jpg" },
  { name: "London", image: "/london-tower-bridge-at-dusk-blue-hour.jpg" },
]

const sidebarItems = [
  { icon: MapPin, label: "My Trips", active: true },
  { icon: Heart, label: "Favorites", active: false },
  { icon: Calendar, label: "Calendar", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("My Trips")
  const { user, logout } = useAuth()
  const router = useRouter()

  // Redirect to login if no user is signed in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return (
      <main id="main-content" className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Redirecting to login…</p>
      </main>
    )
  }

  const displayName = user.name?.trim() || "Traveler"
  const firstName = displayName.split(" ")[0]
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2)

  const handleSignOut = () => {
    logout()
    router.push("/")
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-72 shrink-0"
            >
              <Card className="bg-card border-border sticky top-28">
                <CardContent className="p-6">
                  {/* User Profile */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src="/traveler-portrait.jpg" />
                      <AvatarFallback className="btn-gradient text-white">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{displayName}</h3>
                      <p className="text-sm text-muted-foreground">Explorer Member</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          activeTab === item.label
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </nav>

                  {/* Logout */}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 mt-6 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </CardContent>
              </Card>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Welcome Header */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {firstName}!</h1>
                <p className="text-muted-foreground">Ready to plan your next adventure?</p>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <Link href="/itinerary-planner">
                  <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          Plan New Trip
                        </h3>
                        <p className="text-sm text-muted-foreground">AI-powered planning</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/destinations">
                  <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          Explore
                        </h3>
                        <p className="text-sm text-muted-foreground">Discover destinations</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        Calendar
                      </h3>
                      <p className="text-sm text-muted-foreground">View schedule</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Saved Trips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-xl text-foreground">Saved Trips</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {savedTrips.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.destination}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{trip.destination}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {trip.dates}
                          </p>
                        </div>
                        <Badge
                          className={
                            trip.status === "Upcoming"
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : "bg-primary/10 text-primary border-primary/20"
                          }
                        >
                          {trip.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Trips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-xl text-foreground">Recent Trips</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentTrips.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.destination}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{trip.destination}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {trip.dates}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: trip.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Favorite Destinations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-card border-border">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-foreground">Favorite Destinations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {favoriteDestinations.map((dest) => (
                        <div key={dest.name} className="flex flex-col items-center gap-2 cursor-pointer group">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                            <img
                              src={dest.image || "/placeholder.svg"}
                              alt={dest.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {dest.name}
                          </span>
                        </div>
                      ))}
                      <div className="flex flex-col items-center gap-2 cursor-pointer group">
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-border flex items-center justify-center group-hover:border-primary transition-all">
                          <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-sm text-muted-foreground">Add New</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
