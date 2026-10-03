import { absoluteUrl, ORGANIZATION, SITE_NAME } from "@/lib/site"
import { parseSanityDate, toIsoDate } from "@/lib/date"
import type { PastEvent, SensibilisationCard, UpcomingEvent } from "@/sanity/types"

/** Données structurées schema.org (JSON-LD) partagées par les pages. */

const organizer = {
  "@type": "Organization",
  name: SITE_NAME,
  url: absoluteUrl("/"),
}

const lubumbashiPlace = (name?: string | null) => ({
  "@type": "Place",
  name: name || "Lubumbashi",
  address: {
    "@type": "PostalAddress",
    addressLocality: ORGANIZATION.address.city,
    addressRegion: ORGANIZATION.address.region,
    addressCountry: ORGANIZATION.address.country,
  },
})

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function upcomingEventJsonLd(event: UpcomingEvent) {
  const online = event.format !== "onsite"
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: parseSanityDate(event.date)?.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: online
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: online
      ? { "@type": "VirtualLocation", url: event.registrationLink || absoluteUrl("/events") }
      : lubumbashiPlace(event.location),
    image: event.imageUrl ? [event.imageUrl] : undefined,
    description: `${event.title}${event.speaker ? `, avec ${event.speaker}` : ""}. Événement gratuit organisé par Funda.`,
    performer: event.speaker ? { "@type": "Person", name: event.speaker } : undefined,
    organizer,
    isAccessibleForFree: true,
    offers: event.registrationLink
      ? {
          "@type": "Offer",
          url: event.registrationLink,
          price: 0,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  }
}

export function pastEventJsonLd(event: PastEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title.trim(),
    startDate: toIsoDate(event.date),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: event.replayUrl || absoluteUrl("/events") },
    image: event.imageUrl ? [event.imageUrl] : undefined,
    description: event.description || undefined,
    performer: event.speaker ? { "@type": "Person", name: event.speaker } : undefined,
    organizer,
    isAccessibleForFree: true,
  }
}

export function sensibilisationListJsonLd(items: SensibilisationCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/sensibilise/${item.slug}`),
      name: item.title,
    })),
  }
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }
}
