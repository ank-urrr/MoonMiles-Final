"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, Menu, Moon, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

const links = [{ href: "/destinations", label: "Destinations" }, { href: "/itinerary-planner", label: "Trip planner" }, { href: "/about", label: "Our story" }, { href: "/contact", label: "Get in touch" }]

export function Brand() {
  return <><span className="mm-brand-icon"><Moon size={25} strokeWidth={1.6} /><span /></span><span>moonmiles<span className="mm-brand-period">.</span></span></>
}

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const account = <Link href={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)}>{user ? "My account" : "Log in"}</Link>
  function signOut() { logout(); setOpen(false); router.push("/") }

  return (
    <>
      <a className="mm-skip" href="#main-content">Skip to content</a>
      <header className={`mm-nav ${overlay ? "mm-nav-overlay" : "mm-nav-solid"}`}>
        <Link href="/" className="mm-brand" aria-label="MoonMiles home"><Brand /></Link>
        <nav className="mm-desktop-nav" aria-label="Main navigation">{links.map((link) => <Link href={link.href} key={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
        <div className="mm-nav-actions">{account}{user && <button type="button" onClick={signOut}>Log out</button>}<Link className="mm-nav-cta" href="/itinerary-planner">Let’s go somewhere <ArrowUpRight size={16} /></Link></div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild><button type="button" className="mm-menu-trigger" aria-label="Open navigation menu"><Menu size={24} /></button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="mm-menu-backdrop" />
            <Dialog.Content className="mm-mobile-menu" aria-describedby={undefined}>
              <Dialog.Title className="mm-brand"><Brand /></Dialog.Title>
              <Dialog.Close className="mm-menu-close" aria-label="Close navigation menu"><X size={24} /></Dialog.Close>
              <p className="mm-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
              <nav aria-label="Mobile navigation"><Link href="/" onClick={() => setOpen(false)}>Home <ArrowUpRight size={21} /></Link>{links.map((link) => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={21} /></Link>)}</nav>
              <div className="mm-mobile-account">{account}{user && <button type="button" onClick={signOut}>Log out</button>}</div>
              <Link href="/itinerary-planner" className="mm-button" onClick={() => setOpen(false)}>Plan your escape <ArrowUpRight size={18} /></Link>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </header>
    </>
  )
}
