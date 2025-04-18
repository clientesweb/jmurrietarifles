"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Box, Text } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { CuboidIcon as Cube, RotateCcw, ZoomIn, ZoomOut, ImageIcon } from "lucide-react"
import Image from "next/image"

// Componente de respaldo cuando no se puede cargar el modelo 3D
function FallbackModel() {
  const boxRef = useRef(null)
  const textRef = useRef(null)

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
    if (textRef.current) {
      textRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group>
      <Box ref={boxRef} args={[3, 0.5, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Text ref={textRef} position={[0, 1, 0]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
        Rifle J. Murrieta
      </Text>
    </group>
  )
}

export default function Product3DViewer() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoRotate, setIsAutoRotate] = useState(true)
  const [zoom, setZoom] = useState(2.5)
  const [showFallback, setShowFallback] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intentar cargar el modelo y cambiar a fallback si falla
  useEffect(() => {
    // Simulamos un intento de carga fallido
    setShowFallback(true)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 5))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1))
  const toggleView = () => setShowImage(!showImage)

  return (
    <div className="w-full container-custom py-16">
      <div className="text-center mb-8">
        <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
          Vista Interactiva
        </span>
        <h2 className="heading-lg mb-4 text-white font-cinzel">Explora Nuestro Rifle Premium</h2>
        <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
        <p className="text-gray-300 max-w-2xl mx-auto">
          Examina cada detalle de nuestro rifle desde todos los ángulos con nuestra visualización interactiva.
        </p>
      </div>

      <div
        ref={containerRef}
        className={`card-glass overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : "relative aspect-[4/3]"}`}
      >
        {showImage ? (
          // Mostrar imágenes estáticas como alternativa
          <div className="relative w-full h-full">
            <Image
              src="/images/product-1.jpeg"
              alt="Rifle J. Murrieta"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          // Mostrar visualización 3D
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
              </div>
            }
          >
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[0, 0, zoom]} />
              <ambientLight intensity={0.7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <FallbackModel />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={isAutoRotate}
                autoRotateSpeed={1}
              />
              <Environment preset="sunset" />
            </Canvas>
          </Suspense>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-black/50 border-white/20 text-white"
            onClick={toggleView}
            aria-label={showImage ? "Ver modelo 3D" : "Ver imagen"}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-black/50 border-white/20 text-white"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            aria-label={isAutoRotate ? "Detener rotación" : "Iniciar rotación"}
            disabled={showImage}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-black/50 border-white/20 text-white"
            onClick={handleZoomOut}
            aria-label="Alejar"
            disabled={showImage}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-black/50 border-white/20 text-white"
            onClick={handleZoomIn}
            aria-label="Acercar"
            disabled={showImage}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-black/50 border-white/20 text-white"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            <Cube className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center mt-4 text-sm text-gray-400">
        {showImage
          ? "Haz clic en el botón de imagen para cambiar a la vista 3D"
          : "Arrastra para rotar • Desplaza para hacer zoom • Doble clic para restablecer la vista"}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-glass p-6">
          <h3 className="text-xl font-bold mb-4 text-white font-cinzel">Visualización Detallada</h3>
          <p className="text-gray-300">
            Nuestra visualización interactiva te permite examinar cada detalle del rifle, desde la culata hasta el
            cañón, para apreciar la artesanía y el diseño excepcionales.
          </p>
        </div>
        <div className="card-glass p-6">
          <h3 className="text-xl font-bold mb-4 text-white font-cinzel">Materiales Premium</h3>
          <p className="text-gray-300">
            Observa los acabados de alta calidad y los materiales cuidadosamente seleccionados que hacen de cada rifle
            J. Murrieta una obra maestra de precisión y elegancia.
          </p>
        </div>
        <div className="card-glass p-6">
          <h3 className="text-xl font-bold mb-4 text-white font-cinzel">Diseño Ergonómico</h3>
          <p className="text-gray-300">
            Aprecia el diseño ergonómico que garantiza un agarre cómodo y estable, permitiéndote mantener la precisión
            disparo tras disparo en cualquier situación.
          </p>
        </div>
      </div>
    </div>
  )
}
