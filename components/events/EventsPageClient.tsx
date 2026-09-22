"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Play, Facebook, Youtube, Download, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/lib/image"

type EventsPageClientProps = {
  upcoming: any[]
  past: any[]
}

const getIllustration = (event: any) => {
  if (event?.image?.asset?.url) return event.image.asset.url
  if (event?.image) {
    try {
      return urlFor(event.image).width(800).height(450).url()
    } catch {
      return ""
    }
  }
  return ""
}

const formatUpcomingDate = (date?: string) => {
  if (!date) return ""
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function EventsPageClient({ upcoming, past }: EventsPageClientProps) {
  const [tab, setTab] = useState<"upcoming" | "past">(
    upcoming?.length ? "upcoming" : "past"
  )

  const events = tab === "upcoming" ? upcoming : past

  return (
    <div className="relative overflow-hidden">
      <section className="relative py-24 md:py-28 px-4 text-center text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/img/pexels-mikhail-nilov-9300726.jpg"
            alt="Événements Funda"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements</h1>
          <p className="md:text-lg opacity-90 max-w-2xl mx-auto">
            Webinaires, ateliers et conférences Funda : à venir et en replay, au même endroit.
          </p>
        </div>
      </section>

      <section className="relative py-12 md:py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-7xl">
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-full bg-white p-1 border border-primary/10">
              <button
                type="button"
                onClick={() => setTab("upcoming")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                  tab === "upcoming"
                    ? "bg-primary text-white"
                    : "text-foreground hover:text-primary"
                }`}
              >
                À venir
              </button>
              <button
                type="button"
                onClick={() => setTab("past")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                  tab === "past"
                    ? "bg-primary text-white"
                    : "text-foreground hover:text-primary"
                }`}
              >
                Passés
              </button>
            </div>
          </div>

          {events.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              {tab === "upcoming"
                ? "Aucun événement à venir pour le moment."
                : "Aucun événement passé pour le moment."}
            </p>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {tab === "upcoming"
                ? upcoming.map((event) => {
                    const illustration = getIllustration(event)
                    return (
                      <article key={event._id} className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden bg-muted">
                          {illustration ? (
                            <Image
                              src={illustration}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                          <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{formatUpcomingDate(event.date)}</span>
                            </div>
                            {event.time && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>{event.time}</span>
                              </div>
                            )}
                            {event.speaker && (
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-primary" />
                                <span>{event.speaker}</span>
                              </div>
                            )}
                          </div>
                          {event.registrationLink && (
                            <a
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto"
                            >
                              <Button className="w-full rounded-full py-6 text-sm font-semibold">
                                Rejoindre l&apos;événement
                              </Button>
                            </a>
                          )}
                        </div>
                      </article>
                    )
                  })
                : past.map((event) => {
                    const illustration = getIllustration(event)
                    return (
                      <article key={event._id} className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden bg-muted">
                          {illustration ? (
                            event.replayUrl ? (
                              <a href={event.replayUrl} target="_blank" rel="noopener noreferrer">
                                <Image
                                  src={illustration}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                />
                              </a>
                            ) : (
                              <Image
                                src={illustration}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            )
                          ) : null}
                          {event.category && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full text-[13px] text-white bg-primary font-medium">
                                {event.category}
                              </span>
                            </div>
                          )}
                          {event.replayUrl && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center pointer-events-none">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Play className="w-8 h-8 text-white" fill="white" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                          <p className="text-muted-foreground mb-4 flex-1">
                            {event.description
                              ? event.description.length > 100
                                ? `${event.description.slice(0, 100)}…`
                                : event.description
                              : "Aucune description disponible"}
                          </p>
                          <div className="space-y-2 mb-4 text-sm text-gray-500">
                            {event.date && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{event.date}</span>
                              </div>
                            )}
                            {event.time && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{event.time}</span>
                              </div>
                            )}
                            {event.speaker && (
                              <div>
                                <span className="font-medium">Intervenant :</span> {event.speaker}
                              </div>
                            )}
                          </div>
                          {event.platform && (
                            <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-[var(--secondary)]">
                              {event.platform === "facebook" ? (
                                <Facebook className="w-4 h-4" />
                              ) : (
                                <Youtube className="w-4 h-4" />
                              )}
                              <span className="text-sm">
                                Replay sur {event.platform === "facebook" ? "Facebook" : "YouTube"}
                              </span>
                            </div>
                          )}
                          <div className="mt-auto pt-4 space-y-3">
                            {event.replayUrl && (
                              <a
                                href={event.replayUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium"
                                style={{
                                  backgroundColor: "var(--primary)",
                                  color: "var(--primary-foreground)",
                                }}
                              >
                                <Play className="w-4 h-4" />
                                <span>Voir le replay</span>
                              </a>
                            )}
                            {event.slidesUrl && (
                              <a
                                href={event.slidesUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2"
                                style={{
                                  borderColor: "var(--primary)",
                                  color: "var(--primary)",
                                }}
                              >
                                <Download className="w-4 h-4" />
                                <span>Télécharger les slides</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
