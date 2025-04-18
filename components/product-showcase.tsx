"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products, accessories } from "@/data/products"
import { formatPrice } from "@/lib/utils"

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("rifles")

  const displayItems = activeTab === "rifles" ? products : accessories

  return (
    <section id="productos" className="section-padding bg-gradient-to-b from-gray-900 to-black">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
            Nuestros Productos
          </span>
          <h2 className="heading-lg mb-4 text-white font-cinzel">Colección Exclusiva</h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre nuestra selección de rifles de aire comprimido y accesorios, donde la artesanía se encuentra con la
            precisión.
          </p>
        </div>

        <Tabs defaultValue="rifles" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-black/50 border border-white/10 p-1">
              <TabsTrigger
                value="rifles"
                className="data-[state=active]:bg-white data-[state=active]:text-black px-6 py-2 uppercase text-xs tracking-wider transition-all duration-300 font-cinzel"
              >
                Rifles
              </TabsTrigger>
              <TabsTrigger
                value="accesorios"
                className="data-[state=active]:bg-white data-[state=active]:text-black px-6 py-2 uppercase text-xs tracking-wider transition-all duration-300 font-cinzel"
              >
                Accesorios
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {activeTab === "rifles" &&
                displayItems.map((product) => (
                  <Link key={product.id} href={`/productos/${product.id}`} className="group block h-full">
                    <div className="card-glass overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-white/30 hover:shadow-lg">
                      <div className="relative h-64 bg-black overflow-hidden">
                        <Image
                          src={product.gallery[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-amber-400 text-black text-xs px-2 py-1 uppercase tracking-wider font-medium">
                            Premium
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2">{product.shortDescription}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.variants.map((variant) => (
                            <span
                              key={variant.id}
                              className="bg-white/5 px-2 py-1 text-xs text-gray-300 border border-white/10"
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
                ))}

              {activeTab === "accesorios" &&
                displayItems.map((accessory: any) => (
                  <div
                    key={accessory.id}
                    className="card-glass overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-white/30 hover:shadow-lg"
                  >
                    <div className="relative h-48 bg-black overflow-hidden">
                      <Image
                        src={accessory.image || "/placeholder.svg"}
                        alt={accessory.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors duration-300">
                          {accessory.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{accessory.description}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-light">${formatPrice(accessory.price)}</span>
                        <Button size="sm" className="btn-primary">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
