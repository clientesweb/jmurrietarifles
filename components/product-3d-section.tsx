"use client"

import { Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { AlertCircle } from "lucide-react"

// Importar el visor 3D de forma dinámica para evitar errores de SSR
const Product3DViewer = dynamic(() => import("@/components/product-3d-viewer"), {
  ssr: false,
  loading: () => (
    <div className="container-custom py-16">
      <div className="text-center mb-8">
        <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">Vista Interactiva</span>
        <h2 className="heading-lg mb-4 text-white">Cargando Visualización...</h2>
        <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
      </div>
      <div className="card-glass aspect-[4/3] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  ),
})

export default function Product3DSection() {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Manejar errores de carga
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("model.gltf") || event.message.includes("Failed to fetch")) {
        setHasError(true)
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) {
    return (
      <div className="container-custom py-16">
        <div className="text-center mb-8">
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">Vista Interactiva</span>
          <h2 className="heading-lg mb-4 text-white">Explora Nuestro Rifle Premium</h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
        </div>
        <div className="card-glass p-8 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-amber-400" />
          <h3 className="text-xl font-bold mb-2 text-white">Visualización Alternativa</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Estamos mejorando nuestra experiencia 3D. Mientras tanto, puedes explorar nuestros productos en detalle en
            la sección de productos o visitar nuestro showroom para verlos en persona.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="card-glass p-4">
              <h4 className="font-bold mb-2 text-white">Precisión Excepcional</h4>
              <p className="text-gray-400 text-sm">
                Cada rifle está diseñado para ofrecer una precisión inigualable en cada disparo.
              </p>
            </div>
            <div className="card-glass p-4">
              <h4 className="font-bold mb-2 text-white">Materiales Premium</h4>
              <p className="text-gray-400 text-sm">
                Utilizamos solo los mejores materiales para garantizar durabilidad y rendimiento.
              </p>
            </div>
            <div className="card-glass p-4">
              <h4 className="font-bold mb-2 text-white">Diseño Ergonómico</h4>
              <p className="text-gray-400 text-sm">
                Diseñado para un agarre cómodo y estable en cualquier situación de tiro.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="container-custom py-16 text-center">
          <div className="card-glass aspect-[4/3] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      }
    >
      <Product3DViewer />
    </Suspense>
  )
}
