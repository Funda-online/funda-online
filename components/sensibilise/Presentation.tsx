"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, GraduationCap, Building2, HeartHandshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Presentation() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftColRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
      gsap.from(rightColRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const targets = [
    { icon: <GraduationCap size={24} />, label: "Élèves & Étudiants" },
    { icon: <Building2 size={24} />, label: "Centres de formation" },
    { icon: <Users size={24} />, label: "Organisations & ONG" },
    { icon: <HeartHandshake size={24} />, label: "Institutions sociales" }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Colonne Gauche : Le Contexte */}
          <div ref={leftColRef} className="space-y-6">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm">
              Contexte & Justification [cite: 10]
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Le numérique influence notre quotidien, mais est-il maîtrisé ? [cite: 11]
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Aujourd’hui, le numérique influence profondément notre manière d’apprendre, de travailler et de communiquer[cite: 11]. 
              Pourtant, beaucoup utilisent ces outils sans en comprendre réellement les principes ou les risques[cite: 12].
            </p>
            <div className="p-6 bg-accent/5 border-l-4 border-primary rounded-r-xl">
              <p className="italic text-foreground/80">
                "Des concepts comme l'Intelligence Artificielle restent souvent mal expliqués ou mal compris." 
              </p>
            </div>
          </div>

          {/* Colonne Droite : La Solution & Cibles */}
          <div ref={rightColRef} className="space-y-8 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
            <div>
              <h3 className="text-2xl font-bold mb-4">Notre mission [cite: 24]</h3>
              <p className="text-muted-foreground mb-6">
                <span className="font-semibold text-primary italic">Funda Sensibilise</span> est un programme entièrement gratuit d’impact social[cite: 21]. 
                Nous accompagnons les communautés vers une meilleure compréhension du numérique pour réduire la fracture digitale[cite: 19, 24].
              </p>
            </div>

            {/* Grille des cibles */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Publics cibles [cite: 22]</h4>
              <div className="grid grid-cols-2 gap-4">
                {targets.map((target, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-slate-200/50">
                    <span className="text-primary">{target.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{target.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}