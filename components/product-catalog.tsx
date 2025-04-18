"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products, accessories } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/types/product"

interface ProductCatalogProps {
  category?: string
  sort?: string
}

export default function ProductCatalog({ category = "todos", sort = "destacados" }: ProductCatalogProps) {
  const [displayItems, setDisplayItems] = useState<(Product | any)[]>([])
  const { addItem } = useCart()

  useEffect(() => {
    let items: (Product | any)[] = []

    // Filtrar por categoría
    if (category === "todos") {
      items = [...products, ...accessories]
    } else if (category === "rifles") {
      items = [...products]
    } else if (category === "accesorios") {
      items = [...accessories]
    } else if (category === "novedades") {
      // Simulamos que los primeros productos son novedades
      items = [...products.slice(0, 1), ...accessories.slice(0, 1)]
    }

    // Ordenar
    if (sort === "precio-asc") {
      items.sort((a, b) => a.price - b.price)
    } else if (sort === "precio-desc") {
      items.sort((a, b) => b.price - a.price)
    } else if (sort === "nombre") {
      items.sort((a, b) => a.name.localeCompare(b.name))
    }
    // Para "destacados" mantenemos el orden original

    setDisplayItems(items)
  }, [category, sort])

  const handleAddToCart = (item: any, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if ("variants" in item) {
      // Es un rifle, agregamos la primera variante
      addItem(item.id, item.variants[0].id, 1)
    } else {
      // Es un accesorio, lo agregamos directamente
      addItem(item.id, item.id, 1)
    }
  }

  if (displayItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No se encontraron productos en esta categoría.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">{displayItems.length} productos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <Link key={item.id} href={`/productos/${item.id}`} className="group block h-full">
            <div className="card-glass overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-white/30 hover:shadow-lg">
              <div className="relative h-64 bg-black overflow-hidden">
                <Image
                  src={item.gallery?.[0] || item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-amber-400 text-black text-xs px-2 py-1 uppercase tracking-wider font-medium">
                    Premium
                  </span>
                </div>

                {/* Botón de agregar al carrito */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-amber-400"
                    onClick={(e) => handleAddToCart(item, e)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{item.shortDescription || item.description}</p>
                </div>

                {"variants" in item && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.variants.map((variant: any) => (
                      <span
                        key={variant.id}
                        className="bg-white/5 px-2 py-1 text-xs text-gray-300 border border-white/10"
                      >
                        {variant.caliber}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-light">${formatPrice(item.price)}</span>
                  <span className="flex items-center text-amber-400 text-sm group-hover:translate-x-1 transition-transform duration-300">
                    Ver Detalles
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
