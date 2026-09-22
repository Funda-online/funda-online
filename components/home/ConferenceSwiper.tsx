"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import Image from "next/image"
import { Play } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { urlFor } from "@/sanity/lib/image"

export default function ConferenceSwiper({ events }: { events: any[] }) {
  return (
    <div className="w-full max-w-xl mx-auto overflow-hidden">
      <Swiper
        grabCursor={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        spaceBetween={16}
        className="conference-swiper !pb-10"
      >
        {events.map((ev) => {
          const src = ev.imageUrl || (ev.image ? urlFor(ev.image).width(800).height(450).url() : "")
          return (
            <SwiperSlide key={ev._id} className="!w-full">
              <article className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {src ? (
                    <Image
                      src={src}
                      alt={ev.title}
                      fill
                      className="object-cover"
                      quality={90}
                    />
                  ) : null}
                  {ev.replayUrl && (
                    <a
                      href={ev.replayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center"
                    >
                      <span className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white" fill="white" />
                      </span>
                    </a>
                  )}
                </div>
              </article>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
