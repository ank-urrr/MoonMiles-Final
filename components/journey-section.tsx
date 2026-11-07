"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, MoveDown } from "lucide-react"

export function JourneySection() {
  const section = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04])
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section ref={section} className="mm-journey" aria-labelledby="journey-title">
      <div className="mm-journey-image"><motion.img src="/stunning-aerial-view-of-tropical-beach-resort-at-s.jpg" alt="A palm-lined tropical coastline and turquoise sea" loading="lazy" decoding="async" style={{ y: reducedMotion ? 0 : y, scale: reducedMotion ? 1 : scale }} /></div>
      <div className="mm-journey-overlay" />
      <motion.div className="mm-journey-copy" style={{ y: reducedMotion ? 0 : textY }}><p className="mm-eyebrow">NOT JUST A PLACE. A FEELING.</p><h2 id="journey-title">Collect moments.<br /><em>Not just miles.</em></h2><p>The early morning quiet. The road you didn’t plan.<br />The place that somehow feels like home.</p><Link href="/itinerary-planner" className="mm-button mm-button-cream">Find your kind of journey <ArrowUpRight size={18} /></Link></motion.div>
      <span className="mm-journey-note"><MoveDown size={17} /> TAKE THE SCENIC ROUTE</span>
    </section>
  )
}
