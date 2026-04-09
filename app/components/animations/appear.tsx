'use client'

import { motion } from "motion/react"

interface AppearProps {
  children: React.ReactNode
}

export function Appear({ children}: AppearProps) {

  return (
    <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        {children}
    </motion.div>
  )
}