"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          formRef.current,
          {
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          infoRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-32 bg-muted overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-16 lg:px-20 relative z-10">
        {/* En-tête harmonisé */}
        <div
          ref={titleRef}
          className="mb-16 space-y-4 flex items-center justify-center text-center md:text-left"
        >
          <div>
            {/* <div className="flex items-center justify-center md:justify-center text-primary font-bold uppercase tracking-widest text-sm">
              <span className="text-center">Parlons ensemble</span>
            </div> */}
            <h2 className="text-3xl md:text-5xl mb-4 font-bold text-foreground text-center leading-tight">
              Contactez-<span className="text-primary uppercase">nous</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl text-base md:text-lg text-center leading-relaxed mx-auto md:mx-0">
              Une question, un projet ou simplement envie d'échanger ? Notre
              équipe est à votre écoute pour vous accompagner.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Formulaire de contact - Style "Funda Card" */}
          <div ref={formRef} className="relative">
            {/* Décoration arrière-plan */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-primary/10 rounded-4xl -z-10 hidden md:block" />

            <div className="bg-white p-8 md:p-10 rounded-4xl border border-primary/10 h-full">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-foreground/70 ml-1">
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full py-4 px-6 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all duration-300 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-foreground/70 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      className="w-full py-4 px-6 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-foreground/70 ml-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full py-4 px-6 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all duration-300 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-foreground/70 ml-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Votre message ici..."
                    className="w-full py-4 px-6 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 transition-all duration-300 outline-none resize-none"
                  />
                </div>

                <Button className="w-full py-7 rounded-full text-sm font-bold *tracking-widest flex items-center gap-3 transition-transform active:scale-95 *shadow-lg *shadow-primary/20">
                  <Send size={18} />
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>

          {/* Informations de contact */}
          <div
            ref={infoRef}
            className="flex flex-col justify-center space-y-10"
          >
            <div className="space-y-8">
              {[
                {
                  icon: <Mail />,
                  title: "Email",
                  value: "info@funda-online.com",
                },
                {
                  icon: <Phone />,
                  title: "Téléphone",
                  value: "+243 973 900 363",
                },
                {
                  icon: <MapPin />,
                  title: "Adresse",
                  value: "15, Ch. de Kasenga, Bel air, L'shi",
                },
                {
                  icon: <Clock />,
                  title: "Horaires",
                  value: "Lun-Ven: 8h-17h | Sam: 9h-13h",
                },
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary/60">
                      {item.title}
                    </h4>
                    <p className="text-base md:text-lg *font-bold text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Badge "Trusted" ou Social */}
            {/* <div className="p-8 rounded-4xl bg-slate-50 border border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                <Sparkles size={32} />
              </div>
              <div>
                <p className="font-bold text-foreground">
                  Besoin d'une réponse rapide ?
                </p>
                <p className="text-sm text-muted-foreground">
                  Notre équipe répond généralement en moins de 24h.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
