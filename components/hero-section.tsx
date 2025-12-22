"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Calendar, Users, Search, ChevronDown, DollarSign } from "lucide-react"

const destinations = ["Paris, France", "London, UK", "Dubai, UAE", "Bali, Indonesia", "Tokyo, Japan", "New York, USA"]

const currencies = [
  { code: "USD", symbol: "$", label: "USD" },
  { code: "EUR", symbol: "€", label: "EUR" },
  { code: "INR", symbol: "₹", label: "INR" },
  { code: "GBP", symbol: "£", label: "GBP" },
  { code: "AED", symbol: "د.إ", label: "AED" },
]

export function HeroSection() {
  const router = useRouter()
  const [selectedDestination, setSelectedDestination] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [travelers, setTravelers] = useState("1 Traveler")
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [showDestDropdown, setShowDestDropdown] = useState(false)
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false)
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)

  const travelerOptions = ["1 Traveler", "2 Travelers", "3 Travelers", "4 Travelers", "5+ Travelers"]

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedDestination) params.set("destination", selectedDestination)
    if (checkIn) params.set("checkIn", checkIn)
    if (checkOut) params.set("checkOut", checkOut)
    if (travelers) params.set("travelers", travelers)
    if (selectedCurrency) params.set("currency", selectedCurrency.code)

    router.push(`/search-results?${params.toString()}`)
  }

  const closeAllDropdowns = () => {
    setShowDestDropdown(false)
    setShowTravelersDropdown(false)
    setShowCurrencyDropdown(false)
  }

  return (
    <section className="relative z-20 min-h-screen flex items-center justify-center overflow-visible">
      <div className="absolute inset-0 z-0">
        <img src="/bali-sunset-hero.jpg" alt="Bali sunset" className="absolute inset-0 w-full h-full object-cover" />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-28 md:pt-32 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-5 text-balance hero-text-shadow">
            Explore the World with
            <br />
            <span className="text-primary hero-text-glow">MoonMiles</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty hero-subtext-shadow px-4">
            Curated journeys, seamless planning, unforgettable experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-search-card rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 md:gap-3 mb-3 md:mb-5">
            {/* Destination */}
            <div className="relative sm:col-span-2 lg:col-span-1">
              <label className="flex items-center gap-2 text-[11px] md:text-xs text-foreground/70 mb-1.5 md:mb-2 font-medium">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                Destination
              </label>
              <button
                onClick={() => {
                  closeAllDropdowns()
                  setShowDestDropdown(!showDestDropdown)
                }}
                className="w-full flex items-center justify-between gap-2 bg-secondary/80 rounded-xl px-3 md:px-3.5 py-2.5 md:py-3 text-left hover:bg-secondary transition-colors border border-border/50 text-sm md:text-sm"
              >
                <span className={selectedDestination ? "text-foreground" : "text-muted-foreground"}>
                  {selectedDestination || "Select destination"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${showDestDropdown ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {showDestDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 dropdown-opaque rounded-xl p-2 z-50"
                  >
                    {destinations.map((dest) => (
                      <button
                        key={dest}
                        onClick={() => {
                          setSelectedDestination(dest)
                          setShowDestDropdown(false)
                        }}
                        className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg dropdown-item-hover text-foreground transition-all text-sm md:text-base"
                      >
                        {dest}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Check-in Date */}
            <div className="sm:col-span-1 lg:col-span-1">
              <label className="flex items-center gap-2 text-xs md:text-sm text-foreground/70 mb-1.5 md:mb-2 font-medium">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                Check-in
              </label>
              <div className="flex items-center gap-2 bg-secondary/80 rounded-xl px-3 md:px-4 py-3 md:py-3.5 border border-border/50">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent text-foreground outline-none w-full text-sm md:text-sm"
                  placeholder="dd-mm-yyyy"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="sm:col-span-1 lg:col-span-1">
              <label className="flex items-center gap-2 text-xs md:text-sm text-foreground/70 mb-1.5 md:mb-2 font-medium">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                Check-out
              </label>
              <div className="flex items-center gap-2 bg-secondary/80 rounded-xl px-3 md:px-4 py-3 md:py-3.5 border border-border/50">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-foreground outline-none w-full text-sm md:text-base"
                  placeholder="dd-mm-yyyy"
                />
              </div>
            </div>

            {/* Travelers Dropdown */}
            <div className="relative sm:col-span-1 lg:col-span-1">
              <label className="flex items-center gap-2 text-xs md:text-sm text-foreground/70 mb-1.5 md:mb-2 font-medium">
                <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                Travelers
              </label>
              <button
                onClick={() => {
                  closeAllDropdowns()
                  setShowTravelersDropdown(!showTravelersDropdown)
                }}
                className="w-full flex items-center justify-between gap-2 bg-secondary/80 rounded-xl px-3 md:px-3.5 py-2.5 md:py-3 text-left hover:bg-secondary transition-colors border border-border/50 text-sm md:text-sm"
              >
                <span className="text-foreground">{travelers}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${showTravelersDropdown ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {showTravelersDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 dropdown-opaque rounded-xl p-2 z-50"
                  >
                    {travelerOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setTravelers(option)
                          setShowTravelersDropdown(false)
                        }}
                        className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg dropdown-item-hover text-foreground transition-all text-sm md:text-base"
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Currency Dropdown */}
            <div className="relative sm:col-span-1 lg:col-span-1">
              <label className="flex items-center gap-2 text-xs md:text-sm text-foreground/70 mb-1.5 md:mb-2 font-medium">
                <DollarSign className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                Currency
              </label>
              <button
                onClick={() => {
                  closeAllDropdowns()
                  setShowCurrencyDropdown(!showCurrencyDropdown)
                }}
                className="w-full flex items-center justify-between gap-2 bg-secondary/80 rounded-xl px-3 md:px-3.5 py-2.5 md:py-3 text-left hover:bg-secondary transition-colors border border-border/50 text-sm md:text-sm"
              >
                <span className="text-foreground flex items-center gap-2">
                  <span className="text-primary font-medium">{selectedCurrency.symbol}</span>
                  {selectedCurrency.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${showCurrencyDropdown ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {showCurrencyDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 dropdown-opaque rounded-xl p-2 z-50"
                  >
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency)
                          setShowCurrencyDropdown(false)
                        }}
                        className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg dropdown-item-hover text-foreground transition-all flex items-center gap-2 text-sm md:text-base"
                      >
                        <span className="text-primary font-medium w-5 md:w-6">{currency.symbol}</span>
                        {currency.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full btn-gradient text-white py-3 md:py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/25 text-sm md:text-sm"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
            Search Destinations
          </button>
        </motion.div>
      </div>
    </section>
  )
}
