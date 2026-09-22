"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OurMission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-white"
    >
      <div className="container px-4 md:px-16 lg:px-20 mx-auto">
        <div ref={textRef} className="max-w-3xl mx-auto space-y-8 text-center">
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
            <Link href="/events">
              <Button
                variant="outline"
                className="rounded-full w-54 py-6.5 text-sm border-primary text-primary font-bold flex items-center gap-3 hover:bg-accent/10 hover:text-primary transition-all"
              >
                Voir les événements
                <ArrowRight size={22} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
