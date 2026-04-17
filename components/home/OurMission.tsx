"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OurMission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du texte (slide up + fade)
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

      // Animation de l'image (scale + fade)
      gsap.from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
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
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Contenu texte */}
          <div ref={textRef} className="space-y-8 order-2 md:order-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                <span>Notre Mission</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl *lg:text-[50px] font-bold leading-[1.1] text-foreground">
                Donner du pouvoir à la prochaine génération de{" "}
                <span className="text-primary">leaders technologiques</span>
              </h2>
            </div>

            <div className="space-y-2 md:space-y-4">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Chez <span className="">Funda</span>, nous sommes convaincus que l'accès à une formation numérique de qualité est un droit, pas un privilège.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Nous accompagnons les jeunes et les passionnés dans la maîtrise des outils qui façonneront le monde de demain.
              </p>
            </div>

            <div className="pt-1">
              <Link href="/events/upcoming">
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

          {/* Contenu image */}
          <div
            ref={imageRef}
            className="relative order-1 md:order-2"
          >
            {/* Décoration arrière-plan */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-primary/10 rounded-4xl -z-10 hidden md:block" />
            
            <div className="relative w-full h-[400px] md:h-[550px] rounded-4xl overflow-hidden shadow-2xl">
              <Image
                src="/img/our.jpg"
                alt="Étudiants en informatique travaillant ensemble"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-110"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurMission;