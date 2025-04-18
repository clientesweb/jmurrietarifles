"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShoppingCart, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"

interface CartDrawerProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function CartDrawer({ isOpen, setIsOpen }: CartDrawerProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCart()
  const [animateItems, setAnimateItems] = useState(false)

  // Agregamos focus management para accesibilidad
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const firstItemButtonRef = useRef<HTMLButtonElement>(null)
  const checkoutButtonRef = useRef<HTMLAnchorElement>(null)

  // Manejar el enfoque cuando se abre el drawer
  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para permitir que el drawer aparezca
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)

      // Prevenir scroll del body cuando el drawer está abierto
      document.body.style.overflow = "hidden"

      // Animar items después de un breve delay
      setTimeout(() => {
        setAnimateItems(true)
      }, 300)
    } else {
      document.body.style.overflow = ""
      setAnimateItems(false)
    }
  }, [isOpen])

  // Detectar scroll en el contenido
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setIsScrolled(contentRef.current.scrollTop > 10)
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll)
      return () => contentElement.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  // Manejar la tecla ESC para cerrar el drawer (accesibilidad)
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isOpen, setIsOpen])

  // Variantes para animaciones
  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
      },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Variante para el contador de items
  const cartCountVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  }

  const itemAnimation = animateItems ? "visible" : "hidden"

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={() => {
              setIsOpen(false)
            }}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            className="fixed top-0 right-0 z-50 h-[100dvh] w-full max-w-md bg-[#1A1A1A] shadow-elegant flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            {/* Header con sombra condicional */}
            <div
              className={`sticky top-0 z-10 transition-all duration-500 ${isScrolled ? "shadow-xl border-b border-gold-500/20 glass-effect-strong" : ""}`}
            >
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center">
                  <motion.div
                    initial={{ rotate: -20, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingBag className="h-5 w-5 mr-3 text-gold-500" />
                  </motion.div>
                  <h2 className="text-xl font-bold font-cinzel tracking-tight gold-gradient">Tu Carrito</h2>
                  <AnimatePresence>
                    {getItemCount() > 0 && (
                      <motion.span
                        variants={cartCountVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="ml-2 bg-gold-500 text-black text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-elegant"
                      >
                        {getItemCount()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gold-500/10 transition-colors duration-300 btn-ripple"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  aria-label="Cerrar carrito"
                >
                  <X className="h-5 w-5 text-gold-500" />
                </Button>
              </div>
            </div>

            {/* Contenido */}
            <div
              ref={contentRef}
              className="flex-grow overflow-y-auto p-6 pb-24 md:pb-6 custom-scrollbar"
              tabIndex={isOpen ? 0 : -1}
              aria-label="Contenido del carrito"
            >
              {items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: 0.3 } },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <ShoppingCart className="h-16 w-16 text-gold-500/30 mb-8" />
                  <p className="text-white mb-10 text-lg tracking-wide text-spaced font-cinzel">
                    Tu carrito está vacío
                  </p>
                  <Button
                    variant="outline"
                    className="btn-elegant border-gold-500/40 text-gold-500 hover:bg-gold-500/10 font-cinzel"
                    onClick={() => {
                      setIsOpen(false)
                      document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    EXPLORAR PRODUCTOS
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-8"
                  initial="hidden"
                  animate={itemAnimation}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                >
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.productId}-${item.variantId}`}
                        variants={itemVariants}
                        exit="exit"
                        layout
                        className="flex border-b border-gold-500/20 pb-8 opacity-0"
                      >
                        {renderProductImage(item)}

                        <div className="ml-5 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium tracking-wide text-white font-cinzel">{item.name}</h3>
                            <Button
                              ref={index === 0 ? firstItemButtonRef : undefined}
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-gold-500 hover:bg-gold-500/10 rounded-full btn-ripple"
                              onClick={() => removeItem(item.productId, item.variantId)}
                              aria-label={`Eliminar ${item.name} del carrito`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <p className="text-gold-300 text-sm mb-5 tracking-wide text-spaced">
                            ${formatPrice(item.price)}
                          </p>

                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full border-gold-500/30 text-gold-500 hover:bg-gold-500/10 btn-ripple"
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Reducir cantidad"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <span className="mx-4 min-w-[2rem] text-center text-white" aria-live="polite">
                              {item.quantity}
                            </span>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full border-gold-500/30 text-gold-500 hover:bg-gold-500/10 btn-ripple"
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                className="sticky bottom-0 bg-[#1A1A1A] border-t border-gold-500/20 p-6 shadow-[0_-4px_30px_-1px_rgba(0,0,0,0.3)] z-10 glass-effect-strong"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-white">
                    <span className="tracking-wide text-spaced font-cinzel">Subtotal</span>
                    <span className="tracking-wide text-spaced">${formatPrice(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span className="tracking-wide text-spaced font-cinzel">Envío</span>
                    <span className="tracking-wide text-spaced">A coordinar</span>
                  </div>
                  <motion.div
                    className="flex justify-between text-xl font-bold pt-5 border-t border-gold-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="tracking-tight gold-gradient font-cinzel">Total</span>
                    <span className="tracking-tight gold-gradient">${formatPrice(getTotal())}</span>
                  </motion.div>
                </div>

                <Link href="/checkout" onClick={() => setIsOpen(false)} ref={checkoutButtonRef} className="group">
                  <Button className="w-full py-8 bg-gold-500 hover:bg-gold-600 text-black flex items-center justify-center shadow-elegant btn-ripple font-cinzel">
                    PROCEDER AL CHECKOUT
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatDelay: 1 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
