"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { MapPin, Calendar, Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react"
import { PortableText } from "next-sanity"

export default function SensibilisationDetail({ data }: { data: any }) {
  const pageRef = useRef(null)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const gallery: string[] = data?.gallery?.filter(Boolean) || []

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(".meta-badge", { y: 10, opacity: 0, duration: 0.5 })
        .from(".main-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-image", { scale: 1.05, opacity: 0, duration: 1.2 }, "-=0.8")
        .from(".content-section", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    }, pageRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (previewIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewIndex(null)
      if (event.key === "ArrowRight") {
        setPreviewIndex((current) =>
          current === null ? current : (current + 1) % gallery.length
        )
      }
      if (event.key === "ArrowLeft") {
        setPreviewIndex((current) =>
          current === null ? current : (current - 1 + gallery.length) % gallery.length
        )
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [previewIndex, gallery.length])

  if (!data) return null

  const previewSrc = previewIndex !== null ? gallery[previewIndex] : null

  return (
    <div ref={pageRef} className="min-h-screen bg-background pb-20">
      <section className="container mx-auto px-4 md:px-16 lg:px-20 pt-8">
        <div className="text-center mb-12">
          {data.category && (
            <div className="meta-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              {data.category}
            </div>
          )}

          <h1 className="main-title text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-8">
            {data.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-medium">
            {data.location && (
              <div className="flex items-center text-sm md:text-base gap-1 md:gap-2">
                <MapPin className="text-primary h-4 w-4 md:h-4.5 md:w-4.5" />
                <span>{data.location}</span>
              </div>
            )}
            {data.date && (
              <div className="flex items-center text-sm md:text-base gap-1 md:gap-2">
                <Calendar className="text-primary h-4 w-4 md:h-4.5 md:w-4.5" />
                <span>
                  {new Date(data.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {data.mainImage && (
          <div className="hero-image relative aspect-[21/9] w-full md:rounded-3xl overflow-hidden mb-12 md:mb-16">
            <Image
              src={data.mainImage}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </section>

      <section className="content-section container mx-auto px-4 md:px-16 lg:px-20">
        <div className="w-full space-y-8">
          <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
            {data.summary && (
              <p className="text-xl font-medium text-slate-900 mb-8">{data.summary}</p>
            )}
            {data.content && <PortableText value={data.content} />}
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="bg-muted mt-12 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-16 lg:px-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <ImageIcon className="text-primary" />
                Moments forts
              </h3>
              <span className="text-sm font-medium text-slate-400 bg-white px-3 py-1 rounded-full">
                {gallery.length} photos
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img: string, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPreviewIndex(index)}
                  className="relative aspect-square rounded-2xl overflow-hidden group"
                  aria-label={`Prévisualiser la photo ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Moment fort ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {previewSrc && previewIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setPreviewIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Prévisualisation de la photo"
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-white rounded-full p-2 hover:bg-white/10"
            onClick={() => setPreviewIndex(null)}
            aria-label="Fermer la prévisualisation"
          >
            <X size={28} />
          </button>

          {gallery.length > 1 && (
            <button
              type="button"
              className="absolute left-4 md:left-8 text-white rounded-full p-2 hover:bg-white/10"
              onClick={(event) => {
                event.stopPropagation()
                setPreviewIndex((previewIndex - 1 + gallery.length) % gallery.length)
              }}
              aria-label="Photo précédente"
            >
              <ChevronLeft size={36} />
            </button>
          )}

          <div
            className="relative w-full max-w-5xl aspect-[16/10]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={previewSrc}
              alt={`Prévisualisation ${previewIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {gallery.length > 1 && (
            <button
              type="button"
              className="absolute right-4 md:right-8 text-white rounded-full p-2 hover:bg-white/10"
              onClick={(event) => {
                event.stopPropagation()
                setPreviewIndex((previewIndex + 1) % gallery.length)
              }}
              aria-label="Photo suivante"
            >
              <ChevronRight size={36} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
