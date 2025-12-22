"use client"

import Link from "next/link"
import { Plane } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border relative z-10 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">MoonMiles</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">© 2025 MoonMiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
