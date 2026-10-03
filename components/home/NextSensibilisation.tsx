import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Reveal from "../motion/Reveal";
import SanityImage from "../SanityImage";
import { formatDate } from "@/lib/date";
import type { SensibilisationCard } from "@/sanity/types";

export default function NextSensibilisation({ data }: { data: SensibilisationCard }) {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Funda sensibilise
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -top-6 -right-6 w-full h-full border border-primary/10 rounded-4xl -z-10 hidden md:block" />

          <Reveal
            y={60}
            className="group relative bg-white border border-primary/10 rounded-4xl overflow-hidden hover:shadow-md transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row items-stretch">
              <div className="relative lg:w-2/5 min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] overflow-hidden bg-muted">
                {data.mainImageUrl && (
                  <SanityImage
                    src={data.mainImageUrl}
                    alt={data.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-8 md:p-12 lg:w-3/5 flex flex-col justify-center space-y-6">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-bold uppercase tracking-widest text-primary">
                  {data.location && (
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin size={18} aria-hidden="true" />
                      </div>
                      <span className="text-muted-foreground">{data.location}</span>
                    </div>
                  )}
                  {data.date && (
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Calendar size={18} aria-hidden="true" />
                      </div>
                      <span className="text-muted-foreground">{formatDate(data.date)}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                  {data.title}
                </h3>

                {data.summary && (
                  <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                    {data.summary}
                  </p>
                )}

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Button asChild className="rounded-full w-44 py-6.5 text-sm font-bold flex items-center gap-3 transition-all">
                    <Link href={`/sensibilise/${data.slug}`}>
                      En savoir plus <ArrowRight size={20} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
