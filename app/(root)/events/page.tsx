import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { pastEventsQuery, upcomingEventsQuery } from "@/sanity/queries"
import type { PastEvent, UpcomingEvent } from "@/sanity/types"
import EventsPageClient from "@/components/events/EventsPageClient"
import JsonLd from "@/components/seo/JsonLd"
import { absoluteUrl, SITE_NAME } from "@/lib/site"
import { breadcrumbJsonLd, pastEventJsonLd, upcomingEventJsonLd } from "@/lib/structured-data"

const eventsOgImage = {
  url: "/img/events-hero.jpg",
  width: 1920,
  height: 1280,
  alt: "Participants à une conférence Funda à Lubumbashi",
}

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Webinaires, ateliers et conférences Funda à Lubumbashi : événements à venir et replays pour apprendre l'informatique.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Événements Funda",
    description:
      "Webinaires, ateliers et conférences Funda à Lubumbashi : à venir et en replay.",
    url: "/events",
    images: [eventsOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Événements Funda",
    description:
      "Webinaires, ateliers et conférences Funda à Lubumbashi : à venir et en replay.",
    images: [eventsOgImage.url],
  },
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    sanityFetch<UpcomingEvent[]>({ query: upcomingEventsQuery, tags: ["event"] }),
    sanityFetch<PastEvent[]>({ query: pastEventsQuery, tags: ["pastEvent"] }),
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Événements | ${SITE_NAME}`,
    description:
      "Webinaires, ateliers et conférences Funda à Lubumbashi : événements à venir et replays.",
    url: absoluteUrl("/events"),
  }

  const breadcrumb = breadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Événements", path: "/events" },
  ])

  const events = [
    ...(upcoming ?? []).map(upcomingEventJsonLd),
    ...(past ?? []).map(pastEventJsonLd),
  ]

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumb, ...events]} />
      <EventsPageClient upcoming={upcoming || []} past={past || []} />
    </>
  )
}
