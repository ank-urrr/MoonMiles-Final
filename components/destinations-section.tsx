"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Building2, Compass, Palmtree, Sparkles } from "lucide-react"

const destinations = [
  { id: "bali", name: "Bali", country: "Indonesia", image: "/bali-temple-on-cliff-overlooking-ocean-sunset.jpg", mood: "Find your balance", tag: "Nature & culture", categories: ["Islands", "Culture"], days: "5–7 days" },
  { id: "santorini", name: "Santorini", country: "Greece", image: "/santorini-white-buildings-blue-domes-sunset.jpg", mood: "Follow the golden hour", tag: "Slow living", categories: ["Islands"], days: "4–6 days" },
  { id: "tokyo", name: "Tokyo", country: "Japan", image: "/tokyo-neon-lights-shibuya-crossing-at-night.jpg", mood: "Get wonderfully lost", tag: "City & culture", categories: ["City breaks", "Culture"], days: "5–8 days" },
  { id: "maldives", name: "Maldives", country: "Indian Ocean", image: "/maldives-overwater-bungalow-turquoise-water.jpg", mood: "Do a little less", tag: "Barefoot escapes", categories: ["Islands"], days: "4–7 days" },
  { id: "paris", name: "Paris", country: "France", image: "/eiffel-tower-paris-at-night-with-lights.jpg", mood: "Take the scenic route", tag: "Art & romance", categories: ["City breaks", "Culture"], days: "4–6 days" },
  { id: "dubai", name: "Dubai", country: "United Arab Emirates", image: "/dubai-skyline-with-burj-khalifa-at-sunset.jpg", mood: "See a different horizon", tag: "Desert & design", categories: ["City breaks"], days: "3–5 days" },
]
const filters = [{ label: "All escapes", icon: Compass }, { label: "Islands", icon: Palmtree }, { label: "City breaks", icon: Building2 }, { label: "Culture", icon: Sparkles }]

export function DestinationsSection() {
  const [filter, setFilter] = useState("All escapes")
  const reducedMotion = useReducedMotion()
  const shown = filter === "All escapes" ? destinations.slice(0, 4) : destinations.filter((item) => item.categories.includes(filter))
  return (
    <section id="discover" className="mm-section mm-discover" aria-labelledby="destinations-title">
      <div className="mm-section-heading"><div><p className="mm-eyebrow">A WORLD OF POSSIBILITIES</p><h2 id="destinations-title">Where will curiosity<br />take you <em>next?</em></h2></div><p>Some places stay with you.<br />Let’s find yours.</p></div>
      <div className="mm-destination-toolbar"><div className="mm-filters" aria-label="Filter destinations">{filters.map(({ label, icon: Icon }) => <button type="button" key={label} className={filter === label ? "is-active" : ""} onClick={() => setFilter(label)} aria-pressed={filter === label}><Icon size={15} />{label}</button>)}</div><Link href="/destinations" className="mm-text-link">View all destinations <ArrowUpRight size={17} /></Link></div>
      <div className="mm-destination-grid" aria-live="polite">
        {shown.map((destination, index) => (
          <motion.article key={destination.id} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.06, duration: 0.65 }} className="mm-destination-card">
            <Link href={`/destinations/${destination.id}`} aria-label={`Explore ${destination.name}, ${destination.country}`}>
              <div className="mm-destination-image"><img src={destination.image} alt={`${destination.name}, ${destination.country}`} width={400} height={500} loading="lazy" decoding="async" /><span className="mm-destination-tag">{destination.tag}</span><span className="mm-card-arrow"><ArrowUpRight size={21} /></span><span className="mm-destination-mood">{destination.mood}</span></div>
              <div className="mm-destination-caption"><div><h3>{destination.name}</h3><p>{destination.country}</p></div><span>{destination.days}<small>Suggested stay</small></span></div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
