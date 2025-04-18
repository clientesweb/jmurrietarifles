"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden" aria-labelledby="hero-heading">
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

      {/* Partículas decorativas doradas */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido con animaciones */}
      <div className="relative z-10 container-custom h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="max-w-3xl"
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
              className="heading-xl mb-6 text-parchment-500 font-cinzel"
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
              <Button className="bg-gold-500 text-[#1A1A1A] hover:bg-gold-600 font-cinzel" onClick={scrollToProducts}>
                Descubrir Colección
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-cinzel"
                onClick={() => document.getElementById("caracteristicas")?.scrollIntoView({ behavior: "smooth" })}
              >
                Nuestra Filosofía
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Botón de scroll con animación */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.button
            aria-label="Desplazarse hacia abajo"
            className="text-gold-500/70 hover:text-gold-500 transition-colors duration-300 rounded-full border border-gold-500/30 p-2"
            onClick={scrollToProducts}
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
