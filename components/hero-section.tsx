"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowUpRight, CalendarDays, ChevronDown, MapPin, Pause, Play, Search, Users } from "lucide-react"

const scenes = [
  { name: "Bali", country: "Indonesia", image: "/bali-scenery.jpg", caption: "A slower kind of paradise." },
  { name: "Santorini", country: "Greece", image: "/santorini-white-buildings-blue-domes-sunset.jpg", caption: "Chase the last light." },
  { name: "Maldives", country: "Indian Ocean", image: "/maldives-overwater-bungalow-turquoise-water.jpg", caption: "Somewhere between sea and sky." },
]
const destinations = ["Bali, Indonesia", "Santorini, Greece", "Maldives", "Paris, France", "Tokyo, Japan", "Dubai, UAE", "London, UK", "New York, USA"]

function localDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}
function dayAfter(value: string) {
  const date = new Date(`${value}T12:00:00`)
  date.setDate(date.getDate() + 1)
  return localDate(date)
}

export function HeroSection() {
  const router = useRouter()
  const hero = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const visible = useInView(hero, { amount: 0.2 })
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const [interacting, setInteracting] = useState(false)
  const [destination, setDestination] = useState("Bali, Indonesia")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [travelers, setTravelers] = useState("2 Travelers")
  const [currency, setCurrency] = useState("USD")
  const [today, setToday] = useState("")
  const [error, setError] = useState("")
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const running = playing && visible && pageVisible && !interacting && !reducedMotion

  useEffect(() => {
    setToday(localDate(new Date()))
    const update = () => setPageVisible(!document.hidden)
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])

  useEffect(() => {
    if (!running) return
    // Slide scheduling only; CSS and Motion animate at the browser's repaint cadence.
    const timeout = window.setTimeout(() => setActive((index) => (index + 1) % scenes.length), 8000)
    return () => window.clearTimeout(timeout)
  }, [active, running])

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (checkIn && checkIn < localDate(new Date())) {
      setError("Choose a departure date from today onwards.")
      return
    }
    if ((checkIn && !checkOut) || (!checkIn && checkOut) || (checkIn && checkOut <= checkIn)) {
      setError("Choose a return date after your departure, or leave both dates open.")
      return
    }
    setError("")
    const params = new URLSearchParams({ destination, travelers, currency })
    if (checkIn) params.set("checkIn", checkIn)
    if (checkOut) params.set("checkOut", checkOut)
    router.push(`/search-results?${params.toString()}`)
  }

  return (
    <section ref={hero} className="mm-hero" aria-label="Discover your next escape">
      <div className="mm-hero-visual">
        <motion.div className="mm-hero-images" style={{ y: reducedMotion ? 0 : imageY }}>
          {scenes.map((scene, index) => (
            <div key={scene.name} className={`mm-hero-scene ${index === active ? "is-active" : ""}`}>
              <img src={scene.image} alt="" fetchPriority={index === 0 ? "high" : "low"} decoding="async" className="mm-hero-photo" style={{ animationPlayState: running ? "running" : "paused" }} />
            </div>
          ))}
        </motion.div>
        <div className="mm-hero-shade" />
        <motion.div className="mm-hero-copy" style={{ y: reducedMotion ? 0 : textY }}>
          <p className="mm-eyebrow mm-hero-enter"><span className="mm-tiny-sun" /> THE WORLD IS CLOSER THAN YOU THINK</p>
          <h1 className="mm-hero-enter">Find your<br /><em>somewhere.</em></h1>
          <div className="mm-hero-intro mm-hero-enter">
            <p>Out of the everyday. Into the unforgettable.<br />Thoughtful journeys for your kind of curious.</p>
            <Link href="/destinations" className="mm-hero-explore">Explore the world <ArrowUpRight size={18} /></Link>
          </div>
        </motion.div>
        <div className="mm-scene-picker" aria-label="Choose a destination scene" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }}>
          <span className="mm-scene-label">A CHANGE OF SCENERY</span>
          {scenes.map((scene, index) => (
            <button key={scene.name} type="button" className={`mm-scene-button ${index === active ? "is-active" : ""}`} aria-label={`Show ${scene.name}`} aria-pressed={index === active} onClick={() => { setActive(index); setPlaying(false) }}>
              <img src={scene.image} alt="" width={68} height={68} /><span>{scene.name}</span>
            </button>
          ))}
        </div>
        <div className="mm-hero-bottom">
          <div className="mm-scene-location" aria-live={playing ? "off" : "polite"}><MapPin size={16} /><div><strong>{scenes[active].name}, {scenes[active].country}</strong><span>{scenes[active].caption}</span></div></div>
          <div className="mm-scene-progress"><span>0{active + 1}</span><div className="mm-progress-track"><span key={`${active}-${running}`} className={running ? "is-running" : ""} /></div><span>03</span><button type="button" aria-label={playing ? "Pause destination slideshow" : "Play destination slideshow"} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={14} /> : <Play size={14} />}</button></div>
        </div>
      </div>
      <div className="mm-search-wrap">
        <form className="mm-search" onSubmit={search} aria-label="Find your trip">
          <label className="mm-search-field mm-search-destination"><MapPin size={19} /><span><span className="mm-field-label">Where to?</span><span className="mm-select-wrap"><select aria-label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)}>{destinations.map((place) => <option key={place}>{place}</option>)}</select><ChevronDown size={13} /></span></span></label>
          <label className="mm-search-field"><CalendarDays size={18} /><span><span className="mm-field-label">Check in</span><input aria-label="Check in" type="date" min={today} value={checkIn} required={Boolean(checkOut)} onChange={(event) => { setCheckIn(event.target.value); if (checkOut && event.target.value >= checkOut) setCheckOut(""); setError("") }} /></span></label>
          <label className="mm-search-field"><CalendarDays size={18} /><span><span className="mm-field-label">Check out</span><input aria-label="Check out" type="date" min={checkIn ? dayAfter(checkIn) : today} value={checkOut} required={Boolean(checkIn)} onChange={(event) => { setCheckOut(event.target.value); setError("") }} /></span></label>
          <label className="mm-search-field mm-search-travelers"><Users size={19} /><span><span className="mm-field-label">Good company</span><span className="mm-select-wrap"><select aria-label="Travelers" value={travelers} onChange={(event) => setTravelers(event.target.value)}>{["1 Traveler", "2 Travelers", "3 Travelers", "4 Travelers", "5+ Travelers"].map((value) => <option key={value}>{value}</option>)}</select><ChevronDown size={13} /></span></span></label>
          <button type="submit" className="mm-search-submit"><Search size={19} /><span>Find my escape</span><ArrowUpRight size={19} /></button>
        </form>
        <div className="mm-search-caption"><span><span className="mm-status-dot" /> A great trip starts with a little curiosity.</span><label>Plan in <select aria-label="Currency" value={currency} onChange={(event) => setCurrency(event.target.value)}>{["USD", "INR", "EUR", "GBP", "AED"].map((value) => <option key={value}>{value}</option>)}</select></label></div>
        {error && <p role="alert" className="mm-search-error">{error}</p>}
      </div>
      <a href="#discover" className="mm-scroll-cue"><ArrowDown size={14} /> A little inspiration below</a>
    </section>
  )
}
