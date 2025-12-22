"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Plane, Menu, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

const destinations = {
  cities: ["Paris", "London", "Dubai", "Bali", "Tokyo", "New York"],
  places: ["Beaches", "Mountains", "Cities", "Honeymoon Spots"],
}

const travelOptions = ["Flights", "Trains", "Bus", "Cab / Transfers"]

const accommodations = ["Hotels", "Resorts", "Hostels", "Luxury Stays"]

interface DropdownProps {
  title: string
  items: string[] | { cities: string[]; places: string[] }
  isOpen: boolean
  onToggle: () => void
}

function Dropdown({ title, items, isOpen, onToggle }: DropdownProps) {
  const isDestinations = typeof items === "object" && "cities" in items

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors py-2"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 min-w-[220px] dropdown-opaque rounded-2xl p-4 z-50"
          >
            {isDestinations ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Cities</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(items as { cities: string[]; places: string[] }).cities.map((city) => (
                      <Link
                        key={city}
                        href={`/destinations/${city.toLowerCase().replace(" ", "-")}`}
                        className="text-sm text-foreground/80 hover:text-primary transition-colors px-2 py-1.5 rounded-lg dropdown-item-hover"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Places</p>
                  <div className="flex flex-col gap-1">
                    {(items as { cities: string[]; places: string[] }).places.map((place) => (
                      <Link
                        key={place}
                        href="/destinations"
                        className="text-sm text-foreground/80 hover:text-primary transition-colors px-2 py-1.5 rounded-lg dropdown-item-hover"
                      >
                        {place}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {(items as string[]).map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-sm text-foreground/80 hover:text-primary transition-colors px-2 py-1.5 rounded-lg dropdown-item-hover"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useAuth()

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="navbar-solid rounded-xl px-3 md:px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <Plane className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-base md:text-lg font-semibold">
              <span className="text-primary">MoonMiles</span>
            </span>
          </Link>

          {/* Nav Items - Desktop */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-sm">
            <Link href="/" className="text-foreground hover:text-foreground/80 transition-colors py-1.5">
              Home
            </Link>
            <Dropdown
              title="Destinations"
              items={destinations}
              isOpen={openDropdown === "destinations"}
              onToggle={() => toggleDropdown("destinations")}
            />
            <Dropdown
              title="Accommodations"
              items={accommodations}
              isOpen={openDropdown === "accommodations"}
              onToggle={() => toggleDropdown("accommodations")}
            />
            <Dropdown
              title="Travel Options"
              items={travelOptions}
              isOpen={openDropdown === "travel"}
              onToggle={() => toggleDropdown("travel")}
            />
            <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors py-1.5">
              About
            </Link>
            <Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors py-1.5">
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2.5 text-sm">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="btn-gradient-outline text-foreground px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl font-medium transition-all hover:shadow-md"
                >
                  My Account
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-gradient-outline text-foreground px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl font-medium transition-all hover:shadow-md"
                >
                  Logout
                </button>
                <Link
                  href="/itinerary-planner"
                  className="flex items-center gap-2 btn-gradient text-white px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  Plan Your Trip
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn-gradient-outline text-foreground px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl font-medium transition-all hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  href="/itinerary-planner"
                  className="flex items-center gap-2 btn-gradient text-white px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  Plan Your Trip
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - improved mobile menu styling */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pt-4 border-t border-border/30"
            >
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-foreground py-3 px-3 rounded-xl hover:bg-secondary/50 transition-colors">
                  Home
                </Link>
                <Link
                  href="/destinations"
                  className="text-foreground/80 py-3 px-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  Destinations
                </Link>
                <Link
                  href="/itinerary-planner"
                  className="text-foreground/80 py-3 px-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  AI Planner
                </Link>
                <Link
                  href="/about"
                  className="text-foreground/80 py-3 px-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground/80 py-3 px-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  Contact
                </Link>
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border/30">
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="btn-gradient-outline text-foreground py-3 px-4 rounded-xl text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="btn-gradient-outline text-foreground py-3 px-4 rounded-xl text-center font-medium"
                      >
                        Logout
                      </button>
                      <Link
                        href="/itinerary-planner"
                        className="btn-gradient text-white px-5 py-3 rounded-xl font-medium text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Plan Your Trip
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="btn-gradient-outline text-foreground py-3 px-4 rounded-xl text-center font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/itinerary-planner"
                        className="btn-gradient text-white px-5 py-3 rounded-xl font-medium text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Plan Your Trip
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
