"use client";

import { Mail, Phone, MessageSquare, ArrowRight, Send, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Cercles décoratifs subtils pour casser la monotonie */}
      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48" /> */}

      <div className="container mx-auto px-4 md:px-16 lg:px-20 relative z-10">
        <div className="">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte et Argumentaire */}
            <div className="space-y-6 text-left">
              <div
                //   className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary/10 text-primary *border border-primary/20 text-sm font-medium"
              >
                <Send size={14} />
                <span>Contactez l'équipe Funda</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Prêt à sensibiliser votre{" "}
                <span className="text-primary ">
                  communauté ?
                </span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                Vous représentez une école, une université ou une organisation ?
                Nous sommes prêts à intervenir gratuitement pour booster la
                culture numérique de vos membres.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button
                  size="lg"
                //   className="w-full sm:w-auto rounded-full px-12 py-7 bg-primary hover:bg-primary/90 text-white font-bold gap-3 text-sm shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                className="rounded-full px-20 w-full sm:w-auto py-7 text-sm font-semibold transition-all"
                >
                  <span>Planifier une session</span>
                   <ChevronRight size={20} />
                </Button>

                <a
                  href="mailto:info@funda-online.com"
                  className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors px-4 py-2"
                >
                  <Mail size={18} className="text-primary" />
                  info@funda-online.com
                </a>
              </div>
            </div>

            {/* Accès Direct & Localisation */}
            <div className="bg-white rounded-4xl p-8 space-y-8 border border-primary/10 *shadow-sm">
              <h3 className="text-xl font-bold text-foreground">
                Canaux directs
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] text-muted-foreground font-medium uppercase tracking-wider">
                      Téléphone
                    </p>
                    <p className="text-base font-bold text-foreground">
                      +243 973 900 363
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] text-muted-foreground font-medium uppercase tracking-wider">
                      WhatsApp
                    </p>
                    <p className="text-base font-bold text-foreground">
                      Disponible pour vos questions
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-muted-foreground italic">
                  Nous répondons généralement en moins de 24h pour les
                  demandes d'interventions à Lubumbashi et ses environs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
