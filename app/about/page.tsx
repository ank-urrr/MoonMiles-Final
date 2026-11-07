"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Users, Globe, Award, Heart } from "lucide-react"

const stats = [
  { label: "Happy Travelers", value: "50,000+", icon: Users },
  { label: "Destinations", value: "120+", icon: Globe },
  { label: "Years Experience", value: "15+", icon: Award },
  { label: "5-Star Reviews", value: "10,000+", icon: Heart },
]

const team = [
  {
    name: "Ankur Patil",
    role: "Founder & CEO",
    image: "/Ankur.jpg",
  },
  {
    name: "Rudraksh Gupta",
    role: "Head of Operations",
    image: "/Rudraksh.jpeg",
  },
  {
    name: "Aditya Pandey",
    role: "Customer Success Lead",
    image: "/Pandey.png",
  },
  {
    name: "Pushpak Sarode",
    role: "Travel Experience Director",
    image: "/Pushpak.png",
  },
]

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              About <span className="text-primary">MoonMiles</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              We're passionate travelers who believe everyone deserves unforgettable journeys. Since 2010, we've been
              crafting personalized travel experiences that create lasting memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MoonMiles was born from a simple belief: travel should be transformative, not stressful. Our founder,
                  Ankur Patil, started this journey after experiencing the frustration of poorly planned trips that
                  missed the essence of each destination.
                </p>
                <p>
                  Today, we're a team of passionate travel experts who handpick every experience, from hidden local gems
                  to world-renowned attractions. We partner with trusted accommodations, guides, and transport providers
                  to ensure seamless journeys.
                </p>
                <p>
                  Our mission is to help you explore the world with confidence, creating memories that last a lifetime
                  while respecting local cultures and environments.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/travel-team-planning-trip-with-world-map-warm-offi.jpg"
                alt="MoonMiles team"
                className="rounded-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The passionate travelers behind your perfect journeys.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Passion</h3>
                <p className="text-muted-foreground">We love what we do and it shows in every itinerary we craft.</p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Sustainability</h3>
                <p className="text-muted-foreground">We promote responsible travel that respects local communities.</p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Excellence</h3>
                <p className="text-muted-foreground">We never settle for less than extraordinary experiences.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
