"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(".hero-description",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background pt-16 pb-12 md:pt-24 md:pb-20 px-4 md:px-16 lg:px-20"
    >
      {/* Background Decor - Un rappel subtil du côté technologique */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl text-center space-y-8">

        {/* Titre Principal  */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
        >
          Funda <span className="text-primary">Sensibilise</span>
        </h1>

        {/* Description [cite: 2, 19, 21] */}
        <p className="hero-description text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Un programme entièrement gratuit dédié à la <span className="font-semibold text-foreground">sensibilisation au numérique responsable</span> et à l’autonomisation des communautés en RDC.
        </p>
      </div>
    </section>
  );
}