"use client"

import { useState } from "react"
import Image from "next/image"
import { Info } from "lucide-react"

export default function PaymentMethods({ compact = false }) {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null)

  const paymentMethods = [
    {
      name: "Visa",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visa-dSqgCeKXIdM44RDg0MXNRGSfWhkXCJ.png",
      description: "Aceptamos todas las tarjetas Visa, incluyendo débito y crédito.",
    },
    {
      name: "Mastercard",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mastercard-G7r39agcLvOIZfKOT7LPBHssN5Uiff.png",
      description: "Aceptamos todas las tarjetas Mastercard, incluyendo débito y crédito.",
    },
    {
      name: "Naranja",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/naranja-J13FVOmEo6Re8uDQHUzEOgnyaExF6E.png",
      description: "Financiación hasta 12 cuotas con tarjetas Naranja.",
    },
    {
      name: "Pago Fácil",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pagofacil-F3pATh5OiIcMkiKEL4b7RBq2msF8jo.png",
      description: "Paga en efectivo en cualquier sucursal de Pago Fácil.",
    },
    {
      name: "Rapipago",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rapipago-iXhbsJQIjoQ32Tald52kW5TUYb05g3.png",
      description: "Paga en efectivo en cualquier sucursal de Rapipago.",
    },
    {
      name: "Efectivo",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/efectivo-3X8vSLFTuKrZJx8OO5FfyV7nBZxP8P.png",
      description: "Pago en efectivo al momento de la entrega (solo CABA y GBA).",
    },
  ]

  return (
    <div className="w-full">
      {/* Versión compacta para checkout */}
      {compact ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="relative"
              onMouseEnter={() => setHoveredMethod(method.name)}
              onMouseLeave={() => setHoveredMethod(null)}
            >
              <div className="bg-white/5 p-2 rounded-md h-10 w-auto flex items-center justify-center transition-all duration-300 hover:bg-white/10">
                <Image
                  src={method.image || "/placeholder.svg"}
                  alt={`Pago con ${method.name}`}
                  width={40}
                  height={20}
                  className="h-4 w-auto object-contain"
                />
              </div>

              {hoveredMethod === method.name && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm text-xs text-center z-10">
                  {method.description}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/80 border-r border-b border-white/10"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Versión completa para footer */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white/5 p-3 rounded-md h-12 w-auto flex items-center justify-center transition-all duration-300 hover:bg-white/10"
              >
                <Image
                  src={method.image || "/placeholder.svg"}
                  alt={`Pago con ${method.name}`}
                  width={60}
                  height={30}
                  className="h-5 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center text-center">
            <Info className="h-4 w-4 mr-2 text-gray-500" aria-hidden="true" />
            <p className="text-xs text-gray-500">
              Todos los pagos son procesados de forma segura. Aceptamos hasta 12 cuotas sin interés con tarjetas
              seleccionadas.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
