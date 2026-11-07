"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</MotionConfig>
}
