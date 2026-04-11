"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Calendar, Clock, Code, Shield, User } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { urlFor } from "../../sanity/lib/image"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// const articles = [
//   {
//     id: 1,
//     title: "Introduction au développement web moderne",
//     excerpt: "Découvrez les fondamentaux du développement web avec les dernières technologies et meilleures pratiques.",
//     image: "/img/6.jpeg",
//     category: "Développement",
//     author: "Dr. Sarah Tech",
//     date: "15 Jan 2025",
//     readTime: "5 min",
//     tags: ["HTML", "CSS", "JavaScript"]
//   },
//   {
//     id: 2,
//     title: "Python pour la data science : par où commencer ?",
//     excerpt: "Un guide complet pour débuter en data science avec Python et ses bibliothèques essentielles.",
//     image: "/img/8.jpeg",
//     category: "Data Science",
//     author: "Prof. Data Analyst",
//     date: "12 Jan 2025",
//     readTime: "8 min",
//     tags: ["Python", "Pandas", "NumPy"]
//   },
//   {
//     id: 3,
//     title: "Python pour la data science : par où commencer ?",
//     excerpt: "Un guide complet pour débuter en data science avec Python et ses bibliothèques essentielles.",
//     image: "/img/5.jpeg",
//     category: "Data Science",
//     author: "Prof. Data Analyst",
//     date: "12 Jan 2025",
//     readTime: "8 min",
//     tags: ["Python", "Pandas", "NumPy"]
//   },
// ]

export default function ArticlesGrid({ articles }: { articles: any }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    })

    tl.from(sectionRef.current?.querySelector("h2")!, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(sectionRef.current?.querySelector("p")!, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(cardsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.2)"
      }, "-=0.3")

    // Animation au survol des cartes
    cardsRef.current.forEach(card => {
      gsap.to(card, {
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      })
    })

    return () => {
      tl.kill();
    };
  }, [])

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 *px-6 overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-[var(--muted)] -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="block mb-2" style={{ color: "var(--foreground)" }}>Explorez nos</span>
            <span
              className="relative inline-block uppercase"
              style={{ color: "var(--primary)" }}
            >
              Événements & Articles
            </span>
          </h2>
          <p
            className="text-base md:text-lg"
            style={{ color: "var(--muted-foreground)" }}
          >
            Découvrez nos dernières publications et ressources pour développer vos compétences en informatique.
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid-container grid md:grid-cols-3 gap-8">
          {articles.slice(-3).map((article: any, index: any) => (
            <article 
              key={index} 
              className="blog-card group flex flex-col h-full"
              ref={(el: HTMLDivElement | null) => { if (el) cardsRef.current[index] = el; }}
            >
              <div className="relative bg-white border border-primary/10 rounded-4xl overflow-hidden transition-all duration-500 flex flex-col h-full">
                
                {/* Image avec Overlay & Badge */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={urlFor(article.image).width(600).height(400).url()}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary text-white shadow-lg">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-8 flex-1 flex flex-col">
                  {/* Métadonnées style "Funda" */}
                  <div className="flex items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-widest text-primary mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(article.date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${article.slug.current}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground text-base mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Footer de la card */}
                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <Link
                      href={`/blog/${article.slug.current}`}
                      className="flex items-center gap-2 text-primary font-bold text-sm group/link"
                    >
                      <span>Lire la suite</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                    
                    {/* Petits tags discrets */}
                    <div className="flex gap-2">
                       {article.tags?.slice(0, 1).map((tag: string, i: number) => (
                         <span key={i} className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-md">#{tag}</span>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bouton Voir tout harmonisé avec tes boutons Mission/Sensibilisation */}
        <div className="text-center mt-16">
          <Link href="/blog">
            <Button
              variant="outline"
              className="rounded-full w-60 py-7 text-sm font-bold border-primary bg-transparent text-primary hover:bg-accent/10 hover:text-primary transition-all shadow-sm"
            >
              <span>Voir tous les articles</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}