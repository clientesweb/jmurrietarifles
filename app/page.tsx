import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import ProductShowcase from "@/components/product-showcase"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import FeaturesSection from "@/components/features-section"
import CraftmanshipSection from "@/components/craftmanship-section"
import PRSection from "@/components/pr-section"
import CTASection from "@/components/cta-section"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <CraftmanshipSection />
        <ProductShowcase />
        <PRSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <WhatsappButton />
    </>
  )
}
