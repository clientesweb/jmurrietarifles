import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const formatPrice = (amount: number) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
