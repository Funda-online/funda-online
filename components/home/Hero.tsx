"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animation d'entrée des textes en cascade
      tl.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
      });

      // Effet de parallaxe sur l'image de fond
      gsap.to(".hero-bg-image", {
        yPercent: 15,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Full Width (w-full) & No Border */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="hero-bg-image absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/img/IMG_7268.JPG')" }}
        />
        {/* Overlay progressif pour la lisibilité */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
      </div>

      {/* Contenu - Toujours centré (text-center & mx-auto) */}
      <div className="relative z-10 w-full max-w-5xl  md:px-6 py-20 text-center">
        <div className="hero-content space-y-4 md:space-y-8 flex flex-col items-center">
          {/* Badge Centré */}
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 *border border-primary/30 backdrop-blur-md text-white text-xs md:text-sm font-bold tracking-widest">
            <span>La Tech à portée de main</span>
          </div> */}

          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold tracking-tight text-white leading-[1.1] md:leading-[1.05]">
            La nouvelle façon
            <br />
            d&apos;apprendre.
          </h1>

          <p className="text-sm md:text-lg px-8 text-gray-300 md:max-w-2xl leading-relaxed font-medium mx-auto">
            L&apos;internet regorge d&apos;une multitude de ressources et de
            possibilités pour apprendre de nouvelles compétences.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-6 w-full sm:w-auto">
            <Link href="/events">
              <Button
                className="rounded-full w-54 py-7 text-sm font-semibold"
              >
                Voir les événements
                <ArrowRight size={20} />
              </Button>
            </Link>

            <Link href="/sensibilise">
              <Button
                variant="outline"
            className="rounded-full w-50 py-6.5 text-sm font-semibold border-white bg-transparent text-white hover:bg-accent/10 hover:text-primary hover:border-primary transition-all"
              >
                Funda Sensibilise
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
