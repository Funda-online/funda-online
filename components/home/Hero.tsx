import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Reveal from "../motion/Reveal";
import Parallax from "../motion/Parallax";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Parallax className="absolute inset-0 scale-110">
          <Image
            src="/img/hero.jpg"
            alt="Jeunes participants à une activité Funda à Lubumbashi"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Parallax>
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-5xl md:px-6 py-20 text-center">
        <Reveal
          onScroll={false}
          stagger={0.2}
          y={50}
          duration={1.2}
          className="space-y-4 md:space-y-8 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] md:leading-[1.05]">
            La nouvelle façon
            <br />
            d&apos;apprendre.
          </h1>

          <p className="text-sm md:text-lg px-8 text-gray-300 md:max-w-2xl leading-relaxed font-medium mx-auto">
            Webinaires, événements et sensibilisations gratuites pour apprendre
            l&apos;informatique à Lubumbashi et partout en RDC.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-6 w-full sm:w-auto items-center">
            <Button asChild className="rounded-full w-54 py-7 text-sm font-semibold">
              <Link href="/events">
                Voir les événements
                <ArrowRight size={20} />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full w-50 py-6.5 text-sm font-semibold border-white bg-transparent text-white hover:bg-accent/10 hover:text-primary hover:border-primary transition-all"
            >
              <Link href="/sensibilise">Funda Sensibilise</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
