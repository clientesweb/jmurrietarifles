"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Ocultar el splash screen después de 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-60 h-20 md:w-80 md:h-28"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-3x9rpXntbkt5mShwsv2OtChUDRfMfJ.png"
              alt="J. Murrieta"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-1/3 h-1 bg-gold-500/50 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
