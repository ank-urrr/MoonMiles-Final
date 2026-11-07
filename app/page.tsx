import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { DestinationsSection } from "@/components/destinations-section"
import { Chatbot } from "@/components/chatbot"
import { Footer } from "@/components/footer"
import { JourneySection } from "@/components/journey-section"

export default function HomePage() {
  return (
    <div className="mm-home">
      <Navbar overlay />
      <main id="main-content">
        <HeroSection />
        <DestinationsSection />
        <JourneySection />
        <FeaturesSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
