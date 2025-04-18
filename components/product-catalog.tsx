"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products, accessories } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/types/product"
import { motion } from "framer-motion"

interface ProductCatalogProps {
  category?: string
  sort?: string
}

export default function ProductCatalog({ category = "todos", sort = "destacados" }: ProductCatalogProps) {
  const [displayItems, setDisplayItems] = useState<(Product | any)[]>([])
  const { addItem } = useCart()
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})

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

    // Mostrar animación de confirmación
    setAddedItems((prev) => ({ ...prev, [item.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }))
    }, 2000)
  }

  if (displayItems.length === 0) {
    return (
      <div className="text-center py-12 card-glass">
        <p className="text-gray-400 mb-4">No se encontraron productos en esta categoría.</p>
        <Link href="/productos">
          <Button className="bg-gold-500 hover:bg-gold-600 text-black font-cinzel">Ver Todos los Productos</Button>
        </Link>
      </div>
    )
  }

  // Variantes para animaciones
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold font-cinzel gold-gradient">{displayItems.length} productos</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {displayItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Link href={`/productos/${item.id}`} className="group block h-full">
              <div className="card-glass overflow-hidden h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-gold-500/10 hover:border-gold-500/30">
                <div className="relative h-64 bg-black overflow-hidden">
                  <Image
                    src={item.gallery?.[0] || item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-400 text-black text-xs px-2 py-1 uppercase tracking-wider font-medium">
                      Premium
                    </span>
                  </div>

                  {/* Rating stars */}
                  <div className="absolute bottom-3 left-3 flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${star <= 5 ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white ml-1">5.0</span>
                  </div>

                  {/* Botón de agregar al carrito */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <Button
                      size="sm"
                      className={`${
                        addedItems[item.id]
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gold-500 hover:bg-gold-600 text-black"
                      } transition-colors duration-300`}
                      onClick={(e) => handleAddToCart(item, e)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      {addedItems[item.id] ? "¡Agregado!" : "Agregar"}
                    </Button>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors duration-300 font-cinzel">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{item.shortDescription || item.description}</p>
                  </div>

                  {"variants" in item && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.variants.map((variant: any) => (
                        <span
                          key={variant.id}
                          className="bg-white/5 px-2 py-1 text-xs text-gray-300 border border-white/10 rounded-full"
                        >
                          {variant.caliber}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-light gold-gradient">${formatPrice(item.price)}</span>
                    <span className="flex items-center text-amber-400 text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Ver Detalles
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
