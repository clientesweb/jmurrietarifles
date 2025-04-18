"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products, accessories } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("rifles")
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const displayItems = activeTab === "rifles" ? products : accessories

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="productos" className="py-24 bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
            Nuestros Productos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-cinzel">
            Colección Exclusiva
          </h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre nuestra selección de rifles de aire comprimido y accesorios, donde la artesanía se encuentra con la
            precisión.
          </p>
        </motion.div>

        <Tabs defaultValue="rifles" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-black/50 border border-white/10 p-1.5 rounded-full">
              <TabsTrigger
                value="rifles"
                className="data-[state=active]:bg-gold-500 data-[state=active]:text-black px-8 py-3 rounded-full uppercase text-xs tracking-wider transition-all duration-300 font-cinzel"
              >
                Rifles
              </TabsTrigger>
              <TabsTrigger
                value="accesorios"
                className="data-[state=active]:bg-gold-500 data-[state=active]:text-black px-8 py-3 rounded-full uppercase text-xs tracking-wider transition-all duration-300 font-cinzel"
              >
                Accesorios
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {activeTab === "rifles" &&
                displayItems.map((product, index) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <Link href={`/productos/${product.id}`} className="group block h-full">
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-gold-500/10 hover:border-gold-500/30">
                        <div className="relative h-72 bg-black overflow-hidden">
                          <Image
                            src={product.gallery[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="bg-amber-400 text-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium">
                              Premium
                            </span>
                          </div>
                        </div>

                        <div className="p-8 flex-grow flex flex-col">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">
                              {product.name}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2">{product.shortDescription}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {product.variants.map((variant) => (
                              <span
                                key={variant.id}
                                className="bg-white/5 px-2 py-1 text-xs text-gray-300 border border-white/10 rounded-full"
                              >
                                {variant.caliber}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-lg font-light">Desde ${formatPrice(product.price)}</span>
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

              {activeTab === "accesorios" &&
                displayItems.map((accessory: any, index) => (
                  <motion.div key={accessory.id} variants={itemVariants}>
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-gold-500/10 hover:border-gold-500/30">
                      <div className="relative h-64 bg-black overflow-hidden">
                        <Image
                          src={accessory.image || "/placeholder.svg"}
                          alt={accessory.name}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>

                      <div className="p-8 flex-grow flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold mb-3 transition-colors duration-300">{accessory.name}</h3>
                          <p className="text-gray-400 text-sm">{accessory.description}</p>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-lg font-light">${formatPrice(accessory.price)}</span>
                          <Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-black rounded-full">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Agregar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Link href="/productos">
            <Button className="bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500/10 px-8 py-6 rounded-full">
              Ver Todos los Productos
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
