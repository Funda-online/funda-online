"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react"
import SanityImage from "../SanityImage"

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = images.length

  const isOpen = previewIndex !== null

  const show = useCallback(
    (step: number) =>
      setPreviewIndex((current) => (current === null ? current : (current + step + count) % count)),
    [count]
  )

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewIndex(null)
      if (event.key === "ArrowRight") show(1)
      if (event.key === "ArrowLeft") show(-1)
    }

    closeRef.current?.focus()
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen, show])

  const previewSrc = previewIndex !== null ? images[previewIndex] : null

  return (
    <section className="bg-muted mt-12 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ImageIcon className="text-primary" aria-hidden="true" />
            Moments forts
          </h2>
          <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full">
            {count} photos
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <button
              key={img}
              type="button"
              onClick={() => setPreviewIndex(index)}
              className="relative aspect-square rounded-2xl overflow-hidden group bg-white"
              aria-label={`Agrandir la photo ${index + 1}`}
            >
              <SanityImage
                src={img}
                alt={`${title} — photo ${index + 1}`}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {previewSrc && previewIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setPreviewIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${previewIndex + 1} sur ${count}`}
        >
          <button
            ref={closeRef}
            type="button"
            className="absolute top-5 right-5 text-white rounded-full p-2 hover:bg-white/10"
            onClick={() => setPreviewIndex(null)}
            aria-label="Fermer la prévisualisation"
          >
            <X size={28} />
          </button>

          {count > 1 && (
            <button
              type="button"
              className="absolute left-4 md:left-8 z-10 text-white rounded-full p-2 hover:bg-white/10"
              onClick={(event) => {
                event.stopPropagation()
                show(-1)
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
            <SanityImage
              src={previewSrc}
              alt={`${title} — photo ${previewIndex + 1}`}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-contain"
            />
          </div>

          {count > 1 && (
            <button
              type="button"
              className="absolute right-4 md:right-8 z-10 text-white rounded-full p-2 hover:bg-white/10"
              onClick={(event) => {
                event.stopPropagation()
                show(1)
              }}
              aria-label="Photo suivante"
            >
              <ChevronRight size={36} />
            </button>
          )}
        </div>
      )}
    </section>
  )
}
