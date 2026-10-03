import Link from "next/link"
import { MapPin, Calendar, ChevronRight, ArrowRight } from "lucide-react"
import { PortableText } from "next-sanity"
import Reveal from "../motion/Reveal"
import SanityImage from "../SanityImage"
import Gallery from "./Gallery"
import { formatDate, toIsoDate } from "@/lib/date"
import type {
  SensibilisationCard,
  SensibilisationDetail as SensibilisationDetailData,
} from "@/sanity/types"

export default function SensibilisationDetail({
  data,
  related,
}: {
  data: SensibilisationDetailData
  related: SensibilisationCard[]
}) {
  const gallery = (data.gallery ?? []).filter((src): src is string => Boolean(src))

  return (
    <article className="min-h-screen bg-background">
      <section className="container mx-auto px-4 md:px-16 lg:px-20 pt-8">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-primary">Accueil</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
            <li>
              <Link href="/sensibilise" className="hover:text-primary">Funda Sensibilise</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
            <li aria-current="page" className="text-foreground line-clamp-1">{data.title}</li>
          </ol>
        </nav>

        <Reveal onScroll={false} stagger={0.2} y={20} className="text-center mb-12">
          {data.category && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              {data.category}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-8">
            {data.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-medium">
            {data.location && (
              <div className="flex items-center text-sm md:text-base gap-1 md:gap-2">
                <MapPin className="text-primary h-4 w-4 md:h-4.5 md:w-4.5" aria-hidden="true" />
                <span>{data.location}</span>
              </div>
            )}
            {data.date && (
              <div className="flex items-center text-sm md:text-base gap-1 md:gap-2">
                <Calendar className="text-primary h-4 w-4 md:h-4.5 md:w-4.5" aria-hidden="true" />
                <time dateTime={toIsoDate(data.date)}>{formatDate(data.date)}</time>
              </div>
            )}
          </div>
        </Reveal>

        {data.mainImage && (
          <div className="relative aspect-[21/9] w-full md:rounded-3xl overflow-hidden mb-12 md:mb-16 bg-muted">
            <SanityImage
              src={data.mainImage}
              alt={data.title}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="prose prose-lg prose-slate max-w-none leading-relaxed">
          {data.summary && (
            <p className="text-xl font-medium text-slate-900 mb-8">{data.summary}</p>
          )}
          {data.content && <PortableText value={data.content} />}
        </div>
      </section>

      {gallery.length > 0 && <Gallery images={gallery} title={data.title} />}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-16 lg:px-20">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <h2 id="related-title" className="text-2xl md:text-3xl font-bold text-foreground">
                Autres sensibilisations
              </h2>
              <Link
                href="/sensibilise"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                Tout le programme <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid md:grid-cols-3 gap-6">
              {related.map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/sensibilise/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white hover:shadow-sm transition-shadow"
                  >
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      {item.mainImageUrl && (
                        <SanityImage
                          src={item.mainImageUrl}
                          alt={item.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-6 space-y-2">
                      {item.date && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {formatDate(item.date)}
                          {item.location ? ` · ${item.location}` : ""}
                        </p>
                      )}
                      <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  )
}
