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

// Données fictives (Mock Data) basées sur ton schéma
const MOCK_DATA = {
  id: "1",
  title: "Sensibilisation à l'IA et aux métiers du futur",
  category: "Éducation",
  location: "Lubumbashi, UNILU",
  date: "10 Février 2026",
  summary: "Une session immersive pour démystifier l'IA auprès des étudiants de l'UNILU, abordant les opportunités locales et l'éthique numérique.",
  content: `
    <p>Le 10 février 2026, l'équipe de Funda s'est rendue à l'Université de Lubumbashi pour une session de sensibilisation inédite. Devant un amphithéâtre complet, nous avons exploré comment l'intelligence artificielle transforme déjà le marché du travail en République Démocratique du Congo.</p>
    <p>Les échanges ont porté sur l'importance de l'ingénierie de prompt, l'utilisation responsable des outils comme ChatGPT et Claude, ainsi que la protection des données personnelles dans un monde de plus en plus automatisé.</p>
    <p>Cette intervention marque le début d'une série de conférences visant à préparer la jeunesse congolaise aux défis technologiques de demain, en mettant l'accent sur l'auto-apprentissage et la curiosité intellectuelle.</p>
  `,
  mainImage: "/img/1.webp",
  gallery: [
    "/img/1.webp",
    "/img/1.webp",
    "/img/1.webp",
    "/img/1.webp",
  ]
}

export default function SensibilisationDetail() {
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

  return (
    <div ref={pageRef} className="min-h-screen bg-white pb-20">
      
      {/* Section Hero / En-tête */}
      <section className="container mx-auto px-4 md:px-16 lg:px-20 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="meta-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
            {MOCK_DATA.category}
          </div>
          
          <h1 className="main-title text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-8">
            {MOCK_DATA.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <span>{MOCK_DATA.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <span>{MOCK_DATA.date}</span>
            </div>
          </div>
        </div>

        {/* Image Principale */}
        <div className="hero-image relative aspect-[21/9] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl mb-20 border-4 border-white">
          <Image 
            src={MOCK_DATA.mainImage} 
            alt={MOCK_DATA.title}
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
                  {MOCK_DATA.summary}
                </p>
                {/* Simulation de contenu riche provenant de Sanity */}
                <div dangerouslySetInnerHTML={{ __html: MOCK_DATA.content }} className="space-y-6" />
              </div>

              {/* Galerie d'images */}
              <div className="pt-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <ImageIcon className="text-primary" />
                    Moments forts
                  </h3>
                  <span className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {MOCK_DATA.gallery.length} photos
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {MOCK_DATA.gallery.map((img, index) => (
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
            </div>

            {/* Colonne de droite : Sidebar infos / Partage */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-lg mb-4">Partager l'impact</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share2 size={18} />
                    </Button>
                    <Button className="flex-1 rounded-full font-bold">
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
                    <Button variant="secondary" className="w-full rounded-full font-bold flex gap-2">
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