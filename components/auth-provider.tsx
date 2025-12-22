"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  name?: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load initial user from localStorage on the client
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = window.localStorage.getItem("moonmiles_user")
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Failed to load stored user", error)
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("moonmiles_user", JSON.stringify(userData))
      } catch (error) {
        console.error("Failed to persist user", error)
      }
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("moonmiles_user")
      } catch (error) {
        console.error("Failed to clear stored user", error)
      }
    }
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}