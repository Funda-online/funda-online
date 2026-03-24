"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight, Camera } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "../ui/badge"; // Assure-toi d'avoir ce composant ou utilise un span stylé

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: "Sensibilisation à l’IA et aux métiers du futur",
    location: "Lubumbashi",
    date: "10 Février 2026",
    category: "Éducation",
    summary: "Une session immersive pour démystifier l'IA auprès des étudiants de l'UNILU, abordant les opportunités locales et l'éthique numérique.",
    image: "/img/1.webp", // Utilise tes images réelles ici
    galleryCount: 12
  },
  // Tu peux ajouter d'autres objets ici
];

export function Articles() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".article-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        
        {/* En-tête de section */}
        <div ref={titleRef} className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Sensibilisations passées
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Découvrez l'impact de nos actions sur le terrain. Chaque session est un pas de plus vers une communauté numériquement responsable.
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article 
              key={i} 
              className="article-card group cursor-pointer flex flex-col bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container avec effet de zoom */}
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={article.image} 
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay dégradé pour la lisibilité du badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-md border-none shadow-sm">
                    {article.category}
                  </Badge>
                </div>
                {/* Badge photo si disponible */}
                {article.galleryCount > 0 && (
                   <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                     <Camera size={14} />
                     {article.galleryCount} photos
                   </div>
                )}
              </div>

              {/* Contenu de l'article */}
              <div className="p-8 flex flex-col flex-1 space-y-4">
                {/* Meta data */}
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

                {/* Footer de la carte */}
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