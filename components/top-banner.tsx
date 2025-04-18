"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-black py-2 relative">
      <div className="container-custom flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">¡Conócenos! Descubre la historia detrás de nuestros rifles</span>
          <Link href="/sobre-nosotros">
            <Button
              size="sm"
              variant="outline"
              className="bg-black/10 border-black/20 hover:bg-black/20 text-black text-xs py-1"
            >
              Nuestra Historia
            </Button>
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black/70 hover:text-black transition-colors"
          aria-label="Cerrar banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
