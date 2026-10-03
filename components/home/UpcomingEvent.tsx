import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Reveal from "@/components/motion/Reveal"
import SanityImage from "@/components/SanityImage"
import { dateParts } from "@/lib/date"
import type { UpcomingEvent as UpcomingEventData } from "@/sanity/types"

export default function UpcomingEvent({ event }: { event: UpcomingEventData }) {
  const parts = dateParts(event.date)
  if (!parts) return null

  return (
    <section aria-labelledby="next-event-title" className="py-12 md:py-20 bg-muted">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <h2
          id="next-event-title"
          className="max-w-5xl mx-auto mb-8 text-3xl md:text-4xl font-bold text-foreground"
        >
          Prochain événement
        </h2>
        <Reveal
          y={50}
          className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col lg:flex-row">
            <div
              className="flex flex-row lg:flex-col items-center justify-center gap-3 lg:gap-0 rounded-2xl m-4 lg:m-6 py-3 px-6 lg:px-8 shrink-0"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              <Calendar className="w-6 h-6 lg:w-8 lg:h-8 lg:mb-2" aria-hidden="true" />
              <time dateTime={event.date} className="sr-only">
                {parts.day} {parts.month} {parts.year}
              </time>
              <span aria-hidden="true" className="text-sm font-medium uppercase tracking-wider">{parts.month}</span>
              <span aria-hidden="true" className="text-2xl lg:text-4xl font-bold lg:mt-1">{parts.day}</span>
              <span aria-hidden="true" className="text-sm lg:mt-2">{parts.year}</span>
            </div>

            {event.imageUrl && (
              <div className="relative w-full h-48 sm:h-64 lg:h-auto lg:min-h-[280px] lg:w-2/5 overflow-hidden bg-muted">
                <SanityImage
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 min-w-0 p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 md:mb-6 leading-tight">
                {event.title}
              </h3>

              <div className="space-y-2 md:space-y-4">
                {event.time && (
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Clock size={18} aria-hidden="true" />
                    </div>
                    <span className="text-muted-foreground font-medium">{event.time}</span>
                  </div>
                )}

                {event.speaker && (
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <User size={18} aria-hidden="true" />
                    </div>
                    <span className="text-muted-foreground font-medium">{event.speaker}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 md:mt-8 flex flex-col sm:flex-row gap-4">
                {event.registrationLink && (
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full w-full py-6.5 md:w-auto text-sm font-semibold transition-all"
                  >
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      S&apos;inscrire maintenant
                    </a>
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full w-full md:w-auto py-6 text-sm font-semibold border bg-transparent text-primary border-primary hover:bg-accent/10 hover:text-primary"
                >
                  <Link href="/events">Voir les détails</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
