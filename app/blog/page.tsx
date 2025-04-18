import BlogClientPage from "./BlogClientPage"

export const metadata = {
  title: "Blog | J. Murrieta - Rifles de Aire Comprimido Premium",
  description:
    "Artículos, guías y noticias sobre rifles de aire comprimido, técnicas de tiro y novedades de J. Murrieta.",
}

export default function BlogPage({ searchParams }: { searchParams: { categoria?: string; orden?: string } }) {
  return <BlogClientPage searchParams={searchParams} />
}
