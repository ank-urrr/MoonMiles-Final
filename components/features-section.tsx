"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Compass, Route, Sparkles } from "lucide-react"

const steps = [
  { number: "01", icon: Compass, title: "Follow your curiosity", text: "Island time or city lights? Explore destination guides and find a place that feels like you." },
  { number: "02", icon: Sparkles, title: "Make it your own", text: "Give our AI planner your dates, budget, and travel style. Build a day-by-day plan around what you love." },
  { number: "03", icon: Route, title: "Go a little further", text: "Compare travel and stay ideas, explore your itinerary, and book with your preferred travel provider." },
]

export function FeaturesSection() {
  const reducedMotion = useReducedMotion()
  return (
    <section className="mm-section mm-how" aria-labelledby="how-title">
      <div className="mm-section-heading"><div><p className="mm-eyebrow">LESS PLANNING. MORE LIVING.</p><h2 id="how-title">A good trip begins<br />with a <em>little spark.</em></h2></div><Link href="/itinerary-planner" className="mm-text-link">Meet your trip planner <ArrowUpRight size={18} /></Link></div>
      <div className="mm-steps">{steps.map(({ number, icon: Icon, title, text }, index) => <motion.div key={number} className="mm-step" initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.1 }}><div className="mm-step-top"><span>{number}</span><Icon size={25} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p></motion.div>)}</div>
    </section>
  )
}
