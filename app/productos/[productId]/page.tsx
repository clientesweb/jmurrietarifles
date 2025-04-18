import { notFound } from "next/navigation"
import { getProductById } from "@/data/products"
import ProductDetail from "@/components/product-detail"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import BrowsingHistory from "@/components/browsing-history"
import PageBanner from "@/components/page-banner"
import { CartProvider } from "@/components/cart-provider"

export async function generateMetadata({ params }: { params: { productId: string } }) {
  const product = getProductById(params.productId)

  if (!product) {
    return {
      title: "Producto no encontrado | J. Murrieta",
      description: "El producto que estás buscando no existe o ha sido movido.",
    }
  }

  return {
    title: `${product.name} | J. Murrieta`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | J. Murrieta`,
      description: product.shortDescription,
      images: [
        {
          url: product.gallery[0] || "/images/logo.png",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  }
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  const product = getProductById(params.productId)

  if (!product) {
    notFound()
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <main className="pt-20 pb-16">
          <PageBanner
            title={product.name}
            subtitle="Detalle de Producto"
            description={product.shortDescription}
            imageSrc={product.gallery[0]}
          />
          <ProductDetail product={product} />
          <BrowsingHistory />
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    </CartProvider>
  )
}
