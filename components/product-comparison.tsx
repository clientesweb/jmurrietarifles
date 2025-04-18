"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/types/product"

export default function ProductComparison() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(products.slice(0, 2))

  const toggleComparison = () => {
    setIsOpen(!isOpen)
  }

  const features = [
    "Calibre",
    "Autonomía",
    "Potencia",
    "Diseño",
    "Cañón",
    "Mecanismo de Carga",
    "Gatillo",
    "Culata",
    "Armazón",
    "Peso",
    "Agrupación",
  ]

  return (
    <div className="container-custom py-16">
      <div className="text-center mb-8">
        <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
          Comparativa
        </span>
        <h2 className="heading-lg mb-4 text-white font-cinzel">Compara Nuestros Modelos</h2>
        <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
        <p className="text-gray-300 max-w-2xl mx-auto">
          Encuentra el rifle perfecto para ti comparando las características de nuestros modelos premium.
        </p>
      </div>

      <div className="card-glass overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-medium text-white">Comparativa de Modelos</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-400 hover:text-amber-300"
            onClick={toggleComparison}
            aria-expanded={isOpen}
          >
            {isOpen ? "Ocultar detalles" : "Ver detalles"}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <div className={`transition-all duration-500 ${isOpen ? "max-h-[2000px]" : "max-h-0"} overflow-hidden`}>
          <div className="grid grid-cols-3 gap-4 p-6">
            {/* Encabezados */}
            <div className="col-span-1">
              <div className="h-40"></div> {/* Espacio para las imágenes de productos */}
              {features.map((feature, index) => (
                <div key={index} className="py-3 font-medium text-white border-t border-white/10">
                  {feature}
                </div>
              ))}
              <div className="py-3 font-medium text-white border-t border-white/10">Precio</div>
            </div>

            {/* Productos */}
            {selectedProducts.map((product) => (
              <div key={product.id} className="col-span-1">
                <div className="h-40 relative mb-4">
                  <Image
                    src={product.gallery[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h4 className="font-bold text-lg mb-4 text-white">{product.name}</h4>

                {/* Calibre */}
                <div className="py-3 text-gray-300 border-t border-white/10">
                  {product.variants.map((v) => v.caliber).join(", ")}
                </div>

                {/* Autonomía */}
                <div className="py-3 text-gray-300 border-t border-white/10">
                  <p>Cal. 5.50: 30-35 disparos (200 bar)</p>
                  <p>Cal. 6.35: 25-30 disparos (200 bar)</p>
                  <p>Cal. 7.62: 10-15 disparos (200 bar)</p>
                </div>

                {/* Potencia */}
                <div className="py-3 text-gray-300 border-t border-white/10">
                  950-1050 fps (200 bar)
                  <br />
                  700-750 fps (100 bar)
                </div>

                {/* Diseño */}
                <div className="py-3 text-gray-300 border-t border-white/10">
                  {product.id === "murrieta-j1" ? "Carabina tradicional" : "Bullpup compacto"}
                </div>

                {/* Cañón */}
                <div className="py-3 text-gray-300 border-t border-white/10">
                  Estriado: 6-12 microestrías
                  <br />
                  Longitud: 550mm
                </div>

                {/* Mecanismo de Carga */}
                <div className="py-3 text-gray-300 border-t border-white/10">Side Lever (palanca lateral)</div>

                {/* Gatillo */}
                <div className="py-3 text-gray-300 border-t border-white/10">Con seguro y regulador</div>

                {/* Culata */}
                <div className="py-3 text-gray-300 border-t border-white/10">
                  Artesanal en madera
                  <br />
                  Tonalidades: clara, media, oscura
                  <br />
                  Opción: negra texturada
                </div>

                {/* Armazón */}
                <div className="py-3 text-gray-300 border-t border-white/10">
                  Recubrimiento: Pintura Microtexturado
                  <br />
                  Negro o Marrón
                </div>

                {/* Peso */}
                <div className="py-3 text-gray-300 border-t border-white/10">3kg - 3.5kg</div>

                {/* Agrupación */}
                <div className="py-3 text-gray-300 border-t border-white/10">
                  30 disparos en un diámetro de 25mm a 35 metros
                </div>

                {/* Precio */}
                <div className="py-3 text-amber-400 font-bold border-t border-white/10">
                  ${formatPrice(product.price)}
                </div>

                <div className="mt-4">
                  <Link href={`/productos/${product.id}`}>
                    <Button className="w-full bg-amber-400 hover:bg-amber-500 text-black">Ver Detalles</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-400 hover:text-amber-300"
            onClick={toggleComparison}
            aria-expanded={isOpen}
          >
            {isOpen ? "Ocultar comparativa" : "Ver comparativa completa"}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}
