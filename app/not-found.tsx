import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/home/Navbar"
import Footer from "@/components/home/Footer"

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-24 md:py-32 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Erreur 404</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold text-foreground">Page introuvable</h1>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Cette page n&apos;existe pas ou a été déplacée. Voici où continuer :
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild className="rounded-full py-6 w-52">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full py-6 w-52 border-primary text-primary">
            <Link href="/events">Voir les événements</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full py-6 w-52 border-primary text-primary">
            <Link href="/sensibilise">Funda Sensibilise</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
