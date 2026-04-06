import { Articles } from "@/components/sensibilise/Articles";
import Axes  from "@/components/sensibilise/Axes";
import ContactCTA from "@/components/sensibilise/ContactCTA";
import Hero  from "@/components/sensibilise/Hero";
import ModeleIntervention from "@/components/sensibilise/ModeleIntervention";
import Presentation  from "@/components/sensibilise/Presentation";
import { client } from "@/sanity/lib/client";

const query = `*[_type == "sensibilisation"] | order(date desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  summary,
  location,
  date,
  category,
  "mainImageUrl": mainImage.asset->url,
  "photoCount": count(gallery)
}`

const FundaSensibilisePage = async () => {
  const sensibilisation = await client.fetch(query, {}, { cache: "no-store"})

  return (
    <div className="py-12 space-y-16">
      <Hero />
      <Presentation />
      <Axes />
      <Articles sensibilisation={sensibilisation}/>
      <ModeleIntervention />
      <ContactCTA />
    </div>
  );
}

export default FundaSensibilisePage