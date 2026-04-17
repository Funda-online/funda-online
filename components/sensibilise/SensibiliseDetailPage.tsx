"use client"

import { useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Share2, 
  ChevronRight, 
  Image as ImageIcon 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortableText } from "next-sanity"

// Le composant reçoit maintenant l'objet "data" de Sanity en tant que prop
export default function SensibilisationDetail({ data }: { data: any }) {
  const router = useRouter()
  const pageRef = useRef(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      
      tl.from(".back-btn", { x: -20, opacity: 0, duration: 0.6 })
        .from(".meta-badge", { y: 10, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".main-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-image", { scale: 1.05, opacity: 0, duration: 1.2 }, "-=0.8")
        .from(".content-section", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    }, pageRef)
    
    return () => ctx.revert()
  }, [])

  // Sécurité : si les données ne sont pas encore chargées
  if (!data) return null;

  return (
    <div ref={pageRef} className="min-h-screen bg-white pb-20">
      
      {/* Section Hero / En-tête */}
      <section className="container mx-auto px-4 md:px-16 lg:px-20 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="meta-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
            {data.category}
          </div>
          
          <h1 className="main-title text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-8">
            {data.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-medium">
            <div className="flex items-center text-sm md:text-base gap-1 md:gap-2">
              <MapPin className="text-primary h-4 w-4 md:h-4.5 md:w-4.5" />
              <span>{data.location}</span>
            </div>
            <div className="flex items-center text-sm md:text-base gap-1 md:gap-2">
              <Calendar className="text-primary h-4 w-4 md:h-4.5 md:w-4.5" />
              <span>{new Date(data.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Image Principale */}
        <div className="hero-image relative aspect-[21/9] w-full md:rounded-3xl  overflow-hidden mb-12 md:mb-20">
          <Image 
            src={data.mainImage} 
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Contenu et Galerie */}
      <section className="content-section container mx-auto px-4 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Colonne de gauche : Corps de l'article */}
            <div className="lg:col-span-8 space-y-8">
              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                <p className="text-xl font-medium text-slate-900 mb-8">
                  {data.summary}
                </p>
                {/* Contenu riche provenant de Sanity */}
                {/* <div dangerouslySetInnerHTML={{ __html: data.content }} className="space-y-6" /> */}
                <PortableText value={data.content} />
              </div>

              {/* Galerie d'images */}
              {data.gallery && data.gallery.length > 0 && (
                <div className="pt-12">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <ImageIcon className="text-primary" />
                      Moments forts
                    </h3>
                    <span className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      {data.gallery.length} photos
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {data.gallery.map((img: string, index: number) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer">
                        <Image 
                          src={img} 
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Colonne de droite : Sidebar infos / Partage */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-lg mb-4">Partager l'impact</h4>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share2 size={18} />
                    </Button>
                    <Button className="flex-1 rounded-full text-sm font-bold">
                      Nous rejoindre
                    </Button>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-primary text-white">
                  <h4 className="font-bold text-lg mb-2">Accueillir Funda ?</h4>
                  <p className="text-primary-foreground/80 text-sm mb-6">
                    Vous souhaitez organiser une session de sensibilisation dans votre établissement ?
                  </p>
                  <Link href="/contact">
                    <Button variant="secondary" className="w-full rounded-full text-sm font-bold flex gap-2">
                      Faire une demande <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}