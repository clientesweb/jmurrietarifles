"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowRight,
  Info,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"
import PaymentMethods from "@/components/payment-methods"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getTotal, clearCart, getItemCount } = useCart()
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    notes: "",
    paymentMethod: "transfer",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs para accesibilidad
  const firstInputRef = useRef<HTMLInputElement>(null)
  const continueBtnRef = useRef<HTMLButtonElement>(null)

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0 && step !== "confirmation") {
      router.push("/productos")
    }
  }, [items.length, router, step])

  // Focus management para accesibilidad
  useEffect(() => {
    if (step === "shipping") {
      setTimeout(() => {
        firstInputRef.current?.focus()
      }, 500)
    }
  }, [step])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El email no es válido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.address.trim()) newErrors.address = "La dirección es requerida"
    if (!formData.city.trim()) newErrors.city = "La ciudad es requerida"
    if (!formData.province.trim()) newErrors.province = "La provincia es requerida"
    if (!formData.postalCode.trim()) newErrors.postalCode = "El código postal es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinueToShipping = () => {
    setStep("shipping")
    window.scrollTo(0, 0)
  }

  const handleContinueToPayment = () => {
    if (validateShippingForm()) {
      setStep("payment")
      window.scrollTo(0, 0)
    }
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)

    // Simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Construir mensaje para WhatsApp
    const itemsList = items
      .map((item) => `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
      .join("\n")

    const message = `
*Nuevo Pedido - J. Murrieta*
      
*Productos:*
${itemsList}

*Total:* ${formatPrice(getTotal())}

*Datos del Cliente:*
Nombre: ${formData.name}
Teléfono: ${formData.phone}
Email: ${formData.email}
Dirección: ${formData.address}, ${formData.city}, ${formData.province} (${formData.postalCode})
Método de pago: ${
      formData.paymentMethod === "transfer"
        ? "Transferencia bancaria"
        : formData.paymentMethod === "cash"
          ? "Efectivo"
          : formData.paymentMethod === "card"
            ? "Tarjeta de crédito"
            : "Otro"
    }
Notas: ${formData.notes}
    `.trim()

    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message)

    // Número de WhatsApp (reemplazar con el número real)
    const phoneNumber = "5493515371671"

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")

    setStep("confirmation")
    clearCart()
    setIsSubmitting(false)
    window.scrollTo(0, 0)
  }

  // Variantes para animación
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  }

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Función para renderizar la imagen del producto de manera segura
  const renderProductImage = (item: any) => {
    return (
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border-2 border-gold-500/50 bg-gray-900">
        {/* Fallback visible */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-0">
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="h-8 w-8 text-gold-500 mb-1" />
            <span className="text-gold-500 text-xs font-cinzel">Producto</span>
          </div>
        </div>

        {/* Imagen real con manejo de errores */}
        <img
          src={item.image || "/images/product-1.jpeg"}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover z-10"
          onError={(e) => {
            // Si hay error, ocultar la imagen y mostrar el fallback
            ;(e.target as HTMLImageElement).style.display = "none"
          }}
        />
      </div>
    )
  }

  // Componente de item en el carrito con animación
  const CartItem = ({ item }: { item: any }) => (
    <motion.div
      variants={fadeInUp}
      className="card-glass p-4 flex flex-col sm:flex-row items-start sm:items-center mb-4"
    >
      {renderProductImage(item)}
      <div className="ml-0 sm:ml-4 flex-grow mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="flex justify-between">
          <h3 className="font-medium text-white font-cinzel">{item.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={() => removeItem(item.productId, item.variantId)}
            aria-label={`Eliminar ${item.name} del carrito`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-gold-300 text-sm">${formatPrice(item.price)}</p>
        <div className="flex items-center mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-sm border-gold-500/40 text-gold-500"
            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Reducir cantidad"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span
            className="h-8 w-10 flex items-center justify-center border-y border-gold-500/40 text-white"
            aria-live="polite"
            aria-label="Cantidad"
          >
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-sm border-gold-500/40 text-gold-500"
            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-3 w-3" />
          </Button>
          <span className="ml-auto font-medium text-white">${formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </motion.div>
  )

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: step === "cart" || step === "shipping" || step === "payment" || step === "confirmation" ? 1 : 0.8,
              opacity:
                step === "cart" || step === "shipping" || step === "payment" || step === "confirmation" ? 1 : 0.5,
              backgroundColor:
                step === "cart" || step === "shipping" || step === "payment" || step === "confirmation"
                  ? "rgb(212, 175, 55)"
                  : "rgb(107, 114, 128)",
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-center ${step === "cart" || step === "shipping" || step === "payment" || step === "confirmation" ? "bg-gold-500 text-black" : "bg-gray-700 text-gray-300"}`}
          >
            1
          </motion.div>
          <motion.div
            initial={{ scaleX: 0.3, opacity: 0.5 }}
            animate={{
              scaleX: step === "shipping" || step === "payment" || step === "confirmation" ? 1 : 0.3,
              opacity: step === "shipping" || step === "payment" || step === "confirmation" ? 1 : 0.5,
              backgroundColor:
                step === "shipping" || step === "payment" || step === "confirmation"
                  ? "rgb(212, 175, 55)"
                  : "rgb(107, 114, 128)",
            }}
            className={`w-16 h-1 origin-left ${step === "shipping" || step === "payment" || step === "confirmation" ? "bg-gold-500" : "bg-gray-700"}`}
          ></motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: step === "shipping" || step === "payment" || step === "confirmation" ? 1 : 0.8,
              opacity: step === "shipping" || step === "payment" || step === "confirmation" ? 1 : 0.5,
              backgroundColor:
                step === "shipping" || step === "payment" || step === "confirmation"
                  ? "rgb(212, 175, 55)"
                  : "rgb(107, 114, 128)",
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "shipping" || step === "payment" || step === "confirmation" ? "bg-gold-500 text-black" : "bg-gray-700 text-gray-300"}`}
          >
            2
          </motion.div>
          <motion.div
            initial={{ scaleX: 0.3, opacity: 0.5 }}
            animate={{
              scaleX: step === "payment" || step === "confirmation" ? 1 : 0.3,
              opacity: step === "payment" || step === "confirmation" ? 1 : 0.5,
              backgroundColor:
                step === "payment" || step === "confirmation" ? "rgb(212, 175, 55)" : "rgb(107, 114, 128)",
            }}
            className={`w-16 h-1 origin-left ${step === "payment" || step === "confirmation" ? "bg-gold-500" : "bg-gray-700"}`}
          ></motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: step === "payment" || step === "confirmation" ? 1 : 0.8,
              opacity: step === "payment" || step === "confirmation" ? 1 : 0.5,
              backgroundColor:
                step === "payment" || step === "confirmation" ? "rgb(212, 175, 55)" : "rgb(107, 114, 128)",
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" || step === "confirmation" ? "bg-gold-500 text-black" : "bg-gray-700 text-gray-300"}`}
          >
            3
          </motion.div>
          <motion.div
            initial={{ scaleX: 0.3, opacity: 0.5 }}
            animate={{
              scaleX: step === "confirmation" ? 1 : 0.3,
              opacity: step === "confirmation" ? 1 : 0.5,
              backgroundColor: step === "confirmation" ? "rgb(212, 175, 55)" : "rgb(107, 114, 128)",
            }}
            className={`w-16 h-1 origin-left ${step === "confirmation" ? "bg-gold-500" : "bg-gray-700"}`}
          ></motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: step === "confirmation" ? 1 : 0.8,
              opacity: step === "confirmation" ? 1 : 0.5,
              backgroundColor: step === "confirmation" ? "rgb(212, 175, 55)" : "rgb(107, 114, 128)",
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "confirmation" ? "bg-gold-500 text-black" : "bg-gray-700 text-gray-300"}`}
          >
            4
          </motion.div>
        </div>
      </div>
    )
  }

  const renderStepTitle = () => {
    switch (step) {
      case "cart":
        return "Resumen del Carrito"
      case "shipping":
        return "Información de Envío"
      case "payment":
        return "Método de Pago"
      case "confirmation":
        return "Pedido Confirmado"
    }
  }

  const renderCartStep = () => {
    return (
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" exit="exit" className="space-y-8">
        {items.length === 0 ? (
          <motion.div variants={fadeInUp} className="text-center py-12 card-glass">
            <p className="text-white mb-4 font-cinzel">Tu carrito está vacío</p>
            <Link href="/productos">
              <Button className="bg-gold-500 hover:bg-gold-600 text-black font-cinzel">Explorar Productos</Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem key={`${item.productId}-${item.variantId}`} item={item} />
              ))}
            </div>

            <motion.div variants={fadeInUp} className="card-glass p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-white">
                  <span className="font-cinzel">Subtotal</span>
                  <span>${formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="font-cinzel">Envío</span>
                  <span>A coordinar</span>
                </div>
                <Separator className="my-2 bg-gold-500/20" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="font-cinzel text-gold-400">Total</span>
                  <span className="text-gold-400">${formatPrice(getTotal())}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-between flex-wrap gap-4">
              <Link href="/productos">
                <Button variant="outline" className="border-gold-500/40 text-gold-500">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Seguir Comprando
                </Button>
              </Link>
              <Button
                className="bg-gold-500 hover:bg-gold-600 text-black"
                onClick={handleContinueToShipping}
                ref={continueBtnRef}
              >
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    )
  }

  const renderShippingStep = () => {
    return (
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" exit="exit" className="space-y-8">
        <motion.div variants={fadeInUp} className="card-glass p-6">
          <h3 className="text-xl font-bold mb-6 gold-gradient">Información de Contacto y Envío</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label htmlFor="name" className="text-sm uppercase tracking-wider text-gold-400">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ingresa tu nombre completo"
                className="bg-gray-900/30 border-gold-500/40 focus:border-gold-500/70"
                ref={firstInputRef}
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-red-500 text-xs flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="email" className="text-sm uppercase tracking-wider text-gold-400">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ingresa tu email"
                className="bg-gray-900/30 border-gold-500/40 focus:border-gold-500/70"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-500 text-xs flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="phone" className="text-sm uppercase tracking-wider text-gold-400">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Ingresa tu número de teléfono"
                className="bg-gray-900/30 border-gold-500/40 focus:border-gold-500/70"
                aria-required="true"
                aria-invalid={errors.phone ? "true" : "false"}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="address" className="text-sm uppercase tracking-wider text-gold-400">
                Dirección <span className="text-red-500">*</span>
              </label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Calle, número, piso, departamento"
                className="bg-gray-900/30 border-gold-500/40 focus:border-gold-500/70"
                aria-required="true"
                aria-invalid={errors.address ? "true" : "false"}
              />
              {errors.address && (
                <p className="text-red-500 text-xs flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="city" className="text-sm uppercase tracking-wider text-gold-400">
                Ciudad <span className="text-red-500">*</span>
              </label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Ingresa tu ciudad"
                className="bg-gray-900/30 border-gold-500/40 focus:border-gold-500/70"
                aria-required="true"
                aria-invalid={errors.city ? "true" : "false"}
              />
              {errors.city && (
                <p className="text-red-500 text-xs flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {errors.city}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="province" className="text-sm uppercase tracking-wider text-gold-400">
                Provincia <span className="text-red-500">*</span>
              </label>
              <Input
                id="province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                placeholder="Ingresa tu provincia"
                className="bg-gray-900/30 border-gold-500/40 focus:border-gold-500/70"
                aria-required="true"
                aria-invalid={errors.province ? "true" : "false"}
              />
              {errors.province && (
                <p className="text-red-500 text-xs flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {errors.province}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="postalCode" className="text-sm uppercase tracking-wider text-gold-400">
                Código Postal <span className="text-red-500">*</span>
              </label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Ingresa tu código postal"
                className="bg-gray-900/30 border-gold-500/40 focus:border-gold-500/70"
                aria-required="true"
                aria-invalid={errors.postalCode ? "true" : "false"}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-xs flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {errors.postalCode}
                </p>
              )}
            </div>

            <div className="space-y-3 md:col-span-2">
              <label htmlFor="notes" className="text-sm uppercase tracking-wider text-gold-400">
                Notas adicionales (opcional)
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Instrucciones especiales para la entrega"
                className="bg-gray-900/30 border-gold-500/40 focus:border-gold-500/70"
                rows={3}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="card-glass p-6">
          <h3 className="text-xl font-bold mb-4 gold-gradient">Resumen del Pedido</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Productos ({getItemCount()})</span>
              <span>${formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Envío</span>
              <span>A coordinar</span>
            </div>
            <Separator className="my-2 bg-gold-500/20" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${formatPrice(getTotal())}</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex justify-between flex-wrap gap-4">
          <Button variant="outline" className="border-gold-500/40 text-gold-500" onClick={() => setStep("cart")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver al Carrito
          </Button>
          <Button className="bg-gold-500 hover:bg-gold-600 text-black" onClick={handleContinueToPayment}>
            Continuar al Pago
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  const renderPaymentStep = () => {
    return (
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" exit="exit" className="space-y-8">
        <motion.div variants={fadeInUp} className="card-glass p-6">
          <h3 className="text-xl font-bold mb-6 gold-gradient">Método de Pago</h3>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm uppercase tracking-wider text-gold-400">Selecciona un método de pago</h4>
              <div className="flex items-center text-xs text-gray-400">
                <Shield className="h-3 w-3 mr-1" />
                <span>Pago seguro</span>
              </div>
            </div>

            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={handlePaymentMethodChange}
              className="space-y-4"
              aria-label="Método de pago"
            >
              <div
                className={`card-glass p-4 border transition-all duration-300 ${
                  formData.paymentMethod === "transfer"
                    ? "border-gold-500 bg-gold-500/20 shadow-md radio-group-item-selected"
                    : "border-gold-500/40 hover:border-gold-500/70"
                }`}
              >
                <RadioGroupItem value="transfer" id="transfer" className="peer sr-only" />
                <Label htmlFor="transfer" className="flex items-center cursor-pointer">
                  <div
                    className={`mr-4 p-2 rounded-full ${
                      formData.paymentMethod === "transfer" ? "bg-gold-500/40" : "bg-gold-500/10"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-gold-500" />
                  </div>
                  <div>
                    <div className="font-medium">Transferencia Bancaria</div>
                    <div className="text-sm text-gray-400">Realiza el pago mediante transferencia bancaria</div>
                  </div>
                </Label>
              </div>

              <div
                className={`card-glass p-4 border transition-all duration-300 ${
                  formData.paymentMethod === "cash"
                    ? "border-gold-500 bg-gold-500/20 shadow-md radio-group-item-selected"
                    : "border-gold-500/40 hover:border-gold-500/70"
                }`}
              >
                <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                <Label htmlFor="cash" className="flex items-center cursor-pointer">
                  <div
                    className={`mr-4 p-2 rounded-full ${
                      formData.paymentMethod === "cash" ? "bg-gold-500/40" : "bg-gold-500/10"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-gold-500" />
                  </div>
                  <div>
                    <div className="font-medium">Efectivo</div>
                    <div className="text-sm text-gray-400">Pago en efectivo al momento de la entrega</div>
                  </div>
                </Label>
              </div>

              <div
                className={`card-glass p-4 border transition-all duration-300 ${
                  formData.paymentMethod === "card"
                    ? "border-gold-500 bg-gold-500/20 shadow-md radio-group-item-selected"
                    : "border-gold-500/40 hover:border-gold-500/70"
                }`}
              >
                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <div
                    className={`mr-4 p-2 rounded-full ${
                      formData.paymentMethod === "card" ? "bg-gold-500/40" : "bg-gold-500/10"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-gold-500" />
                  </div>
                  <div>
                    <div className="font-medium">Tarjeta de Crédito/Débito</div>
                    <div className="text-sm text-gray-400">Pago con tarjeta al momento de la entrega</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.paymentMethod === "transfer" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-gold-500/5 border border-gold-500/30 rounded-sm"
            >
              <h4 className="font-medium mb-2 text-gold-400">Datos para la transferencia:</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">Cuenta:</span> CA $ 425 0003749603
                </p>
                <p>
                  <span className="text-gray-400">CBU:</span> 0200425311000003749630
                </p>
                <p>
                  <span className="text-gray-400">Alias:</span> METAL.HERRAMIENTA
                </p>
                <p>
                  <span className="text-gray-400">Titular:</span> Aranda Alejo Damian
                </p>
                <p>
                  <span className="text-gray-400">CUIT/CUIL:</span> 20441942770
                </p>
                <p className="text-xs text-gold-500 mt-2">
                  Una vez realizada la transferencia, envíanos el comprobante por WhatsApp para agilizar el proceso.
                </p>
              </div>
            </motion.div>
          )}

          <div className="bg-gray-900/30 p-4 rounded-sm mb-6 border border-gold-500/20">
            <h4 className="text-sm uppercase tracking-wider text-gold-400 mb-4">Métodos aceptados</h4>
            <PaymentMethods compact={true} />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="card-glass p-6">
          <h3 className="text-xl font-bold mb-4 gold-gradient">Resumen del Pedido</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Productos ({getItemCount()})</span>
              <span>${formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Envío</span>
              <span>A coordinar</span>
            </div>
            <Separator className="my-2 bg-gold-500/20" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${formatPrice(getTotal())}</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="card-glass p-6">
          <h3 className="text-xl font-bold mb-4 gold-gradient">Información de Envío</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-400">Nombre:</span> {formData.name}
            </p>
            <p>
              <span className="text-gray-400">Email:</span> {formData.email}
            </p>
            <p>
              <span className="text-gray-400">Teléfono:</span> {formData.phone}
            </p>
            <p>
              <span className="text-gray-400">Dirección:</span> {formData.address}, {formData.city}, {formData.province}{" "}
              ({formData.postalCode})
            </p>
            {formData.notes && (
              <p>
                <span className="text-gray-400">Notas:</span> {formData.notes}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex justify-between flex-wrap gap-4">
          <Button
            variant="outline"
            className="border-gold-500/40 text-gold-500"
            onClick={() => setStep("shipping")}
            disabled={isSubmitting}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a Envío
          </Button>
          <Button
            className="bg-gold-500 hover:bg-gold-600 text-black"
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Procesando...</span>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                Finalizar Compra
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  const renderConfirmationStep = () => {
    return (
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="card-glass p-8 text-center">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
        >
          <div className="bg-green-500/20 p-4 rounded-full">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </motion.div>
        <motion.h3
          className="text-2xl font-bold mb-4 gold-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          ¡Pedido Confirmado!
        </motion.h3>
        <motion.p
          className="text-gray-300 mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Gracias por tu compra. Hemos recibido tu pedido y estaremos en comunicación vía WhatsApp para coordinar los
          siguientes pasos, incluyendo el pago y la entrega.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/">
            <Button variant="outline" className="border-gold-500/40 text-gold-500">
              Volver al Inicio
            </Button>
          </Link>
          <Link href="/productos">
            <Button className="bg-gold-500 hover:bg-gold-600 text-black">Seguir Comprando</Button>
          </Link>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-[#1A1A1A]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {renderStepIndicator()}

            <motion.h1
              className="text-3xl font-bold text-center mb-8 gold-gradient"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderStepTitle()}
            </motion.h1>

            <AnimatePresence mode="wait">
              {step === "cart" && renderCartStep()}
              {step === "shipping" && renderShippingStep()}
              {step === "payment" && renderPaymentStep()}
              {step === "confirmation" && renderConfirmationStep()}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
