"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartProvider } from "@/components/cart-provider"
import { blogPosts } from "@/data/blog"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function BlogClientPage({ searchParams }: { searchParams: { categoria?: string; orden?: string } }) {
  const categoria = searchParams.categoria || "todos"

  // Filtrar posts por categoría
  const filteredPosts = categoria === "todos" ? blogPosts : blogPosts.filter((post) => post.category === categoria)

  // Variantes para animaciones
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <main className="pt-20">
          {/* Banner de la página */}
          <PageBanner
            title="Blog"
            subtitle="Conocimiento y Experiencia"
            description="Artículos, guías y noticias sobre rifles de aire comprimido, técnicas de tiro y novedades de J. Murrieta."
            imageSrc="/images/product-3.jpeg"
          />

          {/* Contenido del Blog */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900/80">
            <div className="container-custom">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-4 gap-8"
              >
                {/* Sidebar */}
                <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
                  {/* Buscador */}
                  <div className="card-glass p-6 border border-gold-500/10">
                    <h3 className="text-xl font-bold mb-4 font-cinzel">Buscar</h3>
                    <div className="relative">
                      <Input
                        placeholder="Buscar artículos..."
                        className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect pr-10"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold-500" />
                    </div>
                  </div>

                  {/* Categorías */}
                  <div className="card-glass p-6 border border-gold-500/10">
                    <h3 className="text-xl font-bold mb-4 font-cinzel">Categorías</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/blog"
                          className={`block px-2 py-1.5 rounded-sm transition-colors ${
                            categoria === "todos" ? "bg-gold-500/20 text-gold-500" : "text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          Todos los artículos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog?categoria=guias"
                          className={`block px-2 py-1.5 rounded-sm transition-colors ${
                            categoria === "guias" ? "bg-gold-500/20 text-gold-500" : "text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          Guías y tutoriales
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog?categoria=noticias"
                          className={`block px-2 py-1.5 rounded-sm transition-colors ${
                            categoria === "noticias" ? "bg-gold-500/20 text-gold-500" : "text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          Noticias
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog?categoria=tecnicas"
                          className={`block px-2 py-1.5 rounded-sm transition-colors ${
                            categoria === "tecnicas" ? "bg-gold-500/20 text-gold-500" : "text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          Técnicas de tiro
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog?categoria=productos"
                          className={`block px-2 py-1.5 rounded-sm transition-colors ${
                            categoria === "productos"
                              ? "bg-gold-500/20 text-gold-500"
                              : "text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          Productos
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Posts recientes */}
                  <div className="card-glass p-6 border border-gold-500/10">
                    <h3 className="text-xl font-bold mb-4 font-cinzel">Artículos recientes</h3>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex items-start space-x-3 group">
                          <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-sm border border-gold-500/20">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-sm font-medium hover:text-gold-500 transition-colors line-clamp-2 font-cinzel"
                            >
                              {post.title}
                            </Link>
                            <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Artículos */}
                <motion.div variants={itemVariants} className="lg:col-span-3">
                  {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredPosts.map((post) => (
                        <motion.div key={post.id} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="card-glass overflow-hidden hover:border-gold-500/30 transition-all duration-300 flex flex-col h-full border border-gold-500/10"
                          >
                            <div className="relative h-48 bg-black overflow-hidden">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="bg-gold-500 text-black text-xs px-2 py-1 uppercase tracking-wider font-medium">
                                  {post.category === "guias"
                                    ? "Guía"
                                    : post.category === "noticias"
                                      ? "Noticia"
                                      : post.category === "tecnicas"
                                        ? "Técnica"
                                        : "Producto"}
                                </span>
                              </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                              <div className="flex items-center text-xs text-gray-400 mb-3 space-x-4">
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1 text-gold-500" />
                                  {post.date}
                                </span>
                                <span className="flex items-center">
                                  <User className="h-3 w-3 mr-1 text-gold-500" />
                                  {post.author}
                                </span>
                              </div>
                              <h2 className="text-xl font-bold mb-3 hover:text-gold-500 transition-colors font-cinzel">
                                {post.title}
                              </h2>
                              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                              <div className="mt-auto flex items-center text-gold-500 text-sm group">
                                Leer más
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 card-glass border border-gold-500/10">
                      <p className="text-gray-400 mb-4">No se encontraron artículos en esta categoría.</p>
                      <Link href="/blog">
                        <Button variant="outline" className="border-gold-500/30 hover:bg-gold-500/10 text-gold-500">
                          Ver todos los artículos
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    </CartProvider>
  )
}
