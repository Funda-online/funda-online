import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Linkedin, Mail, MapPin, Phone, ChevronRight } from "lucide-react";
import Reveal from "../motion/Reveal";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import { ORGANIZATION } from "@/lib/site";

const socials = [
  { icon: <Facebook size={20} />, href: "https://www.facebook.com/funda.cd", label: "Facebook" },
  { icon: <WhatsAppIcon size={20} />, href: "https://whatsapp.com/channel/0029Vaq7xx82Jl8IT3kiwg36", label: "WhatsApp" },
  { icon: <Youtube size={20} />, href: "https://www.youtube.com/@Fundaonlinecd", label: "YouTube" },
  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/fundacd/", label: "LinkedIn" },
];

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Événements", href: "/events" },
  { label: "Funda Sensibilise", href: "/sensibilise" },
];

export default function Footer() {
  return (
    <footer className="relative bg-foreground text-white overflow-hidden">
      {/* Lueur subtile en arrière-plan pour donner de la profondeur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-primary/10 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-16 lg:px-20 pt-20 pb-10 relative z-10">
        <Reveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Colonne 1 : Brand & Vision (5 colonnes) */}
          <div className="md:col-span-5 space-y-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 transition-transform hover:scale-105"
            >
              <Image
                src="/logo/logo-3.png"
                alt="Logo Funda"
                width={56}
                height={56}
                className="brightness-110"
              />
              <span className="text-2xl font-bold tracking-[0.18em] text-white">FUNDA</span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Funda accompagne la nouvelle génération d&apos;apprenants en RDC.
              Nous transformons l&apos;accès au numérique en une opportunité
              d&apos;émancipation grâce à l&apos;auto-apprentissage.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5  border-white/10 hover:bg-primary hover:border-primary text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Navigation Rapide (3 colonnes) */}
          <nav aria-label="Navigation du pied de page" className="md:col-span-3 space-y-8">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Navigation
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Colonne 3 : Nous trouver (4 colonnes) */}
          <div className="md:col-span-4 space-y-8">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Nous trouver
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h3>
            <address className="not-italic space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <MapPin
                    size={18}
                    className="text-primary group-hover:text-white"
                  />
                </div>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-200">
                  {ORGANIZATION.address.street},
                  <br /> {ORGANIZATION.address.city}, {ORGANIZATION.address.region}, RDC
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Mail
                    size={18}
                    className="text-primary group-hover:text-white"
                  />
                </div>
                <a
                  href={`mailto:${ORGANIZATION.email}`}
                  className="text-slate-400 group-hover:text-slate-200 transition-colors"
                >
                  {ORGANIZATION.email}
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Phone
                    size={18}
                    className="text-primary group-hover:text-white"
                  />
                </div>
                <a
                  href={`tel:${ORGANIZATION.phone}`}
                  className="text-slate-400 group-hover:text-slate-200 transition-colors"
                >
                  +243 83 886 5862
                </a>
              </div>
            </address>
          </div>
        </Reveal>

        {/* Divider & Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Funda. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
