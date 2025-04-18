"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function WhatsappButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleClick = () => {
    // Número de WhatsApp actualizado
    const phoneNumber = "5493513997865"
    window.open(`https://wa.me/${phoneNumber}`, "_blank", "noopener,noreferrer")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg transition-all duration-300"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>

        {isHovered && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-md text-sm">
            Contáctanos por WhatsApp
          </div>
        )}
      </div>
    </div>
  )
}
