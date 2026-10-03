import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Camera } from "lucide-react";
import { Badge } from "../ui/badge";
import Reveal from "../motion/Reveal";
import SanityImage from "../SanityImage";
import { formatDate } from "@/lib/date";
import type { SensibilisationCard } from "@/sanity/types";

export function Articles({ sensibilisation }: { sensibilisation: SensibilisationCard[] }) {
  if (sensibilisation.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <Reveal y={30} className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Sensibilisations passées
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Découvrez l&apos;impact de nos actions sur le terrain. Chaque session est un pas de plus vers une communauté numériquement responsable.
          </p>
        </Reveal>

        <Reveal stagger={0.2} y={60} duration={0.4} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sensibilisation.map((article) => (
            <Link
              key={article._id}
              href={`/sensibilise/${article.slug}`}
              className="group flex flex-col bg-white border border-primary/10 rounded-4xl overflow-hidden hover:shadow-sm transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                {article.mainImageUrl && (
                  <SanityImage
                    src={article.mainImageUrl}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                {article.category && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-white px-3 backdrop-blur-md border-none shadow-sm">
                      {article.category}
                    </Badge>
                  </div>
                )}

                {!!article.photoCount && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                    <Camera size={14} aria-hidden="true" />
                    {article.photoCount} photos
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {article.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" aria-hidden="true" />
                      {article.location}
                    </div>
                  )}
                  {article.date && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" aria-hidden="true" />
                      {formatDate(article.date)}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {article.summary && (
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                )}

                <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-50">
                  <span className="text-sm font-bold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Lire le résumé <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
