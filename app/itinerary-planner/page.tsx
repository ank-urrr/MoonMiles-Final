"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { FloatingDots } from "@/components/animated-background"
import { ChevronDown, Sparkles, MapPin, Clock, X } from "lucide-react"

const tripDurations = [
  { label: "A quick getaway", value: "1-3 days", tip: "Perfect for weekend escapes" },
  { label: "A short trip", value: "4-6 days", tip: "Ideal for exploring one destination" },
  { label: "A relaxed week", value: "7-10 days", tip: "Longer trips give you more time to explore at a relaxed pace" },
  { label: "An extended adventure", value: "10+ days", tip: "Best for multi-destination trips" },
]

const destinations = [
  "Paris, France",
  "London, UK",
  "Dubai, UAE",
  "Bali, Indonesia",
  "Tokyo, Japan",
  "New York, USA",
  "Maldives",
  "Switzerland",
  "Thailand",
]

const tripPreferences = [
  { id: "kid-friendly", label: "Kid-friendly", emoji: "👶" },
  { id: "beach-time", label: "Beach time", emoji: "🏖️" },
  { id: "nature-outdoors", label: "Nature & outdoors", emoji: "🌲" },
  { id: "food-exploration", label: "Food exploration", emoji: "🍜" },
  { id: "culture-history", label: "Culture & history", emoji: "🏛️" },
  { id: "adventure", label: "Adventure", emoji: "⛷️" },
  { id: "relaxation", label: "Relaxation", emoji: "🧘" },
  { id: "nightlife", label: "Nightlife", emoji: "🎉" },
]

export default function ItineraryPlannerPage() {
  const [duration, setDuration] = useState("")
  const [durationValue, setDurationValue] = useState("")
  const [durationTip, setDurationTip] = useState("")
  const [destination, setDestination] = useState("")
  const [requirements, setRequirements] = useState("")
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  const [showDestDropdown, setShowDestDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [itinerary, setItinerary] = useState<string | null>(null)

  const togglePreference = (id: string) => {
    setSelectedPreferences((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const handleGenerate = async () => {
    setIsLoading(true)
    setItinerary(null)

    const selectedPrefLabels = selectedPreferences.map((id) => tripPreferences.find((p) => p.id === id)?.label || id)

    try {
      const response = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          duration: durationValue || duration,
          preferences: selectedPrefLabels,
          requirements,
        }),
      })

      const data = await response.json()
      setItinerary(data.itinerary)
    } catch (error) {
      setItinerary("Unable to generate itinerary at this time. Please ensure the API is configured correctly.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen relative">
      <FloatingDots />
      <Navbar />

      <section className="pt-32 pb-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
              Let's Plan Your{" "}
              <span className="bg-gradient-to-r from-primary via-[#FF5F6D] to-accent bg-clip-text text-transparent">
                Perfect Trip
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tell us your preferences and we'll craft a personalized itinerary just for you.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-border/50"
          >
            <div className="space-y-8">
              {/* Trip Duration */}
              <div className="relative">
                <label className="text-sm font-medium text-foreground mb-2 block">How long is your trip?</label>
                <button
                  onClick={() => {
                    setShowDurationDropdown(!showDurationDropdown)
                    setShowDestDropdown(false)
                  }}
                  className="w-full flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-3.5 text-left hover:bg-secondary/70 transition-colors border border-border/30"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className={duration ? "text-foreground" : "text-muted-foreground"}>
                      {duration || "Select duration"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${showDurationDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {durationTip && <p className="text-sm text-muted-foreground mt-2 ml-1">Tip: {durationTip}</p>}
                <AnimatePresence>
                  {showDurationDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 dropdown-opaque rounded-xl p-2 z-20"
                    >
                      {tripDurations.map((dur) => (
                        <button
                          key={dur.value}
                          onClick={() => {
                            setDuration(dur.label)
                            setDurationValue(dur.value)
                            setDurationTip(dur.tip)
                            setShowDurationDropdown(false)
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg dropdown-item-hover text-foreground transition-all"
                        >
                          {dur.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Destination */}
              <div className="relative">
                <label className="text-sm font-medium text-foreground mb-2 block">Where would you like to go?</label>
                <button
                  onClick={() => {
                    setShowDestDropdown(!showDestDropdown)
                    setShowDurationDropdown(false)
                  }}
                  className="w-full flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-3.5 text-left hover:bg-secondary/70 transition-colors border border-border/30"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className={destination ? "text-foreground" : "text-muted-foreground"}>
                      {destination || "Select destination"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${showDestDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                <p className="text-sm text-muted-foreground mt-2 ml-1">
                  Not sure? Our AI can suggest destinations based on your preferences
                </p>
                <AnimatePresence>
                  {showDestDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 dropdown-opaque rounded-xl p-2 z-20 max-h-64 overflow-y-auto"
                    >
                      {destinations.map((dest) => (
                        <button
                          key={dest}
                          onClick={() => {
                            setDestination(dest)
                            setShowDestDropdown(false)
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg dropdown-item-hover text-foreground transition-all"
                        >
                          {dest}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  What's important for your trip?
                </label>
                <div className="flex flex-wrap gap-3">
                  {tripPreferences.map((pref) => {
                    const isSelected = selectedPreferences.includes(pref.id)
                    return (
                      <button
                        key={pref.id}
                        onClick={() => togglePreference(pref.id)}
                        className={`
                          flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-primary/20 via-[#FF5F6D]/20 to-accent/20 border-primary/50 text-foreground shadow-sm"
                              : "bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          }
                        `}
                      >
                        <span>{pref.emoji}</span>
                        <span className="text-sm font-medium">{pref.label}</span>
                        {isSelected && <X className="w-3.5 h-3.5 ml-1 text-primary" />}
                      </button>
                    )
                  })}
                </div>
                <p className="text-sm text-muted-foreground mt-3 ml-1">
                  Select all that apply to help us personalize your itinerary
                </p>
              </div>

              {/* Requirements */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Any special requests? (Optional)
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="I need to enjoy best cuisine, beach time, adventures and a relaxed peaceful vibing week"
                  rows={4}
                  className="w-full bg-secondary/30 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 border-2 border-transparent focus:border-primary/30 transition-all resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full btn-gradient text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Generating your itinerary...
                  </>
                ) : (
                  <>
                    Generate My Itinerary
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Loading Animation */}
          <AnimatePresence>
            {isLoading && !itinerary && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-12 text-center"
              >
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-primary rounded-full"
                      animate={{
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">Crafting your perfect journey...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generated Itinerary */}
          <AnimatePresence>
            {itinerary && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="mt-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Sparkles className="w-7 h-7 text-primary" />
                  <span>Your Personalized Itinerary</span>
                </h2>

                <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg">
                  <div className="prose prose-sm max-w-none text-foreground/90">
                    <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">{itinerary}</pre>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
