"use client";

import { Mail, Phone, MessageSquare, ArrowRight, Send } from "lucide-react";
import { Button } from "../ui/button";

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Cercles décoratifs subtils pour casser la monotonie */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-4 md:px-16 lg:px-20 relative z-10">
        <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-16 shadow-xl shadow-slate-200/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Texte et Argumentaire */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
                <Send size={16} />
                <span>Contactez l'équipe Funda</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Prêt à sensibiliser votre <span className="text-primary underline decoration-primary/20 underline-offset-8">communauté ?</span>
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                Vous représentez une école, une université ou une organisation ? Nous sommes prêts à intervenir gratuitement pour booster la culture numérique de vos membres.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-8 py-7 bg-primary hover:bg-primary/90 text-white font-bold gap-3 text-base shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                >
                  Planifier une session <ArrowRight size={20} />
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
            <div className="bg-slate-50 rounded-[2rem] p-8 space-y-8 border border-slate-100">
              <h3 className="text-xl font-bold text-foreground">Canaux directs</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Téléphone</p>
                    <p className="text-lg font-bold text-foreground">+243 973 900 363</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                    <MessageSquare size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">WhatsApp</p>
                    <p className="text-lg font-bold text-foreground">Disponible pour vos questions</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-muted-foreground italic">
                  * Nous répondons généralement en moins de 24h pour les demandes d'interventions à Lubumbashi et ses environs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}