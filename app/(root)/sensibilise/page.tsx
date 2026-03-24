import { Articles } from "@/components/sensibilise/Articles";
import { Axes } from "@/components/sensibilise/Axes";
import Hero  from "@/components/sensibilise/Hero";
import Presentation  from "@/components/sensibilise/Presentation";


const FundaSensibilisePage = () => {
  return (
    <main className="px-6 md:px-12 py-12 space-y-16">
      <Hero />
      <Presentation />
      <Axes />
      <Articles />
    </main>
  );
}

export default FundaSensibilisePage