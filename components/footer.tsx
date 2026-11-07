import Link from "next/link"
import { ArrowUpRight, Moon } from "lucide-react"

export function Footer() {
  return (
    <footer className="mm-footer">
      <div className="mm-footer-top"><div><p className="mm-eyebrow">YOUR NEXT STORY IS OUT THERE</p><h2>Let’s make it<br /><em>a good one.</em></h2><Link href="/itinerary-planner" className="mm-button mm-button-cream">Start exploring <ArrowUpRight size={18} /></Link></div><div className="mm-footer-links"><div><h3>Explore</h3><Link href="/destinations">Destinations</Link><Link href="/itinerary-planner">AI trip planner</Link><Link href="/dashboard">My journeys</Link></div><div><h3>MoonMiles</h3><Link href="/about">Our story</Link><Link href="/contact">Get in touch</Link><Link href="/login">Your account</Link></div></div></div>
      <div className="mm-footer-bottom"><Link href="/" className="mm-brand" aria-label="MoonMiles home"><Moon size={24} strokeWidth={1.5} /><span>moonmiles.</span></Link><span>A little further from ordinary.</span><small>© {new Date().getFullYear()} MoonMiles</small></div>
    </footer>
  )
}
