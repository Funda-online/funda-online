"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { FaWhatsapp } from "react-icons/fa6"

const links = [
  { label: "Accueil", href: "/" },
  { label: "Événements", href: "/events" },
  { label: "Funda Sensibilise", href: "/sensibilise" },
]

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const update = () => {
      const h = headerRef.current?.getBoundingClientRect().height ?? 0
      setHeaderHeight(Math.round(h))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
      setIsAnimating(true)
    } else {
      document.body.style.overflow = "unset"
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        isScrolled ? "border-b border-primary/10" : "shadow-none"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16 lg:px-20">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src={"/logo/logo-3.png"} alt="Logo Funda" width={48} height={48} />
          <span className="text-xl font-bold tracking-[0.18em] text-foreground">FUNDA</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-1 ml-6 text-base text-gray-700 items-center">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-md ${
                  isActive(pathname, link.href) ? "text-primary font-semibold" : "hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-row items-center gap-0.5">
            <a
              href="https://whatsapp.com/channel/0029Vaq7xx82Jl8IT3kiwg36"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="rounded-full px-1 w-34 md:w-38 md:flex py-7 text-sm font-semibold transition-all"
              >
                <FaWhatsapp size={24} />
                <span>Rejoindre</span>
              </Button>
            </a>

            <div className="flex md:hidden items-center justify-between">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {(isMenuOpen || isAnimating) && (
        <>
          <div
            className={`md:hidden fixed inset-0 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{ zIndex: 30 }}
            onClick={() => setIsMenuOpen(false)}
          />

          <div
            className="md:hidden fixed left-0 right-0 transition-transform duration-300 ease-out"
            style={{
              top: `${headerHeight}px`,
              zIndex: 40,
              transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)",
              maxHeight: `calc(100vh - ${headerHeight}px)`,
            }}
          >
            <div className="bg-background shadow-lg overflow-y-auto">
              <ul className="flex flex-col px-4 py-4 gap-1">
                {links.map((link) => (
                  <li key={link.label} className="w-full">
                    <Link
                      href={link.href}
                      className={`block w-full px-4 py-3 text-lg font-medium rounded-xl transition-colors ${
                        isActive(pathname, link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Navbar
