"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, BookOpen, Code, Image, Calendar, User, Clock, Link, FileText, Video, Download } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Docs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState('introduction')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    })

    tl.fromTo(".doc-section", {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    })

    return () => { tl.kill() }
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent -z-10"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          {/* <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/25 rounded-full px-5 py-2.5 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Documentation</span>
          </div> */}
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Documentation
          </h1>
          
          <p className="md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Documentation complète pour la gestion des événements, articles et ressources Funda avec Sanity CMS
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="relative *py-12 md:py-20 border">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-6xl">

          
        </div>
      </section>
    </div>
  )
}

export default Docs