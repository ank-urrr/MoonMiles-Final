"use client"

import { motion } from "framer-motion"
import { MapPin, BadgeCheck, Users, Headphones } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Curated Destinations",
    description: "Hand-picked locations by travel experts for unforgettable experiences.",
  },
  {
    icon: BadgeCheck,
    title: "Best Price Guarantee",
    description: "We match any price you find, ensuring you get the best deal every time.",
  },
  {
    icon: Users,
    title: "Trusted Travel Partners",
    description: "Partnered with top-rated airlines, hotels, and local guides worldwide.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance wherever you are in the world.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary via-[#FF5F6D] to-accent bg-clip-text text-transparent">
              MoonMiles
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Experience premium travel planning with features designed for your peace of mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
