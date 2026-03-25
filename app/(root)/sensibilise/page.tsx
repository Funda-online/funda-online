import { Articles } from "@/components/sensibilise/Articles";
import Axes  from "@/components/sensibilise/Axes";
import Hero  from "@/components/sensibilise/Hero";
import ModeleIntervention from "@/components/sensibilise/ModeleIntervention";
import Presentation  from "@/components/sensibilise/Presentation";


const FundaSensibilisePage = () => {
  return (
    <main className="py-12 space-y-16">
      <Hero />
      <Presentation />
      <Axes />
      <Articles />
      <ModeleIntervention />
    </main>
  );
}

export default FundaSensibilisePage