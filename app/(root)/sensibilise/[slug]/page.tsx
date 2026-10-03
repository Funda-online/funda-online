import type { Metadata } from "next"
import { cache } from "react"
import SensibilisationDetail from "@/components/sensibilise/SensibiliseDetailPage"
import { notFound } from "next/navigation"
import { absoluteUrl, SITE_NAME } from "@/lib/site"
import { toIsoDate } from "@/lib/date"
import JsonLd from "@/components/seo/JsonLd"
import { sanityFetch } from "@/sanity/lib/fetch"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import {
  relatedSensibilisationsQuery,
  sensibilisationBySlugQuery,
  sensibilisationSlugsQuery,
} from "@/sanity/queries"
import type {
  SensibilisationCard,
  SensibilisationDetail as SensibilisationDetailData,
} from "@/sanity/types"

const getSession = cache((slug: string) =>
  sanityFetch<SensibilisationDetailData | null>({
    query: sensibilisationBySlugQuery,
    params: { slug },
    tags: ["sensibilisation"],
  })
)

export async function generateStaticParams() {
  try {
    const sessions = await sanityFetch<{ slug: string }[]>({
      query: sensibilisationSlugsQuery,
      tags: ["sensibilisation"],
    })
    return (sessions ?? []).map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const session = await getSession(slug)

  if (!session) {
    return { title: "Sensibilisation introuvable" }
  }

  const description =
    session.summary ||
    `Sensibilisation Funda${session.location ? ` à ${session.location}` : ""} : ${session.title}`
  const canonical = `/sensibilise/${slug}`
  const ogImage = session.mainImage
    ? `${session.mainImage}?w=1200&h=630&fit=crop&fm=jpg&q=80`
    : undefined
  const images = ogImage
    ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: session.title,
        },
      ]
    : undefined

  return {
    title: session.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: session.title,
      description,
      url: canonical,
      images,
      publishedTime: toIsoDate(session.date),
    },
    twitter: {
      card: "summary_large_image",
      title: session.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function SensibilisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [session, related] = await Promise.all([
    getSession(slug),
    sanityFetch<SensibilisationCard[]>({
      query: relatedSensibilisationsQuery,
      params: { slug },
      tags: ["sensibilisation"],
    }),
  ])

  if (!session) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: session.title,
    description: session.summary ?? undefined,
    image: session.mainImage ?? undefined,
    datePublished: toIsoDate(session.date),
    dateModified: session._updatedAt,
    inLanguage: "fr",
    about: ["Numérique responsable", session.category].filter(Boolean),
    contentLocation: session.location
      ? { "@type": "Place", name: session.location, address: { "@type": "PostalAddress", addressCountry: "CD" } }
      : undefined,
    author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo/logo-3.png") },
    },
    mainEntityOfPage: absoluteUrl(`/sensibilise/${slug}`),
  }

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Funda Sensibilise", path: "/sensibilise" },
    { name: session.title, path: `/sensibilise/${slug}` },
  ])

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumb]} />
      <SensibilisationDetail data={session} related={related ?? []} />
    </>
  )
}
