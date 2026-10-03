import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Reveal from "../motion/Reveal";

const OurMission = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">
      <div className="container px-4 md:px-16 lg:px-20 mx-auto">
        <Reveal y={50} duration={1} className="max-w-3xl mx-auto space-y-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] text-foreground">
            Donner du pouvoir à la prochaine génération de{" "}
            <span className="text-primary">leaders technologiques</span>
          </h2>

          <div className="space-y-2 md:space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Chez Funda, nous sommes convaincus que l&apos;accès à une formation numérique de qualité est un droit, pas un privilège.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Nous accompagnons les jeunes et les passionnés dans la maîtrise des outils qui façonneront le monde de demain.
            </p>
          </div>

          <div className="pt-1 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full w-54 py-6.5 text-sm border-primary text-primary font-bold flex items-center gap-3 hover:bg-accent/10 hover:text-primary transition-all"
            >
              <Link href="/events">
                Voir les événements
                <ArrowRight size={22} />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default OurMission;
