"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, Filter, X } from "lucide-react"

interface ProductFiltersProps {
  activeCategory: string
  activeSort: string
}

export default function ProductFilters({ activeCategory, activeSort }: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [priceRange, setPriceRange] = useState([0, 150000])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = [
    { id: "todos", name: "Todos los productos" },
    { id: "rifles", name: "Rifles" },
    { id: "accesorios", name: "Accesorios" },
    { id: "novedades", name: "Novedades" },
  ]

  const sortOptions = [
    { id: "destacados", name: "Destacados" },
    { id: "precio-asc", name: "Precio: menor a mayor" },
    { id: "precio-desc", name: "Precio: mayor a menor" },
    { id: "nombre", name: "Nombre" },
  ]

  const calibers = [
    { id: "4.5mm", name: "4.5mm (.177)" },
    { id: "5.5mm", name: "5.5mm (.22)" },
    { id: "6.35mm", name: "6.35mm (.25)" },
  ]

  const handleCategoryChange = (category: string) => {
    router.push(`${pathname}?categoria=${category}`)
  }

  const handleSortChange = (sort: string) => {
    router.push(`${pathname}?categoria=${activeCategory}&orden=${sort}`)
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const applyFilters = () => {
    // En una implementación real, aquí se aplicarían todos los filtros
    console.log("Aplicando filtros:", { priceRange })
  }

  const clearFilters = () => {
    setPriceRange([0, 150000])
    router.push(pathname)
  }

  return (
    <div>
      {/* Botón de filtros móvil */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className={`space-y-8 ${isFilterOpen ? "block" : "hidden lg:block"}`}>
        {/* Categorías */}
        <div className="card-glass p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4">Categorías</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`block w-full text-left px-2 py-1.5 rounded-sm transition-colors ${
                  activeCategory === category.id ? "bg-amber-400/20 text-amber-400" : "text-gray-300 hover:bg-white/5"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Ordenar por */}
        <div className="card-glass p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4">Ordenar por</h3>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                className={`block w-full text-left px-2 py-1.5 rounded-sm transition-colors ${
                  activeSort === option.id ? "bg-amber-400/20 text-amber-400" : "text-gray-300 hover:bg-white/5"
                }`}
                onClick={() => handleSortChange(option.id)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rango de precio */}
        <div className="card-glass p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4">Precio</h3>
          <Slider
            defaultValue={[0, 150000]}
            max={150000}
            step={1000}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Calibre */}
        <div className="card-glass p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4">Calibre</h3>
          <div className="space-y-3">
            {calibers.map((caliber) => (
              <div key={caliber.id} className="flex items-center">
                <Checkbox id={`caliber-${caliber.id}`} className="mr-2" />
                <Label htmlFor={`caliber-${caliber.id}`} className="text-gray-300 text-sm cursor-pointer">
                  {caliber.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col space-y-2">
          <Button onClick={applyFilters} className="bg-amber-400 text-black hover:bg-amber-500">
            Aplicar filtros
          </Button>
          <Button variant="outline" onClick={clearFilters} className="flex items-center justify-center">
            <X className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  )
}
