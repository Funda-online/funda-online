"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function NextSensibilisation({ data }: { data: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        
        {/* Titre de section cohérent avec ton ArticlesGrid */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Prochaine <span className="text-primary uppercase">Sensibilisation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Rejoignez-nous lors de notre prochaine intervention sur le terrain pour échanger et apprendre ensemble.
          </p>
        </div>

        {/* Card au design "Sensibilise" */}
        <div 
          ref={cardRef}
          className="group relative bg-slate-50 border border-primary/10 rounded-4xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* Image (40% de la largeur sur desktop) */}
            <div className="relative lg:w-2/5 min-h-[300px] overflow-hidden">
              <Image 
                src={data.mainImageUrl} 
                alt={data.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              <div className="absolute top-6 left-6">
                <Badge className="bg-primary text-white px-4 py-1.5 backdrop-blur-md border-none shadow-lg text-sm font-bold uppercase tracking-wider">
                   {data.category}
                </Badge>
              </div>
            </div>

            {/* Contenu (60% de la largeur) */}
            <div className="p-8 md:p-12 lg:w-3/5 flex flex-col justify-center space-y-6">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-bold uppercase tracking-widest text-primary">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {data.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {new Date(data.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {data.title}
              </h3>

              <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                {data.summary}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href={`/sensibilisation/${data.slug}`}>
                  <Button className="rounded-full px-8 py-6 text-base font-bold flex items-center gap-3">
                    En savoir plus <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full px-8 py-6 text-base font-bold border-primary text-primary hover:bg-primary/5">
                    Nous inviter chez vous
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}