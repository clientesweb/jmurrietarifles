"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Minus, Plus, Check, ShoppingBag, Star, ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"
import ProductFAQs from "@/components/product-faqs"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"
import Link from "next/link"
import type { Product } from "@/types/product"

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [isTabsMenuOpen, setIsTabsMenuOpen] = useState(false)
  const { addItem } = useCart()

  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId)

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem(product.id, selectedVariant.id, quantity)
      setAddedToCart(true)
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000)
    }
  }

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 10))
  }

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)
  }

  // Calcular la calificación promedio (simulada para este ejemplo)
  const averageRating = 4.8

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setIsTabsMenuOpen(false)
  }

  const tabItems = [
    { value: "description", label: "Descripción" },
    { value: "specifications", label: "Especificaciones" },
    { value: "reviews", label: "Reseñas" },
    { value: "faqs", label: "Preguntas Frecuentes" },
  ]

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Botón de retroceso */}
      <div className="mb-6">
        <Link href="/#productos">
          <Button variant="ghost" className="group flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver a productos
          </Button>
        </Link>
      </div>

      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm" aria-label="Migas de pan">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
              Inicio
            </a>
          </li>
          <li className="text-gray-600">/</li>
          <li>
            <a href="/#productos" className="text-gray-400 hover:text-white transition-colors duration-300">
              Productos
            </a>
          </li>
          <li className="text-gray-600">/</li>
          <li className="text-white">{product.name}</li>
        </ol>
      </nav>

      {/* Información principal del producto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-black/30 rounded-sm overflow-hidden card-glass">
            <Image
              src={product.gallery[currentImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority={true}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.gallery.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors duration-300"
                  onClick={prevImage}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors duration-300"
                  onClick={nextImage}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <div className="absolute top-4 left-4">
              <span className="bg-amber-400 text-black text-xs px-2 py-1 uppercase tracking-wider font-medium">
                Premium
              </span>
            </div>
          </div>

          {product.gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden transition-all duration-300 ${
                    currentImageIndex === index
                      ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-black"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Ver imagen ${index + 1} de ${product.gallery.length}`}
                  aria-current={currentImageIndex === index ? "true" : "false"}
                >
                  <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {averageRating} ({product.variants.reduce((acc, variant) => acc + variant.stock, 0)} reseñas)
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{product.name}</h1>
            <p className="text-xl text-gray-300 mb-4">{product.shortDescription}</p>
            <div className="text-2xl font-light mb-4 text-white">
              ${formatPrice(selectedVariant?.price || product.price)}
            </div>
            {selectedVariant && selectedVariant.stock > 0 ? (
              <div className="inline-flex items-center bg-green-900/30 text-green-400 text-sm px-3 py-1 rounded-sm">
                <span className="block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                En stock ({selectedVariant.stock} disponibles)
              </div>
            ) : (
              <div className="inline-flex items-center bg-red-900/30 text-red-400 text-sm px-3 py-1 rounded-sm">
                <span className="block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                Agotado
              </div>
            )}
          </div>

          <Separator className="bg-white/10" />

          {/* Selección de variantes */}
          <div>
            <h2 className="text-sm uppercase tracking-wider mb-4">Seleccionar Calibre</h2>
            <RadioGroup
              value={selectedVariantId}
              onValueChange={setSelectedVariantId}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            >
              {product.variants.map((variant) => (
                <div key={variant.id} className="relative">
                  <RadioGroupItem
                    value={variant.id}
                    id={variant.id}
                    className="peer sr-only"
                    aria-label={variant.name}
                    disabled={variant.stock <= 0}
                  />
                  <Label
                    htmlFor={variant.id}
                    className={`flex flex-col p-4 border rounded-sm cursor-pointer transition-all duration-300 
                    ${
                      variant.stock <= 0
                        ? "border-gray-700 bg-gray-900/30 text-gray-500 cursor-not-allowed"
                        : "border-white/20 peer-data-[state=checked]:border-amber-400 hover:border-white/40 peer-data-[state=checked]:bg-white/5"
                    }`}
                  >
                    <span className="font-medium mb-1">{variant.name}</span>
                    <div className="flex flex-col space-y-1 text-xs text-gray-400">
                      <span>Velocidad: {variant.velocity}</span>
                      <span>Autonomía: {variant.autonomy}</span>
                      <span className="mt-2 text-sm font-medium text-white">
                        ${formatPrice(variant.price)}
                        {variant.id !== product.variants[0].id && (
                          <span className="text-xs text-gray-500 ml-1">
                            (+${formatPrice(variant.price - product.variants[0].price)})
                          </span>
                        )}
                      </span>
                    </div>
                    {variant.stock <= 0 && <span className="absolute top-2 right-2 text-xs text-red-400">Agotado</span>}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Cantidad */}
          <div>
            <h2 className="text-sm uppercase tracking-wider mb-4">Cantidad</h2>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-l-sm border-white/20 text-white"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 w-16 flex items-center justify-center border-t border-b border-white/20 text-white">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-r-sm border-white/20 text-white"
                onClick={handleIncrement}
                disabled={quantity >= 10 || (selectedVariant && quantity >= selectedVariant.stock)}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Botón de agregar al carrito */}
          <Button
            className={`w-full py-6 transition-all duration-300 ${
              addedToCart ? "bg-green-600 hover:bg-green-700 text-white" : "bg-amber-400 hover:bg-amber-500 text-black"
            }`}
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock <= 0}
          >
            {addedToCart ? (
              <span className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                AGREGADO AL CARRITO
              </span>
            ) : (
              <span className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                AGREGAR AL CARRITO
              </span>
            )}
          </Button>

          {/* Características destacadas */}
          <div className="card-glass p-4 mt-4">
            <h2 className="text-sm uppercase tracking-wider mb-3">Características Destacadas</h2>
            <ul className="space-y-2">
              {product.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs de información detallada - Versión móvil */}
      <div className="md:hidden mb-6">
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-4 bg-gray-900/50 border border-white/10 rounded-sm"
            onClick={() => setIsTabsMenuOpen(!isTabsMenuOpen)}
            aria-expanded={isTabsMenuOpen}
          >
            <span className="font-medium">
              {tabItems.find((tab) => tab.value === activeTab)?.label || "Descripción"}
            </span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${isTabsMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isTabsMenuOpen && (
            <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-white/10 rounded-sm shadow-lg">
              {tabItems.map((tab) => (
                <button
                  key={tab.value}
                  className={`w-full text-left p-3 hover:bg-white/5 transition-colors ${
                    activeTab === tab.value ? "text-amber-400" : "text-white"
                  }`}
                  onClick={() => handleTabChange(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs de información detallada - Versión desktop */}
      <div className="hidden md:block">
        <div className="border-b border-white/10 mb-6">
          <div className="flex overflow-x-auto scrollbar-thin">
            {tabItems.map((tab) => (
              <button
                key={tab.value}
                className={`text-sm uppercase tracking-wider py-3 px-6 whitespace-nowrap transition-colors ${
                  activeTab === tab.value
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-white hover:text-gray-300"
                }`}
                onClick={() => handleTabChange(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido de las tabs */}
      <div className="mt-6">
        {activeTab === "description" && (
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">{product.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Rendimiento Superior</h3>
                <p className="text-gray-300 text-sm">
                  Diseñado para ofrecer una precisión excepcional en cada disparo, nuestro sistema de calibración
                  avanzado garantiza una trayectoria consistente y predecible, incluso en condiciones adversas.
                </p>
              </div>
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Materiales Premium</h3>
                <p className="text-gray-300 text-sm">
                  Fabricado con los mejores materiales disponibles, cada componente es seleccionado cuidadosamente para
                  garantizar durabilidad, resistencia y un rendimiento óptimo a lo largo del tiempo.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="space-y-8">
            {product.specifications && (
              <>
                <div className="card-glass p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Características Materiales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-amber-400 mb-2">Cañón</h4>
                      <p className="text-gray-300 mb-4">{product.specifications.barrel}</p>

                      <h4 className="font-medium text-amber-400 mb-2">Mecanismo de Carga</h4>
                      <p className="text-gray-300 mb-4">{product.specifications.loadingMechanism}</p>

                      <h4 className="font-medium text-amber-400 mb-2">Gatillo</h4>
                      <p className="text-gray-300 mb-4">{product.specifications.trigger}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-amber-400 mb-2">Culata</h4>
                      <p className="text-gray-300 mb-4">{product.specifications.stock}</p>

                      <h4 className="font-medium text-amber-400 mb-2">Armazón</h4>
                      <p className="text-gray-300 mb-4">{product.specifications.frame}</p>

                      <h4 className="font-medium text-amber-400 mb-2">Peso</h4>
                      <p className="text-gray-300 mb-4">{product.specifications.weight}</p>
                    </div>
                  </div>
                </div>

                <div className="card-glass p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Sistemas de Potencia</h3>
                  <ul className="space-y-2">
                    {product.specifications.powerSystems.map((system, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span className="text-gray-300">{system}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-glass p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Accesorios Incluidos</h3>
                  <ul className="space-y-2">
                    {product.specifications.accessories.map((accessory, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-400 mr-2">•</span>
                        <span className="text-gray-300">{accessory}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-glass p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Rendimiento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-amber-400 mb-2">Potencia</h4>
                      <p className="text-gray-300 mb-4">{product.specifications.power}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-400 mb-2">Agrupación</h4>
                      <p className="text-gray-300 mb-4">{product.specifications.grouping}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "reviews" && <ProductReviews />}

        {activeTab === "faqs" && <ProductFAQs />}
      </div>

      {/* Productos relacionados */}
      <RelatedProducts currentProductId={product.id} />
    </div>
  )
}
