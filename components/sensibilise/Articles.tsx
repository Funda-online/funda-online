"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight, Camera } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "../ui/badge";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: "Sensibilisation à l’IA et aux métiers du futur",
    location: "Lubumbashi",
    date: "10 Février 2026",
    category: "Éducation",
    summary: "Une session immersive pour démystifier l'IA auprès des étudiants de l'UNILU, abordant les opportunités locales et l'éthique numérique.",
    image: "/img/1.webp",
    galleryCount: 12
  },
  {
    title: "Sensibilisation à l’IA et aux métiers du futur",
    location: "Lubumbashi",
    date: "10 Février 2026",
    category: "Éducation",
    summary: "Une session immersive pour démystifier l'IA auprès des étudiants de l'UNILU, abordant les opportunités locales et l'éthique numérique.",
    image: "/img/1.webp",
    galleryCount: 12
  },
  {
    title: "Sensibilisation à l’IA et aux métiers du futur",
    location: "Lubumbashi",
    date: "10 Février 2026",
    category: "Éducation",
    summary: "Une session immersive pour démystifier l'IA auprès des étudiants de l'UNILU, abordant les opportunités locales et l'éthique numérique.",
    image: "/img/1.webp",
    galleryCount: 12
  },
];

export function Articles(sensibilisation: any) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".article-card");

      // ✅ état initial sécurisé
      gsap.set(cards, { opacity: 0, y: 60 });

      // ✅ animation fiable
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ✅ animation du header (optionnel mais propre)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        
        <div ref={titleRef} className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Sensibilisations passées
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Découvrez l'impact de nos actions sur le terrain. Chaque session est un pas de plus vers une communauté numériquement responsable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article 
              key={i} 
              className="article-card group cursor-pointer flex flex-col bg-white border border-primary/10 rounded-4xl overflow-hidden *shadow-sm hover:shadow-sm transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={article.image} 
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-white px-3 backdrop-blur-md border-none shadow-sm">
                    {article.category}
                  </Badge>
                </div>

                {article.galleryCount > 0 && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                    <Camera size={14} />
                    {article.galleryCount} photos
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    {article.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    {article.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-50">
                  <span className="text-sm font-bold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Lire le résumé <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}