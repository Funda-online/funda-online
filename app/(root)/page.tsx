import Hero from "@/components/home/Hero";
import OurMission from "@/components/home/OurMission";
import UpcomingEvent from "@/components/home/UpcomingEvent";
import InspiringSectionWrapper from "@/components/home/InspiringSectionWrapper";
import { client } from "../../sanity/lib/client";
import NextSensibilisation from "@/components/home/NextSensibilisation";

const lastSensibilisationQuery = `
  *[_type == "sensibilisation" && date <= now()] | order(date desc)[0] {
    _id,
    title,
    "slug": slug.current,
    location,
    date,
    category,
    summary,
    "mainImageUrl": mainImage.asset->url,
    "photoCount": count(gallery)
  }
`;

export default async function Home() {
  const event = await client.fetch(`*[_type == "event"] | order(date asc)[0]`);
  const lastSensibilisation =
    (await client.fetch(lastSensibilisationQuery)) ||
    (await client.fetch(`
      *[_type == "sensibilisation"] | order(date desc)[0] {
        _id,
        title,
        "slug": slug.current,
        location,
        date,
        category,
        summary,
        "mainImageUrl": mainImage.asset->url,
        "photoCount": count(gallery)
      }
    `))

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <OurMission />

      {event?.date && <UpcomingEvent event={event} />}

      {lastSensibilisation && <NextSensibilisation data={lastSensibilisation} />}
      
      <InspiringSectionWrapper />
    </div>
  );
}
