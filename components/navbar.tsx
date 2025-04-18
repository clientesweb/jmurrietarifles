"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import CartDrawer from "@/components/cart-drawer"

const navLinks = [
  // Eliminamos "Inicio" ya que el logo sirve como enlace a la página principal
  {
    name: "Productos",
    href: "/productos",
    submenu: [
      { name: "Rifles", href: "/productos?categoria=rifles" },
      { name: "Accesorios", href: "/productos?categoria=accesorios" },
      { name: "Novedades", href: "/productos?categoria=novedades" },
    ],
  },
  {
    name: "Sobre Nosotros",
    href: "/sobre-nosotros",
  },
  {
    name: "Servicio Técnico",
    href: "/servicio-tecnico",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contacto",
    href: "/contacto",
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const { getItemCount } = useCart()

  // Manejar el scroll para cambiar la apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name)
  }

  return (
    // Asegurémonos de que el navbar tenga los colores correctos
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1A1A1A]/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 z-10 group"
            aria-label="J. Murrieta - Ir a la página principal"
          >
            <div className="relative w-40 h-14 md:w-48 md:h-16 overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-3x9rpXntbkt5mShwsv2OtChUDRfMfJ.png"
                alt=""
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.submenu ? (
                  <button
                    className="flex items-center text-parchment-500 hover:text-gold-500 transition-colors duration-300 text-sm uppercase tracking-wider font-cinzel"
                    onClick={() => toggleSubmenu(link.name)}
                    aria-expanded={activeSubmenu === link.name}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-parchment-500 hover:text-gold-500 transition-colors duration-300 text-sm uppercase tracking-wider relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gold-500/0 after:hover:bg-gold-500/50 after:transition-all after:duration-300 font-cinzel"
                  >
                    {link.name}
                  </Link>
                )}

                {link.submenu && (
                  <div
                    className={`absolute top-full left-0 mt-1 bg-[#1A1A1A]/90 backdrop-blur-md border border-gold-500/10 rounded-sm shadow-lg min-w-[200px] transition-all duration-300 ${
                      activeSubmenu === link.name
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {link.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-2 text-parchment-500 hover:text-gold-500 hover:bg-gold-500/5 transition-colors text-sm font-cinzel"
                        onClick={() => setActiveSubmenu(null)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-gold-500/10 transition-colors duration-300"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Carrito de compras, ${getItemCount()} productos`}
            >
              <ShoppingCart className="h-5 w-5 text-gold-500" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getItemCount()}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-gold-500/10 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Menú principal"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-gold-500" /> : <Menu className="h-5 w-5 text-gold-500" />}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <nav className="py-4 bg-[#1A1A1A]/90 backdrop-blur-md" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.submenu ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-parchment-500 hover:text-gold-500 hover:bg-gold-500/5 transition-colors text-sm uppercase tracking-wider font-cinzel"
                      onClick={() => toggleSubmenu(link.name)}
                      aria-expanded={activeSubmenu === link.name}
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${activeSubmenu === link.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`bg-[#1A1A1A]/50 transition-all duration-300 overflow-hidden ${
                        activeSubmenu === link.name ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      {link.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-8 py-2 text-parchment-400 hover:text-gold-500 transition-colors text-sm font-cinzel"
                          onClick={() => {
                            setActiveSubmenu(null)
                            setIsMenuOpen(false)
                          }}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-parchment-500 hover:text-gold-500 hover:bg-gold-500/5 transition-colors text-sm uppercase tracking-wider font-cinzel"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Drawer del carrito */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  )
}
