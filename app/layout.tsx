import type React from "react"
import "@/app/globals.css"
import { Montserrat, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"
import Script from "next/script"

// Optimización de fuentes
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

// Add this new font import for Cinzel Decorative
const cinzelDecorative = {
  variable: "--font-cinzel-decorative",
}

// Actualizar la sección de metadatos para el favicon
export const metadata = {
  title: "J. Murrieta - Rifles de Aire Comprimido Premium",
  description:
    "Descubre nuestra exclusiva colección de rifles de aire comprimido de alta calidad. Precisión y elegancia desde Argentina.",
  keywords: "rifles, aire comprimido, J. Murrieta, Argentina, premium, caza, tiro deportivo",
  themeColor: "#D4AF37", // Color dorado para la barra de navegación móvil
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "J. Murrieta",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://jmurrieta.com",
    title: "J. Murrieta - Rifles de Aire Comprimido Premium",
    description:
      "Descubre nuestra exclusiva colección de rifles de aire comprimido de alta calidad. Precisión y elegancia desde Argentina.",
    siteName: "J. Murrieta",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "J. Murrieta - Rifles de Aire Comprimido Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "J. Murrieta - Rifles de Aire Comprimido Premium",
    description:
      "Descubre nuestra exclusiva colección de rifles de aire comprimido de alta calidad. Precisión y elegancia desde Argentina.",
    images: ["/images/og-image.jpg"],
  },
    generator: 'v0.dev'
}

// Update the html className to include the new font
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${playfair.variable} ${cinzelDecorative.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Add the Cinzel Decorative font link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#1A1A1A] text-parchment-500">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('Service Worker registration successful with scope: ', registration.scope);
                  },
                  function(err) {
                    console.log('Service Worker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
