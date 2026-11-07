"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

interface Particle { x: number; y: number; size: number; speedX: number; speedY: number }

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let frame: number | null = null
    let previous: number | null = null
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    const particles: Particle[] = Array.from({ length: 24 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 3 + 1, speedX: (Math.random() - 0.5) * 18, speedY: (Math.random() - 0.5) * 18 }))
    const animate = (timestamp: number) => {
      // Pixels per second, independent of the display refresh rate. Clamp resume gaps.
      const delta = previous === null ? 0 : Math.min((timestamp - previous) / 1000, 0.05)
      previous = timestamp
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const particle of particles) {
        particle.x = (particle.x + particle.speedX * delta + canvas.width) % canvas.width
        particle.y = (particle.y + particle.speedY * delta + canvas.height) % canvas.height
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(112, 133, 99, 0.13)"
        ctx.fill()
      }
      frame = requestAnimationFrame(animate)
    }
    const visibility = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      previous = null
      if (!document.hidden) frame = requestAnimationFrame(animate)
    }
    visibility()
    window.addEventListener("resize", resize, { passive: true })
    document.addEventListener("visibilitychange", visibility)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", visibility)
    }
  }, [reducedMotion])
  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" />
}

// Deterministic positions avoid server/client hydration mismatches and rerender jumps.
const dots = Array.from({ length: 12 }, (_, i) => ({ id: i, size: 2 + (i % 4), x: (i * 37 + 7) % 100, y: (i * 23 + 11) % 100, duration: 20 + (i % 5) * 4 }))

export function FloatingDots() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const update = () => { if (ref.current) ref.current.dataset.paused = String(document.hidden) }
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])
  return <div ref={ref} aria-hidden="true" className="mm-floating-dots fixed inset-0 pointer-events-none z-0 overflow-hidden">{dots.map((dot) => <span key={dot.id} className="mm-floating-dot" style={{ width: dot.size, height: dot.size, left: `${dot.x}%`, top: `${dot.y}%`, animationDuration: `${dot.duration}s`, animationDelay: `${-dot.id}s` }} />)}</div>
}
