import type { Metadata } from "next";
import { Articles } from "@/components/sensibilise/Articles";
import Axes  from "@/components/sensibilise/Axes";
import Hero  from "@/components/sensibilise/Hero";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allSensibilisationsQuery, latestSensibilisationQuery } from "@/sanity/queries";
import Faq, { SENSIBILISE_FAQ } from "@/components/sensibilise/Faq";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  sensibilisationListJsonLd,
} from "@/lib/structured-data";
import type { SensibilisationCard } from "@/sanity/types";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const SENSIBILISE_DESCRIPTION =
  "Programme gratuit de sensibilisation au numérique responsable en RDC : intelligence artificielle, cybersécurité et auto-apprentissage dans les écoles et les communautés."
const SENSIBILISE_SHARE_DESCRIPTION =
  "Sensibilisations gratuites au numérique responsable dans les écoles et communautés de Lubumbashi."

/** Illustration de partage : photo de la dernière sensibilisation, sinon l'image du hero. */
export async function generateMetadata(): Promise<Metadata> {
  let latest: SensibilisationCard | null = null
  try {
    latest = await sanityFetch<SensibilisationCard | null>({
      query: latestSensibilisationQuery,
      tags: ["sensibilisation"],
    })
  } catch {
    latest = null
  }

  const ogImage = latest?.mainImageUrl
    ? {
        url: `${latest.mainImageUrl}?w=1200&h=630&fit=crop&fm=jpg&q=80`,
        width: 1200,
        height: 630,
        alt: latest.title,
      }
    : {
        url: "/img/hero.jpg",
        width: 1920,
        height: 1280,
        alt: "Sensibilisation Funda au numérique responsable à Lubumbashi",
      }

  return {
    title: "Funda Sensibilise",
    description: SENSIBILISE_DESCRIPTION,
    alternates: { canonical: "/sensibilise" },
    openGraph: {
      title: "Funda Sensibilise",
      description: SENSIBILISE_SHARE_DESCRIPTION,
      url: "/sensibilise",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Funda Sensibilise",
      description: SENSIBILISE_SHARE_DESCRIPTION,
      images: [ogImage.url],
    },
  }
}

const FundaSensibilisePage = async () => {
  const sensibilisation = await sanityFetch<SensibilisationCard[]>({
    query: allSensibilisationsQuery,
    tags: ["sensibilisation"],
  }) ?? []

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Funda Sensibilise | ${SITE_NAME}`,
    description:
      "Programme gratuit de sensibilisation au numérique responsable dans les écoles et communautés de Lubumbashi.",
    url: absoluteUrl("/sensibilise"),
  }

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Funda Sensibilise", path: "/sensibilise" },
  ])

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumb,
          sensibilisationListJsonLd(sensibilisation),
          faqJsonLd(SENSIBILISE_FAQ),
        ]}
      />
      <div className="pt-12">
        <Hero />
        <Axes />
        <Articles sensibilisation={sensibilisation} />
        <Faq />
      </div>
    </>
  );
}

export default FundaSensibilisePage