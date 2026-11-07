"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@moonmiles.com",
    href: "mailto:hello@moonmiles.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "123 Travel Street, Adventure City, AC 12345",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri: 9AM - 6PM EST",
    href: "#",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Have questions about your next adventure? We're here to help you plan the perfect trip. Reach out and
              let's start planning together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-strong rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="custom">Custom Trip Planning</option>
                        <option value="support">Customer Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your travel plans or questions..."
                        className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gradient text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Prefer to reach out directly? Here's how you can contact us. Our team typically responds within 24
                  hours.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass rounded-2xl p-5 flex items-start gap-4 group hover:scale-[1.02] transition-transform cursor-pointer block"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-2xl overflow-hidden aspect-video mt-8"
              >
                <img src="/modern-office-location-map-illustration-warm-color.jpg" alt="Office location" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "How do I book a trip with MoonMiles?",
                a: "You can use our Itinerary Planner to create a custom trip, or contact us directly for personalized assistance.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for your convenience.",
              },
              {
                q: "Can I modify my booking after confirmation?",
                a: "Yes, modifications can be made up to 14 days before your trip. Contact our support team for assistance.",
              },
              {
                q: "Do you offer travel insurance?",
                a: "We partner with leading travel insurance providers and can help you find the right coverage for your trip.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
