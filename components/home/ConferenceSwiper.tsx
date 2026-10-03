"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules"
import { Play } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SanityImage from "@/components/SanityImage"
import type { PastEventSlide } from "@/sanity/types"

export default function ConferenceSwiper({ events }: { events: PastEventSlide[] }) {
  return (
    <div className="w-full max-w-xl mx-auto overflow-hidden">
      <Swiper
        grabCursor={true}
        modules={[Pagination, Navigation, Autoplay, A11y]}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation={true}
        spaceBetween={16}
        className="conference-swiper !pb-10"
      >
        {events.map((ev, index) => (
          <SwiperSlide key={ev._id} className="!w-full">
            <article className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative aspect-video overflow-hidden bg-muted">
                {ev.imageUrl && (
                  <SanityImage
                    src={ev.imageUrl}
                    alt={ev.title}
                    fill
                    sizes="(min-width: 1024px) 576px, 100vw"
                    className="object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}
                {ev.replayUrl && (
                  <a
                    href={ev.replayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir le replay : ${ev.title}`}
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center"
                  >
                    <span className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition">
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white" fill="white" aria-hidden="true" />
                    </span>
                  </a>
                )}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
