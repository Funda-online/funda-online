"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, ShieldCheck, Rocket, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Axes() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const axes = [
    {
      title: "Intelligence Artificielle",
      desc: "Démystifier l'IA : comprendre ses fondamentaux, ses applications concrètes et les enjeux éthiques pour ne plus subir mais choisir sa technologie.",
      icon: <BrainCircuit className="w-10 h-10" />,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Cybersécurité",
      desc: "Protection des données, gestion des mots de passe et réflexes face aux cybermenaces (désinformation, phishing) pour naviguer en toute sérénité.",
      icon: <ShieldCheck className="w-10 h-10" />,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Auto-apprentissage",
      desc: "Devenir acteur de son futur : exploiter les cours en ligne, obtenir des certifications et maîtriser l'ingénierie de prompt pour optimiser son temps.",
      icon: <Rocket className="w-10 h-10" />,
      color: "bg-amber-500/10 text-amber-600",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".axis-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[var(--muted)]">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        
        {/* Header de section */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos axes d’intervention
          </h2>
          <p className="text-lg text-muted-foreground">
            Le programme s'articule autour de trois piliers fondamentaux pour une autonomie numérique complète.
          </p>
        </div>

        {/* Grille de cartes */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {axes.map((item, i) => (
            <div 
              key={i} 
              className="axis-card group relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Cercle Icone */}
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {item.desc}
              </p>

              {/* Petit indicateur de lien (optionnel visuellement) */}
              <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
              </div>

              {/* Décoration subtile en arrière-plan */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}