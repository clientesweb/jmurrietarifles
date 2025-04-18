"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"
import type { Product } from "@/types/product"

interface RelatedProductsProps {
  currentProductId: string
  limit?: number
}

export default function RelatedProducts({ currentProductId, limit = 3 }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    // Filtrar productos relacionados (excluyendo el producto actual)
    const filtered = products.filter((product) => product.id !== currentProductId)

    // Tomar solo la cantidad especificada por el límite
    const limited = filtered.slice(0, limit)

    setRelatedProducts(limited)
  }, [currentProductId, limit])

  if (relatedProducts.length === 0) return null

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
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between mb-8"
      >
        <h2 className="text-2xl font-bold text-white font-cinzel gold-gradient">Productos Relacionados</h2>
        <Link
          href="/#productos"
          className="text-gold-500 hover:text-gold-400 transition-colors duration-300 flex items-center text-sm"
        >
          Ver todos
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {relatedProducts.map((product) => (
          <motion.div key={product.id} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            <Link href={`/productos/${product.id}`} className="group block">
              <div className="card-glass overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg border border-gold-500/10">
                <div className="relative h-64 bg-black overflow-hidden">
                  <Image
                    src={product.gallery[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold-500 text-black text-xs px-2 py-1 uppercase tracking-wider font-medium">
                      Premium
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors duration-300 font-cinzel">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.shortDescription}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-light gold-gradient">${formatPrice(product.price)}</span>
                    <span className="flex items-center text-gold-500 text-sm group-hover:translate-x-1 transition-transform duration-300">
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
    </section>
  )
}
