"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface PageBannerProps {
  title: string
  subtitle?: string
  description?: string
  imageSrc: string
}

export default function PageBanner({ title, subtitle, description, imageSrc }: PageBannerProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#1A1A1A]/90" />

        {/* Efecto de partículas doradas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-500/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {subtitle && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block text-gold-500 uppercase tracking-widest text-sm mb-3 font-cinzel"
            >
              {subtitle}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold mb-6 font-cinzel gold-gradient"
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gold-500/30 mx-auto mb-6"
          />
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-parchment-300 max-w-2xl mx-auto text-lg"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
