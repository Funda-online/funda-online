"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { FaWhatsapp } from "react-icons/fa6"
import { TbMenu } from "react-icons/tb"

const links = [
  { label: "Accueil", href: "/" },
  {
    label: "Événements",
    children: [
      { label: "Événements à venir", href: "/events/upcoming" },
      { label: "Événements passés", href: "/events/past" },
    ],
  },
  { label: "Sensibilise", href: "/sensibilise" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(0)

  // ✅ NOUVEAU STATE
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

  // ✅ NOUVEAU EFFECT SCROLL
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
    setOpenDropdown(null)
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
        isScrolled ? "*shadow-sm border-b border-primary/10" : "shadow-none"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16 lg:px-20">
        <Link href="/" className="shrink-0">
          <Image src={"/logo/logo-3.png"} alt="logo" width={48} height={48} />
        </Link>

        <div className="flex items-center gap-6">
          <NavigationMenu className="hidden md:flex gap-6 ml-6 *font-semibold text-base text-gray-700 items-center">
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.label}>
                  {link.children ? (
                    <>
                      <NavigationMenuTrigger
                        className={`px-3 text-[15.5px] ${
                          pathname === link.href ? "text-primary" : "hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-2 bg-white shadow-none">
                        <ul className="flex flex-col gap-2 w-48">
                          {link.children.map((sublink) => (
                            <li key={sublink.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={sublink.href}
                                  className="block px-2 py-2 rounded-md text-base hover:bg-gray-100"
                                >
                                  {sublink.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild className="text-base">
                      <Link
                        href={link.href}
                        className={`px-3 ${
                          pathname === link.href ? "text-primary" : "hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex flex-row items-center gap-0.5">
            <a
              href="https://whatsapp.com/channel/0029Vaq7xx82Jl8IT3kiwg36"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" 
              // className="* *md:flex rounded-full py-[22.5px] text-base font-semibold"
              className="rounded-full px-1 w-34 md:w-38 md:flex py-7 text-sm font-semibold transition-all"
              >
                <FaWhatsapp 
                // className="h-6 w-6 md:h-12 md:w-12" 
                size={24} 
                />
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
            className={`md:hidden fixed left-0 right-0 transition-transform duration-300 ease-out`}
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
                    {link.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenDropdown(openDropdown === link.label ? null : link.label)
                          }
                          className={`w-full flex justify-between items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                            openDropdown === link.label
                              ? "*bg-accent *text-accent-foreground"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {link.label}
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${
                              openDropdown === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === link.label && (
                          <ul className="mx-4 mb-2 flex flex-col gap-1 border-t border-primary/15 pt-3">
                            {link.children.map((sublink) => (
                              <li key={sublink.label}>
                                <Link
                                  href={sublink.href}
                                  className="block px-4 py-2.5 text-base rounded-md font-medium hover:bg-muted transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sublink.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={`block w-full px-4 py-3 text-lg font-medium rounded-xl transition-colors ${
                          pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
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