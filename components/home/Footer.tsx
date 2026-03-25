"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Facebook, Youtube, Linkedin, Mail, MapPin, Phone, ChevronRight, Send, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"
import { FaWhatsapp } from "react-icons/fa6"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative bg-foreground text-white overflow-hidden"
    >
      {/* Lueur subtile en arrière-plan pour donner de la profondeur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-16 lg:px-20 pt-20 pb-10 relative z-10">
        
        <div className="footer-content grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Colonne 1 : Brand & Vision (5 colonnes) */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/logo/logo-3.png"
                alt="Funda Logo"
                width={56}
                height={56}
                className="brightness-110"
              />
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Funda accompagne la nouvelle génération d'apprenants en RDC. Nous transformons l'accès au numérique en une opportunité d'émancipation grâce à l'auto-apprentissage et au mentorat.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={20} />, href: "https://www.facebook.com/funda.cd" },
                { icon: <FaWhatsapp size={20} />, href: "https://whatsapp.com/channel/..." },
                { icon: <Youtube size={20} />, href: "https://youtube.com/..." },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/..." }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-primary hover:border-primary text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Navigation Rapide (3 colonnes) */}
          <div className="md:col-span-3 space-y-8">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Navigation
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Accueil", href: "/" },
                { label: "Sensibilise 2026", href: "/sensibilise" },
                { label: "Événements", href: "/events/upcoming" },
                { label: "Notre Blog", href: "/blog" },
                { label: "Contact", href: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
                  >
                    <ChevronRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Infos de Contact (4 colonnes) */}
          <div className="md:col-span-4 space-y-8">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Nous trouver
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <MapPin size={18} className="text-primary group-hover:text-white" />
                </div>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-200">
                  15, chaussée de Kasenga, Bel air,<br /> Lubumbashi, Haut-Katanga, RDC
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Mail size={18} className="text-primary group-hover:text-white" />
                </div>
                <a href="mailto:info@funda-online.com" className="text-slate-400 group-hover:text-slate-200 transition-colors">
                  info@funda-online.com
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Phone size={18} className="text-primary group-hover:text-white" />
                </div>
                <a href="tel:+243973900363" className="text-slate-400 group-hover:text-slate-200 transition-colors">
                  +243 973 900 363
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            {/* <Globe size={14} /> */}
            <p>© {new Date().getFullYear()} Funda. Tous droits réservés.</p>
          </div>
          
          <div className="flex gap-8">
            <Link href="/privacy" className="text-xs font-medium text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
              Confidentialite
            </Link>
            <Link href="/terms" className="text-xs font-medium text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
              Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}