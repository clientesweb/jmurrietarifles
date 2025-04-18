"use client"

import { useState } from "react"
import Image from "next/image"

interface TraditionVideoSectionProps {
  videoId: string
  title?: string
}

export default function TraditionVideoSection({
  videoId,
  title = "Tradiciones Argentinas",
}: TraditionVideoSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleIframeLoad = () => {
    setIsLoaded(true)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair text-premium-title gold-gradient">
              {title}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
              Desde Argentina para el mundo, J. Murrieta representa la excelencia en la fabricación de rifles de aire
              comprimido, combinando la tradición artesanal con la más avanzada tecnología.
            </p>
          </div>
        </div>

        {/* Video de YouTube */}
        <div className="relative aspect-video max-w-4xl mx-auto overflow-hidden rounded-sm border-subtle shadow-md mb-16">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
            className={`absolute inset-0 w-full h-full ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          ></iframe>
        </div>

        {/* Contenido de tradición argentina */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-transparent border border-gray-800 rounded-sm overflow-hidden shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 font-playfair silver-gradient">
                  Tradición Argentina
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Cada rifle es sometido a rigurosas pruebas de calidad para garantizar su rendimiento y durabilidad,
                  asegurando una experiencia de tiro incomparable.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Nuestra pasión por la excelencia se refleja en cada detalle, desde la selección de materiales hasta el
                  acabado final, creando piezas que son tanto herramientas de precisión como obras de arte.
                </p>
              </div>
              <div className="md:w-1/2 relative h-80 md:h-auto">
                <Image src="/images/craftsmanship.jpeg" alt="Artesanía J. Murrieta" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
