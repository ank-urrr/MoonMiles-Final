"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Compass, Heart, Leaf } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

const values = [
  { icon: Compass, title: "Stay curious", text: "Leave room for a different perspective, an unexpected turn, and the places between the landmarks." },
  { icon: Heart, title: "Make it personal", text: "A journey should fit your interests and your pace. The most memorable trip is the one that feels like you." },
  { icon: Leaf, title: "Travel thoughtfully", text: "Take your time, respect local communities, and treat every destination like a place someone calls home." },
]

export default function AboutPage() {
  const reducedMotion = useReducedMotion()
  const reveal = reducedMotion ? false : { opacity: 0, y: 28 }
  return (
    <div className="mm-about">
      <Navbar />
      <main id="main-content">
        <section className="mm-about-intro mm-section">
          <motion.div initial={reveal} animate={{ opacity: 1, y: 0 }}>
            <p className="mm-eyebrow">THE STORY BEHIND THE MILES</p>
            <h1>A little curiosity.<br /><em>A world of possibility.</em></h1>
            <p>MoonMiles brings destination inspiration and thoughtful trip planning together, so you can spend less time figuring it all out and more time looking forward to it.</p>
          </motion.div>
        </section>
        <section className="mm-founder mm-section" aria-labelledby="founder-title">
          <motion.div className="mm-founder-photo" initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}><img src="/Ankur.jpg" alt="Ankur Patil, founder of MoonMiles" width={600} height={750} fetchPriority="high" /><span>THE PERSON BEHIND MOONMILES</span></motion.div>
          <motion.div className="mm-founder-copy" initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.12 }}>
            <p className="mm-eyebrow">MEET THE FOUNDER</p>
            <h2 id="founder-title">Ankur <em>Patil.</em></h2>
            <span className="mm-founder-role">Founder & CEO · MoonMiles</span>
            <p>Behind MoonMiles is a simple idea: discovering your next destination should be as inspiring as the journey itself.</p>
            <p>Created by Ankur Patil, MoonMiles brings together immersive destination guides, travel ideas, and an AI trip planner in one place. It is a space to turn a little curiosity into a plan that’s yours.</p>
            <p>From a quiet island escape to a city you’ve always wanted to explore, the starting point is the same: what would you love to experience?</p>
            <Link className="mm-text-link" href="/contact">Let’s talk about your next chapter <ArrowUpRight size={18} /></Link>
          </motion.div>
        </section>
        <section className="mm-section mm-about-values" aria-labelledby="values-title">
          <div className="mm-section-heading"><div><p className="mm-eyebrow">WHAT GUIDES THE JOURNEY</p><h2 id="values-title">Good journeys.<br /><em>Thoughtful beginnings.</em></h2></div></div>
          <div className="mm-steps">{values.map(({ icon: Icon, title, text }, index) => <motion.div className="mm-step" key={title} initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }}><div className="mm-step-top"><span>0{index + 1}</span><Icon size={25} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p></motion.div>)}</div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
