import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { MotionProvider } from "@/components/motion-provider"
import "./globals.css"
import "./moonmiles.css"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })

export const metadata: Metadata = {
  title: "MoonMiles — Find your somewhere",
  description:
    "Curated journeys, seamless planning, unforgettable experiences. Your premium travel agency for destinations worldwide.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#f7f6f0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <MotionProvider>{children}</MotionProvider>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
