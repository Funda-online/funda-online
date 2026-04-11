"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
        
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
            {/* <Sparkles size={18} /> */}
            <span>Impact Sur Terrain</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Prochaine <span className="text-primary uppercase">Sensibilisation</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Décoration arrière-plan identique à la section Mission */}
          <div className="absolute -top-6 -right-6 w-full h-full border border-primary/10 rounded-4xl -z-10 hidden md:block" />
          
          <div 
            ref={cardRef}
            className="group relative bg-white border border-primary/10 rounded-4xl overflow-hidden *shadow-sm hover:shadow-md transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row items-stretch">
              
              {/* Image */}
              <div className="relative lg:w-2/5 min-h-[300px] overflow-hidden">
                <Image 
                  src={data.mainImageUrl} 
                  alt={data.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>

              {/* Contenu */}
              <div className="p-8 md:p-12 lg:w-3/5 flex flex-col justify-center space-y-6">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-bold uppercase tracking-widest text-primary">
                  {/* Utilisation des nouveaux badges bg-primary/10 */}
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin size={18} />
                    </div>
                    <span className="text-muted-foreground">{data.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar size={18} />
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(data.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight *group-hover:text-primary transition-colors">
                  {data.title}
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                  {data.summary}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link href={`/sensibilisation/${data.slug}`}>
                    <Button className="rounded-full w-44 py-6.5 text-sm font-bold flex items-center gap-3 transition-all">
                      En savoir plus <ArrowRight size={20} />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="rounded-full w-52 py-6 text-sm font-bold border-primary text-primary hover:bg-accent/10 hover:text-primary transition-all">
                      Nous inviter chez vous
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}