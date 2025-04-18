import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import ArmeriesMap from "@/components/armeries-map"
import ContactInfo from "@/components/contact-info"
import { CartProvider } from "@/components/cart-provider"
import PageBanner from "@/components/page-banner"
import WhatsappButton from "@/components/whatsapp-button"

export const metadata = {
  title: "Contacto | J. Murrieta - Rifles de Aire Comprimido Premium",
  description:
    "Ponte en contacto con nosotros o encuentra tu armería más cercana donde adquirir productos J. Murrieta.",
}

export default function ContactPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <main className="pt-20">
          {/* Banner de la página */}
          <PageBanner
            title="Contacto"
            subtitle="Estamos para ayudarte"
            description="Ponte en contacto con nosotros para cualquier consulta sobre nuestros productos o encuentra la armería más cercana donde adquirir rifles J. Murrieta."
            imageSrc="/images/product-4.jpeg"
          />

          {/* Sección de contacto */}
          <section className="py-16 bg-black">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ContactForm />
                <ContactInfo />
              </div>
            </div>
          </section>

          {/* Mapa de armerías */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">
                  Encuentra tu armería
                </span>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Distribuidores Oficiales</h2>
                <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Descubre dónde puedes adquirir nuestros productos en todo el país. Nuestros distribuidores oficiales
                  te brindarán asesoramiento especializado.
                </p>
              </div>

              <ArmeriesMap />
            </div>
          </section>
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    </CartProvider>
  )
}
