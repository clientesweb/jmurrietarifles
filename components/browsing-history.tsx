"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/types/product"

export default function BrowsingHistory() {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([])

  useEffect(() => {
    // En una implementación real, esto vendría de localStorage o una API
    // Aquí simulamos productos vistos recientemente
    const recentlyViewed = products.slice(0, 4)
    setViewedProducts(recentlyViewed)
  }, [])

  const scrollLeft = () => {
    document.getElementById("history-container")?.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    document.getElementById("history-container")?.scrollBy({ left: 300, behavior: "smooth" })
  }

  if (viewedProducts.length === 0) return null

  return (
    <div className="container-custom py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Vistos Recientemente</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/20 text-white"
            onClick={scrollLeft}
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/20 text-white"
            onClick={scrollRight}
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        id="history-container"
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        {viewedProducts.map((product) => (
          <Link key={product.id} href={`/productos/${product.id}`} className="flex-shrink-0 w-64 group">
            <div className="card-glass overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-white/30 hover:shadow-lg">
              <div className="relative h-40 bg-black overflow-hidden">
                <Image
                  src={product.gallery[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold mb-1 group-hover:text-amber-400 transition-colors duration-300 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-2">{product.shortDescription}</p>
                <span className="mt-auto text-lg font-light">${formatPrice(product.price)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
