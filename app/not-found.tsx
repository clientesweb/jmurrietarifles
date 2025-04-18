import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"

export default function NotFound() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-playfair">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-playfair">Página no encontrada</h2>
          <p className="text-gray-400 max-w-md mb-10">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link href="/">
            <Button className="btn-elegant-primary px-8 py-6">VOLVER AL INICIO</Button>
          </Link>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
