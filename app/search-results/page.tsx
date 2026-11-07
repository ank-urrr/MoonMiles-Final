"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, Calendar, Sparkles, ExternalLink, Plane, Hotel, Car, Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingDots } from "@/components/animated-background"

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "Paris, France"
  const checkIn = searchParams.get("checkIn") || ""
  const checkOut = searchParams.get("checkOut") || ""
  const travelers = searchParams.get("travelers") || "1 Traveler"
  const currencyParam = searchParams.get("currency") || "USD"

  const [selectedCurrency, setSelectedCurrency] = useState(
    ["USD", "EUR", "INR", "GBP", "AED"].includes(currencyParam) ? currencyParam : "USD",
  )
  const [isLoadingInsights, setIsLoadingInsights] = useState(false)
  const [insights, setInsights] = useState<string | null>(null)

  const currencies = [
    { key: "USD" as const, label: "USD" },
    { key: "EUR" as const, label: "EUR" },
    { key: "INR" as const, label: "INR" },
    { key: "GBP" as const, label: "GBP" },
    { key: "AED" as const, label: "AED" },
  ]

  const formatDate = (dateStr: string) => {
    return dateStr
  }

  const getTripNights = () => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffMs = end.getTime() - start.getTime()
    const nights = Math.round(diffMs / (1000 * 60 * 60 * 24))
    return Number.isFinite(nights) && nights > 0 ? nights : 1
  }

  const getEstimatedFlightPrice = () => {
    const travelerCount = parseInt(travelers, 10) || 1
    const nights = getTripNights()
    const basePerPerson = 220 // simple heuristic base price in USD
    let priceUsd = basePerPerson + (nights - 1) * 30
    priceUsd *= travelerCount

    // Illustrative conversions for sample prices, not live exchange rates.
    const samples: Record<string, { symbol: string; multiplier: number }> = {
      USD: { symbol: "$", multiplier: 1 }, EUR: { symbol: "€", multiplier: 0.9 },
      INR: { symbol: "₹", multiplier: 83 }, GBP: { symbol: "£", multiplier: 0.78 },
      AED: { symbol: "AED ", multiplier: 3.67 },
    }
    const { symbol, multiplier } = samples[selectedCurrency] || samples.USD
    return { symbol, value: Math.round(priceUsd * multiplier) }
  }

  const getFlightOptions = () => {
    const { symbol, value } = getEstimatedFlightPrice()
    const base = value
    const encodedDestination = encodeURIComponent(destination)

    return [
      {
        id: "best",
        label: "Best value",
        description: "Round-trip · Economy · Flexible dates",
        price: Math.round(base),
        href: `https://www.skyscanner.com/transport/flights/?query=${encodedDestination}`,
      },
      {
        id: "direct",
        label: "Fastest (non-stop)",
        description: "Round-trip · Non-stop · Economy",
        price: Math.round(base * 1.2),
        href: `https://www.skyscanner.com/transport/flights/?query=${encodedDestination}&sort=duration`,
      },
      {
        id: "budget",
        label: "Cheapest option",
        description: "Round-trip · 1–2 stops · Economy",
        price: Math.round(base * 0.85),
        href: `https://www.skyscanner.com/transport/flights/?query=${encodedDestination}&sort=price`,
      },
    ].map((option) => ({ ...option, symbol }))
  }

  const handleGetInsights = async () => {
    setIsLoadingInsights(true)
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          currency: selectedCurrency,
        }),
      })
      const data = await response.json()
      if (!response.ok || !data.insights) throw new Error("Insights unavailable")
      setInsights(data.insights)
    } catch (error) {
      setInsights("Unable to fetch insights at this time. Please try again later.")
    } finally {
      setIsLoadingInsights(false)
    }
  }

  const { symbol: flightCurrencySymbol, value: flightPriceValue } = getEstimatedFlightPrice()
  const flightOptions = getFlightOptions()

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingDots />
      <Navbar />

      <main id="main-content" className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search Results Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border border-white/50"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left Section */}
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Search Results
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Options for {destination}</h1>
                <p className="text-muted-foreground mb-4 max-w-xl">
                  AI-generated ideas for how to travel and where to stay. You'll book safely on external platforms like
                  MakeMyTrip, Skyscanner, Booking.com, etc.
                </p>
                <p className="text-foreground/80">
                  Welcome back, <span className="font-semibold">traveler</span> — here are personalized suggestions for
                  your trip.
                </p>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-start lg:items-end gap-3 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{destination}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {checkIn && checkOut ? `${formatDate(checkIn)} – ${formatDate(checkOut)}` : "Flexible dates"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">PRICES IN</p>
                <div className="flex gap-1">
                  {currencies.map((currency) => (
                    <button
                      key={currency.key}
                      onClick={() => setSelectedCurrency(currency.key)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCurrency === currency.key
                          ? "bg-foreground text-background"
                          : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                      }`}
                    >
                      {currency.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Best Price Suggestions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">Best price suggestions</h2>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Sample round-trip flight options for your dates. Click through to see live prices on booking sites.
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Showing prices in {selectedCurrency}
                </span>
              </div>

              <div className="border-t border-border/40 pt-4 space-y-4">
                <div className="space-y-3">
                  {flightOptions.map((option) => (
                    <a
                      key={option.id}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-secondary/30 hover:bg-secondary/60 transition-colors px-3 py-3 text-left"
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {option.label} to {destination}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          {option.symbol}
                          {option.price.toLocaleString()}
                        </p>
                        <p className="text-[11px] text-muted-foreground">per trip (all travelers)</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Quick booking links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={`https://www.skyscanner.com/transport/flights/?query=${encodeURIComponent(destination)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-secondary/40 hover:bg-secondary transition-colors text-foreground"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Plane className="w-4 h-4" />
                      <span>More flights</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </div>
                    <span className="block text-[11px] text-muted-foreground mt-0.5">
                      Est. round-trip from {flightCurrencySymbol}
                      {flightPriceValue.toLocaleString()}
                    </span>
                  </a>
                  <a
                    href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-secondary/40 hover:bg-secondary transition-colors text-foreground text-sm"
                  >
                    <Hotel className="w-4 h-4" />
                    <span>Search Hotels</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                  <a
                    href={`https://www.rentalcars.com/search?location=${encodeURIComponent(destination)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-secondary/40 hover:bg-secondary transition-colors text-foreground text-sm"
                  >
                    <Car className="w-4 h-4" />
                    <span>Rent a Car</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/40">
                Prices and currency conversions are illustrative estimates, not live quotes. Confirm final fares on booking platforms.
              </p>
            </motion.div>

            {/* Destination Insights Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="rounded-2xl p-6 h-full bg-gradient-to-br from-[#FF8A5C]/20 via-[#FF5F6D]/25 to-[#D45079]/30 border border-white/30 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Destination insights
                    </h2>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    PRICES / TIPS IN {selectedCurrency}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  Explore typical weather, local highlights, and ideas for your trip. AI suggestions are not live travel updates.
                </p>

                {!insights ? (
                  <div className="bg-white/40 rounded-xl p-4 mb-4">
                    <p className="text-sm font-semibold text-foreground/80 mb-1">NO INSIGHTS YET</p>
                    <p className="text-xs text-muted-foreground">
                      Click the button below to ask AI for a quick snapshot of this destination.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white/60 rounded-xl p-4 mb-4 max-h-64 overflow-y-auto">
                    <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{insights}</p>
                  </div>
                )}

                <button
                  onClick={handleGetInsights}
                  disabled={isLoadingInsights}
                  className="w-full py-3 rounded-xl bg-white/80 hover:bg-white text-primary font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoadingInsights ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {insights ? "Refresh insights" : "Get AI suggestions"}
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  A little inspiration from your AI travel companion.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  )
}
