import { PlayCircle, Video } from "lucide-react"
import Reveal from "../motion/Reveal"
import ConferenceSwiper from "./ConferenceSwiper"
import type { PastEventSlide } from "@/sanity/types"

const highlights = [
  { icon: PlayCircle, text: "Conférences et talks interactifs" },
  { icon: Video, text: "Vidéos exclusives" },
]

export default function InspiringSection({ events }: { events: PastEventSlide[] }) {
  if (events.length === 0) return null

  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Reveal y={24} duration={1} className="space-y-6 min-w-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Découvrez nos{" "}
              <span className="text-primary">conférences & vidéos</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Explorez une variété de contenus inspirants pour enrichir vos connaissances et
              développer vos compétences en informatique.
            </p>

            <ul className="space-y-2">
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="flex flex-row items-center gap-2 py-1 md:py-2 text-foreground">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
                  <span className="flex-1">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="min-w-0 w-full">
            <ConferenceSwiper events={events} />
          </div>
        </div>
      </div>
    </section>
  )
}
