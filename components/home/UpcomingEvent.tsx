"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "../../sanity/lib/image"

gsap.registerPlugin(ScrollTrigger)

export default function UpcomingEvent({ event }: { event: any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!event?.date) return

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, [event])

  if (!event?.date) return null

  const dateObj = new Date(event.date)
  const month = dateObj.toLocaleString("fr-FR", { month: "long" })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-muted">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
          <div
            ref={cardRef}
            className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col lg:flex-row">
              <div
                className="event-date flex flex-row lg:flex-col items-center justify-center gap-3 lg:gap-0 rounded-2xl m-4 lg:m-6 py-3 px-6 lg:px-8 shrink-0"
                style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                <Calendar className="w-6 h-6 lg:w-8 lg:h-8 lg:mb-2" />
                <span className="text-sm font-medium uppercase tracking-wider">{month}</span>
                <span className="text-2xl lg:text-4xl font-bold lg:mt-1">{day}</span>
                <span className="text-sm lg:mt-2">{year}</span>
              </div>

              {event.image && (
                <div className="event-image relative w-full h-48 sm:h-64 lg:h-auto lg:min-h-[280px] lg:w-2/5 overflow-hidden bg-muted">
                  <Image
                    src={urlFor(event.image).url()}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0 p-6 md:p-8 flex flex-col justify-center">
              <h3
                // className="event-title text-xl md:text-2xl font-bold mb-5 md:mb-6"
                className="event-title text-xl md:text-2xl font-bold text-foreground mb-5 md:mb-6 leading-tight group-hover:text-primary transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                {event.title}
              </h3>

              <div className="space-y-2 md:space-y-4">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Clock size={18} />
                    </div>
                    <span className="text-muted-foreground font-medium">{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <User size={18} />
                    </div>
                    <span className="text-muted-foreground font-medium">{event.speaker}</span>
                  </div>
              </div>

              <div className="mt-5 md:mt-8 flex flex-col sm:flex-row gap-4">
                {event.registrationLink && (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="rounded-full w-full py-6.5 md:w-auto text-sm font-semibold *border-[1.5px] transition-all"
                      style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                    >
                      S'inscrire maintenant
                    </Button>
                  </a>
                )}
                <Link href="/events">
                  <Button variant="outline" className="rounded-full w-full md:w-auto py-6 text-sm font-semibold border bg-transparent text-primary border-primary hover:bg-accent/10 hover:text-primary">
                    Voir les détails
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}