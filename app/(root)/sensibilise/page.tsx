import type { Metadata } from "next";
import { Articles } from "@/components/sensibilise/Articles";
import Axes  from "@/components/sensibilise/Axes";
import Hero  from "@/components/sensibilise/Hero";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allSensibilisationsQuery } from "@/sanity/queries";
import Faq, { SENSIBILISE_FAQ } from "@/components/sensibilise/Faq";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  sensibilisationListJsonLd,
} from "@/lib/structured-data";
import type { SensibilisationCard } from "@/sanity/types";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Funda Sensibilise",
  description:
    "Programme gratuit de sensibilisation au numérique responsable en RDC : intelligence artificielle, cybersécurité et auto-apprentissage dans les écoles et les communautés.",
  alternates: { canonical: "/sensibilise" },
  openGraph: {
    title: "Funda Sensibilise",
    description:
      "Sensibilisations gratuites au numérique responsable dans les écoles et communautés de Lubumbashi.",
    url: "/sensibilise",
  },
  twitter: {
    card: "summary_large_image",
    title: "Funda Sensibilise",
    description:
      "Sensibilisations gratuites au numérique responsable dans les écoles et communautés de Lubumbashi.",
  },
};

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