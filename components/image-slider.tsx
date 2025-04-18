"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSliderProps {
  images: {
    src: string
    alt: string
  }[]
  autoPlay?: boolean
  interval?: number
}

export default function ImageSlider({ images, autoPlay = true, interval = 5000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!autoPlay || isHovering) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, images.length, isHovering])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-sm"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src || "/placeholder.svg"}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Controles más pequeños y discretos */}
      <div className="absolute inset-0 flex items-center justify-between p-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={goToPrevious}
          className="bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={goToNext}
          className="bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Indicadores más pequeños */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex ? "bg-gold-500 w-3" : "bg-white/50"
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
