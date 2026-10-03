"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Play, Facebook, Youtube, Download, Users, MapPin, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import SanityImage from "@/components/SanityImage"
import { formatDate } from "@/lib/date"
import type { PastEvent, UpcomingEvent } from "@/sanity/types"

type EventsPageClientProps = {
  upcoming: UpcomingEvent[]
  past: PastEvent[]
}

type Tab = "upcoming" | "past"

const TABS: { value: Tab; label: string }[] = [
  { value: "upcoming", label: "À venir" },
  { value: "past", label: "Passés" },
]

const CARD_IMAGE_SIZES = "(min-width: 1280px) 400px, (min-width: 1024px) 50vw, 100vw"

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="text-center text-muted-foreground py-16">{children}</p>
}

function UpcomingCard({ event }: { event: UpcomingEvent }) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-muted">
        {event.imageUrl && (
          <SanityImage
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes={CARD_IMAGE_SIZES}
            className="object-cover"
          />
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
        <div className="space-y-2 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            {event.format === "onsite" ? (
              <>
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{event.location || "Lubumbashi"}</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>En ligne</span>
              </>
            )}
          </div>
          {event.speaker && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>{event.speaker}</span>
            </div>
          )}
        </div>
        {event.registrationLink && (
          <Button asChild className="mt-auto w-full rounded-full py-6 text-sm font-semibold">
            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              Rejoindre l&apos;événement
            </a>
          </Button>
        )}
      </div>
    </article>
  )
}

function PastCard({ event }: { event: PastEvent }) {
  const platformLabel = event.platform === "facebook" ? "Facebook" : "YouTube"
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-muted">
        {event.imageUrl && (
          <SanityImage
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes={CARD_IMAGE_SIZES}
            className="object-cover"
          />
        )}
        {event.category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[13px] text-white bg-primary font-medium">
              {event.category}
            </span>
          </div>
        )}
        {event.replayUrl && (
          <a
            href={event.replayUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir le replay : ${event.title}`}
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center"
          >
            <span className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white" fill="white" aria-hidden="true" />
            </span>
          </a>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-3">{event.title.trim()}</h3>
        <p className="text-muted-foreground mb-4 flex-1">
          {event.description ? truncate(event.description, 100) : "Aucune description disponible"}
        </p>
        <div className="space-y-2 mb-4 text-sm text-slate-600">
          {event.date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{formatDate(event.date)}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
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
              <Facebook className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Youtube className="w-4 h-4" aria-hidden="true" />
            )}
            <span className="text-sm">Replay sur {platformLabel}</span>
          </div>
        )}
        <div className="mt-auto pt-4 space-y-3">
          {event.replayUrl && (
            <a
              href={event.replayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium bg-primary text-primary-foreground"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              <span>Voir le replay</span>
            </a>
          )}
          {event.slidesUrl && (
            <a
              href={event.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2 border-primary text-primary"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Télécharger les slides</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function EventsPageClient({ upcoming, past }: EventsPageClientProps) {
  const [tab, setTab] = useState<Tab>(upcoming.length ? "upcoming" : "past")

  return (
    <div className="relative overflow-hidden">
      <section className="relative py-24 md:py-28 px-4 text-center text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/img/events-hero.jpg"
            alt="Participants à une conférence Funda à Lubumbashi"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements</h1>
          <p className="md:text-lg opacity-90 max-w-2xl mx-auto">
            Webinaires, ateliers et conférences gratuits pour apprendre l&apos;informatique :
            à venir et en replay, au même endroit.
          </p>
        </div>
      </section>

      <section className="relative py-12 md:py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-7xl">
          <div className="flex justify-center mb-10">
            <div
              role="tablist"
              aria-label="Type d'événements"
              className="inline-flex rounded-full bg-white p-1 border border-primary/10"
            >
              {TABS.map(({ value, label }) => (
                <button
                  key={value}
                  id={`tab-${value}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === value}
                  aria-controls={`panel-${value}`}
                  onClick={() => setTab(value)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    tab === value ? "bg-primary text-white" : "text-foreground hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Les deux panneaux sont toujours rendus : les moteurs de recherche
              indexent ainsi les événements à venir ET les replays. */}
          <div id="panel-upcoming" role="tabpanel" aria-labelledby="tab-upcoming" hidden={tab !== "upcoming"}>
            <h2 className="sr-only">Événements à venir</h2>
            {upcoming.length === 0 ? (
              <EmptyState>Aucun événement à venir pour le moment.</EmptyState>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {upcoming.map((event) => (
                  <UpcomingCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </div>

          <div id="panel-past" role="tabpanel" aria-labelledby="tab-past" hidden={tab !== "past"}>
            <h2 className="sr-only">Événements passés et replays</h2>
            {past.length === 0 ? (
              <EmptyState>Aucun événement passé pour le moment.</EmptyState>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {past.map((event) => (
                  <PastCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
