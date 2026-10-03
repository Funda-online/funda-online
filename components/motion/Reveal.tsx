"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Anime les enfants directs en cascade (délai entre chaque) plutôt que le bloc entier. */
  stagger?: number
  y?: number
  duration?: number
  /** false : joue au chargement (contenu au-dessus de la ligne de flottaison). */
  onScroll?: boolean
}

/**
 * Fait apparaître son contenu. Le HTML est rendu côté serveur et reste visible
 * sans JavaScript ; l'animation est ignorée si l'utilisateur a demandé à
 * réduire les animations.
 */
export default function Reveal({
  children,
  className,
  stagger,
  y = 40,
  duration = 0.8,
  onScroll = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(stagger ? el.children : el, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: onScroll ? { trigger: el, start: "top 85%", once: true } : undefined,
      })
    })

    return () => mm.revert()
  }, [stagger, y, duration, onScroll])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
