"use client"

import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

export default function TopProgressBar() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const tickRef = useRef<number | null>(null)
  const hideRef = useRef<number | null>(null)
  const activeRef = useRef(false)

  const clearTimers = () => {
    if (tickRef.current) window.clearInterval(tickRef.current)
    if (hideRef.current) window.clearTimeout(hideRef.current)
    tickRef.current = null
    hideRef.current = null
  }

  const start = useCallback(() => {
    clearTimers()
    activeRef.current = true
    setVisible(true)
    setProgress(12)
    tickRef.current = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 90) return current
        return current + Math.max(1.2, (90 - current) * 0.12)
      })
    }, 180)
  }, [])

  const finish = useCallback(() => {
    if (!activeRef.current) return
    clearTimers()
    setProgress(100)
    hideRef.current = window.setTimeout(() => {
      setVisible(false)
      setProgress(0)
      activeRef.current = false
    }, 320)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a")
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return

      const href = anchor.getAttribute("href")
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return
      }

      try {
        const url = new URL(href, window.location.href)
        if (url.origin !== window.location.origin) return
        const next = `${url.pathname}${url.search}`
        const current = `${window.location.pathname}${window.location.search}`
        if (next === current) return
        start()
      } catch {
        return
      }
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [start])

  useEffect(() => {
    finish()
  }, [pathname, finish])

  useEffect(() => () => clearTimers(), [])

  return (
    <div
      role="progressbar"
      aria-label="Chargement de la page"
      aria-hidden={!visible}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={visible ? Math.round(progress) : 0}
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]"
    >
      <div
        className="h-full origin-left rounded-r-full transition-[width,opacity] duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          background: "linear-gradient(90deg, #0799ba 0%, #4DCFE0 100%)",
          boxShadow: "0 0 10px rgba(7, 153, 186, 0.7)",
        }}
      />
    </div>
  )
}
