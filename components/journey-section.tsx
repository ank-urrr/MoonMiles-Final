"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, MoveDown } from "lucide-react"

export function JourneySection() {
  const section = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const secondOpacity = useTransform(scrollYProgress, [0.25, 0.42], [0, 1])
  const thirdOpacity = useTransform(scrollYProgress, [0.62, 0.79], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const textY = useTransform(scrollYProgress, [0, 1], [15, -15])
  const firstLabel = useTransform(scrollYProgress, [0.22, 0.35], [1, 0])
  const secondLabel = useTransform(scrollYProgress, [0.25, 0.42, 0.59, 0.72], [0, 1, 1, 0])
  const thirdLabel = useTransform(scrollYProgress, [0.62, 0.79], [0, 1])

  return (
    <section ref={section} className={`mm-journey-scroll ${reducedMotion ? "mm-motion-reduced" : ""}`} aria-labelledby="journey-title">
      <div className="mm-journey">
        <motion.div className="mm-journey-image" style={{ scale: reducedMotion ? 1 : scale }}>
          <img src="/stunning-aerial-view-of-tropical-beach-resort-at-s.jpg" alt="A palm-lined tropical coastline and turquoise sea" loading="lazy" decoding="async" />
          <motion.img className="mm-journey-scene" src="/bali-sunset-hero.jpg" alt="" loading="lazy" decoding="async" style={{ opacity: reducedMotion ? 0 : secondOpacity }} />
          <motion.img className="mm-journey-scene" src="/santorini-white-buildings-blue-domes-sunset.jpg" alt="" loading="lazy" decoding="async" style={{ opacity: reducedMotion ? 0 : thirdOpacity }} />
        </motion.div>
        <div className="mm-journey-overlay" />
        <motion.div className="mm-journey-copy" style={{ y: reducedMotion ? 0 : textY }}>
          <p className="mm-eyebrow">NOT JUST A PLACE. A FEELING.</p>
          <h2 id="journey-title">Collect moments.<br /><em>Not just miles.</em></h2>
          <p>The early morning quiet. The road you didn’t plan.<br />The place that somehow feels like home.</p>
          <Link href="/itinerary-planner" className="mm-button mm-button-cream">Find your kind of journey <ArrowUpRight size={18} /></Link>
        </motion.div>
        <div className="mm-journey-chapters" aria-hidden="true">
          <motion.span style={{ opacity: reducedMotion ? 1 : firstLabel }}>01 / THE ART OF SLOWING DOWN</motion.span>
          <motion.span style={{ opacity: reducedMotion ? 0 : secondLabel }}>02 / A DIFFERENT POINT OF VIEW</motion.span>
          <motion.span style={{ opacity: reducedMotion ? 0 : thirdLabel }}>03 / A MOMENT TO TAKE HOME</motion.span>
        </div>
        <span className="mm-journey-note"><MoveDown size={17} /> TAKE THE SCENIC ROUTE</span>
        <div className="mm-journey-progress" aria-hidden="true"><motion.span style={{ scaleX: reducedMotion ? 0 : scrollYProgress }} /></div>
      </div>
    </section>
  )
}
