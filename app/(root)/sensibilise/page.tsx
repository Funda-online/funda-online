import { Articles } from "@/components/sensibilise/Articles";
import Axes  from "@/components/sensibilise/Axes";
import ContactCTA from "@/components/sensibilise/ContactCTA";
import Hero  from "@/components/sensibilise/Hero";
import ModeleIntervention from "@/components/sensibilise/ModeleIntervention";
import Presentation  from "@/components/sensibilise/Presentation";
import { client } from "@/sanity/lib/client";

const query = `*[_type == "sensibilise"] | order(date desc) {
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