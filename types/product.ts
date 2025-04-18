export interface ProductVariant {
  id: string
  name: string
  caliber: string
  price: number
  stock: number
  velocity: string
  energy: string
  autonomy: string
}

export interface ProductSpecifications {
  barrel: string
  loadingMechanism: string
  powerSystems: string[]
  trigger: string
  stock: string
  frame: string
  accessories: string[]
  weight: string
  power: string
  grouping: string
}

export interface Product {
  id: string
  name: string
  shortDescription: string
  description: string
  price: number
  category: string
  features: string[]
  specifications?: ProductSpecifications
  gallery: string[]
  variants: ProductVariant[]
}

export interface CartItem {
  productId: string
  variantId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Accessory {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}
