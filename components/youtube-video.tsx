"use client"

import { useState } from "react"

interface YouTubeVideoProps {
  videoId: string
  title?: string
}

export default function YouTubeVideo({ videoId, title = "Tradiciones Argentinas" }: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleIframeLoad = () => {
    setIsLoaded(true)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair text-premium-title gold-gradient">
              {title}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Descubre la rica herencia cultural que inspira cada uno de nuestros productos, donde la tradición se
              encuentra con la innovación.
            </p>
          </div>
        </div>

        <div className="relative aspect-video max-w-4xl mx-auto overflow-hidden rounded-sm border-subtle shadow-md">
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
      </div>
    </section>
  )
}
