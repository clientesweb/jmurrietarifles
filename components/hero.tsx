"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Efecto parallax
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.scrollY)

  useEffect(() => {
    // Marcar como cargado después de un breve retraso para permitir la animación
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Efecto de parallax al hacer scroll
    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToProducts = () => {
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden" aria-labelledby="hero-heading">
      {/* Fondo con overlay y efecto parallax */}
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${offsetY * 0.3}px)` }}>
        <Image
          src="/images/hero-rifle.jpeg"
          alt="Rifle de aire comprimido J. Murrieta"
          fill
          priority
          className="object-cover object-center scale-110 transition-transform duration-700"
          sizes="100vw"
        />
        {/* Overlay con gradiente mejorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#1A1A1A]/90" />
      </div>

      {/* Contenido con animaciones */}
      <div className="relative z-10 container-custom h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <div className="mb-6">
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div
                  className="w-16 h-16 relative mr-4"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image src="/images/logo-murrieta.png" alt="J. Murrieta Logo" fill className="object-contain" />
                </motion.div>
                <span className="text-sm uppercase tracking-widest text-gold-300 font-cinzel">Desde 2021</span>
              </motion.div>

              <motion.h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-parchment-500 font-cinzel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Precisión <span className="gold-gradient italic font-light">Legendaria</span>
              </motion.h1>

              <motion.div
                className="w-24 h-px bg-gold-500/50 mb-8"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 1 }}
              />

              <motion.p
                className="text-xl md:text-2xl text-parchment-300 mb-12 max-w-xl font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Descubre la excelencia en rifles de aire comprimido PCP, donde la innovación tecnológica se une con la
                tradición artesanal argentina.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Button
                  className="bg-gold-500 text-[#1A1A1A] hover:bg-gold-600 font-cinzel py-6 px-8 text-base"
                  onClick={scrollToProducts}
                >
                  Descubrir Colección
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Link href="/sobre-nosotros">
                  <Button
                    variant="outline"
                    className="border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-cinzel py-6 px-8 text-base"
                  >
                    Nuestra Historia
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Rifle image with transparent background */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative w-full h-[500px]">
              <Image
                src="/images/rifle-transparent.png"
                alt="Rifle J. Murrieta Premium"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-gold-500/10 filter blur-xl rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-8 h-12 rounded-full border-2 border-gold-500/30 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <motion.div
              className="w-1 h-3 bg-gold-500 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
