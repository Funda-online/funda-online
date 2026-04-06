"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Camera, Inbox } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "../ui/badge";

gsap.registerPlugin(ScrollTrigger);

// Typage pour plus de clarté
interface Sensibilisation {
  _id: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  category: string;
  summary: string;
  mainImageUrl: string;
  photoCount: number;
}

export function Articles({ sensibilisation }: { sensibilisation: Sensibilisation[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On ne lance l'animation que s'il y a des articles
    if (!sensibilisation || sensibilisation.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".article-card");
      gsap.set(cards, { opacity: 0, y: 60 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sensibilisation]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        
        {/* Header */}
        <div ref={titleRef} className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground italic">
            Sensibilisations passées
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Découvrez l'impact de nos actions sur le terrain. Chaque session est un pas de plus vers une communauté numériquement responsable.
          </p>
        </div>

        {/* Logique si Vide */}
        {!sensibilisation || sensibilisation.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 *bg-slate-50 rounded-[3rem] *border-2 border-dashed border-slate-200 text-center">
            {/* <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 text-slate-300">
              <Inbox size={32} />
            </div> */}
            <h3 className="text-xl font-bold text-slate-900">Aucune session pour le moment</h3>
            <p className="text-slate-500 max-w-xs mt-2">
              Nos prochaines sensibilisations seront bientôt répertoriées ici. Restez connectés !
            </p>
          </div>
        ) : (
          /* Grille des articles */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sensibilisation.map((article) => (
              <Link 
                key={article._id} 
                href={`/sensibilisation/${article.slug}`}
                className="article-card group flex flex-col bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={article.mainImageUrl || "/img/placeholder.webp"} 
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white px-3 backdrop-blur-md border-none shadow-sm font-bold">
                      {article.category}
                    </Badge>
                  </div>

                  {article.photoCount > 0 && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                      <Camera size={14} />
                      {article.photoCount} photos
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" />
                      {article.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      {/* Formatage simple de la date */}
                      {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-50">
                    <span className="text-sm font-bold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Voir les détails <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}