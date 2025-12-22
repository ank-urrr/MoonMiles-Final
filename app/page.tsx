import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { DestinationsSection } from "@/components/destinations-section"
import { Chatbot } from "@/components/chatbot"
import { Footer } from "@/components/footer"
import { FloatingDots } from "@/components/animated-background"

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <HeroSection />
      <div className="relative">
        <FloatingDots />
        <FeaturesSection />
        <DestinationsSection />
        <Footer />
      </div>
      <Chatbot />
    </main>
  )
}
