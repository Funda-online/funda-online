"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Parallax({
  children,
  className,
  yPercent = 15,
}: {
  children: React.ReactNode
  className?: string
  yPercent?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(el, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => mm.revert()
  }, [yPercent])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
