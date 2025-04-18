"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartItem } from "@/types/product"
import { getProductById, getVariantById } from "@/data/products"

interface CartContextType {
  items: CartItem[]
  addItem: (productId: string, variantId: string, quantity?: number) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Imágenes de respaldo para productos
const FALLBACK_IMAGES = [
  "/images/product-1.jpeg",
  "/images/product-2.jpeg",
  "/images/product-3.jpeg",
  "/images/product-4.jpeg",
]

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (productId: string, variantId: string, quantity = 1) => {
    const product = getProductById(productId)
    const variant = getVariantById(productId, variantId)

    if (!product || !variant) return

    // Determinar la imagen a usar
    let productImage = "/images/product-1.jpeg" // Imagen por defecto

    // Intentar obtener la imagen del producto
    if (product.gallery && product.gallery.length > 0) {
      productImage = product.gallery[0]
    } else {
      // Si no hay galería, usar una imagen de respaldo basada en el ID del producto
      const fallbackIndex = Math.abs(Number.parseInt(productId.charAt(0), 16)) % FALLBACK_IMAGES.length
      productImage = FALLBACK_IMAGES[fallbackIndex]
    }

    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === productId && item.variantId === variantId,
      )

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      }

      return [
        ...prevItems,
        {
          productId,
          variantId,
          name: `${product.name} - ${variant.name}`,
          price: variant.price,
          quantity,
          image: productImage,
        },
      ]
    })
  }

  const removeItem = (productId: string, variantId: string) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.productId === productId && item.variantId === variantId)))
  }

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
