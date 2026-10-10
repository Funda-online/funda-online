import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import OurMission from "@/components/home/OurMission";
import UpcomingEvent from "@/components/home/UpcomingEvent";
import InspiringSection from "@/components/home/InspiringSection";
import NextSensibilisation from "@/components/home/NextSensibilisation";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  latestPastEventsQuery,
  latestSensibilisationQuery,
  nextEventQuery,
} from "@/sanity/queries";
import type { PastEventSlide, SensibilisationCard, UpcomingEvent as UpcomingEventData } from "@/sanity/types";

const heroOgImage = {
  url: "/img/hero.jpg",
  width: 1920,
  height: 1280,
  alt: "Jeunes participants à une activité Funda à Lubumbashi",
};

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} | ${SITE_TAGLINE}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [heroOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [heroOgImage.url],
  },
};

export default async function Home() {
  const [event, lastSensibilisation, pastEvents] = await Promise.all([
    sanityFetch<UpcomingEventData | null>({ query: nextEventQuery, tags: ["event"] }),
    sanityFetch<SensibilisationCard | null>({
      query: latestSensibilisationQuery,
      tags: ["sensibilisation"],
    }),
    sanityFetch<PastEventSlide[]>({ query: latestPastEventsQuery, tags: ["pastEvent"] }),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <OurMission />

      {event && <UpcomingEvent event={event} />}

      {lastSensibilisation && <NextSensibilisation data={lastSensibilisation} />}

      <InspiringSection events={pastEvents ?? []} />
    </div>
  );
}
