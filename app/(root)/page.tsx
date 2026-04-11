import Hero from "@/components/home/Hero";
import OurMission from "@/components/home/OurMission";
import UpcomingEvent from "@/components/home/UpcomingEvent";
import Newsletter from "@/components/home/Newsletter";
import InspiringSectionWrapper from "@/components/home/InspiringSectionWrapper";
import ArticlesGrid from "@/components/home/ArticlesGrid";
// Make sure the following file exists: <projectRoot>/sanity/client.ts
import { client } from "../../sanity/lib/client";
import Contact from "@/components/home/Contact";
import NextSensibilisation from "@/components/home/NextSensibilisation";

const query = `*[_type == "blog"] | order(date desc) {
  _id,
  title,
  slug,
  excerpt,
  content,
  image,
  category,
  tags,
  author,
  date,
  readTime
}`;

const nextSensibilisationQuery = `
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
`;

export default async function Home() {
  const event = await client.fetch(`*[_type == "event"] | order(date asc)[0]`);
  const articles = await client.fetch(query);
  const nextSensibilisation = await client.fetch(nextSensibilisationQuery)

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <OurMission />

      <UpcomingEvent event={event} />

      {nextSensibilisation && <NextSensibilisation data={nextSensibilisation} />}

      <InspiringSectionWrapper />
      
      <ArticlesGrid articles={articles} />

      <Contact />
    </div>
  );
}
