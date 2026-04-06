import SensibilisationDetail from "@/components/sensibilise/SensibiliseDetailPage"
import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"

const query = `
  *[_type == "sensibilisation" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    location,
    date,
    category,
    summary,
    content,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "relatedSessions": *[_type == "sensibilisation" && slug.current != $slug] | order(date desc)[0..1]{
      title,
      "slug": slug.current,
      location,
      date,
      "mainImage": mainImage.asset->url
    }
  }
`

export default async function SensibilisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Fetch des données réelles
  const session = await client.fetch(query, { slug }, { 
    next: { revalidate: 60 } 
  })

  // Gestion de l'erreur 404 si le slug n'existe pas
  if (!session) {
    notFound()
  }

  return <SensibilisationDetail data={session} />
}