"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Minus, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/types/product"

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) return null

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
    })
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Características del producto basadas en la primera variante
  const selectedVariant = product.variants[0]
  const features = [
    `Calibre: ${selectedVariant.caliber} - Autonomía: ${selectedVariant.autonomy}`,
    "Sistema: PCP (Pre-Charged Pneumatic)",
    `Mecanismo: Side Lever (palanca lateral)`,
    `Potencia: ${selectedVariant.velocity}`,
    `Diseño: ${product.id.includes("j1") ? "Carabina tradicional" : "Bullpup compacto"}`,
    `Cañón: Estriado con 6-12 microestrías (fabricación propia)`,
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-gray-900 rounded-lg shadow-xl"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 rounded-full bg-black/50 hover:bg-black/70"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-[300px] md:h-full min-h-[400px] bg-black">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 font-playfair">{product.name}</h2>
                <p className="text-gray-400 mb-6">{product.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-medium">Características</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-300 mr-2">•</span>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold">${formatPrice(product.price)}</span>
                    <div className="flex items-center border border-gray-700 rounded-md">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={handleDecrement}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={handleIncrement}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    className={`w-full py-6 transition-all duration-300 ${
                      addedToCart ? "bg-green-600 hover:bg-green-700" : "btn-elegant-primary"
                    }`}
                    onClick={handleAddToCart}
                  >
                    {addedToCart ? (
                      <span className="flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        AGREGADO AL CARRITO
                      </span>
                    ) : (
                      "AGREGAR AL CARRITO"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
