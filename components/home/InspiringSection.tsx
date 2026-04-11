"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PlayCircle, Download, Video } from "lucide-react"
import ConferenceSwiper from "./ConferenceSwiper"

gsap.registerPlugin(ScrollTrigger)

export default function InspiringSection({ events }: { events: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const listItemsRef = useRef<HTMLLIElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listItemsRef.current.filter(Boolean)

      // ✅ état initial sécurisé
      gsap.set(textRef.current, { opacity: 0, x: -60 })
      gsap.set(items, { opacity: 0, x: -20 })

      // ✅ animation texte
      gsap.to(textRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // ✅ animation des 3 items (cascade propre)
      gsap.to(items, {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Texte */}
          <div ref={textRef} className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              Découvrez nos <br />
              <span className="text-primary uppercase">Conférences & vidéos</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Explorez une variété de contenus inspirants pour enrichir vos connaissances et 
              développer vos compétences en informatique.
            </p>

            <ul className="space-y-2">
              {[
                { icon: <PlayCircle className="w-5 h-5 md:w-6 md:h-6" />, text: "Conférences interactives avec experts" },
                { icon: <Video className="w-5 h-5 md:w-6 md:h-6" />, text: "Vidéos exclusives et tutoriels" },
                { icon: <Download className="w-5 h-5 md:w-6 md:h-6" />, text: "Ressources téléchargeables" }
              ].map((item, index) => (
                <li 
                  key={index}
                  ref={(el) => {
                    if (el) listItemsRef.current[index] = el
                  }}
                  className="flex flex-row items-center gap-2 py-1 md:py-2 rounded-xl transition-all"
                  style={{ color: "var(--foreground)" }}
                >
                  <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                  <span className="flex-1">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Swiper */}
          <ConferenceSwiper events={events} />
        </div>
      </div>
    </section>
  )
}