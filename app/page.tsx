import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import ProductShowcase from "@/components/product-showcase"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import PromoBanner from "@/components/promo-banner"
import TraditionSection from "@/components/tradition-section"
import ProductComparison from "@/components/product-comparison"
import Product3DSection from "@/components/product-3d-section"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main>
        <Hero />
        <TraditionSection />
        <ProductShowcase />
        <PromoBanner />
        <ProductComparison />
        <Product3DSection />
        <Testimonials />
      </main>
      <Footer />
      <WhatsappButton />
    </>
  )
}
