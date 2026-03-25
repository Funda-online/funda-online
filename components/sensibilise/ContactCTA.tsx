"use client";

import { Mail, Phone, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-4xl bg-foreground text-background rounded-[3rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
        
        {/* Décoration en arrière-plan */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />

        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Prêt à sensibiliser votre <span className="text-primary">communauté ?</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Vous représentez une école, une université ou une organisation ? Contactez-nous pour organiser une session gratuite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto rounded-full px-8 py-7 bg-primary hover:bg-primary/90 text-white font-bold gap-2"
            >
              Organiser une session <ArrowRight size={18} />
            </Button>
            
            <a 
              href="mailto:info@funda-online.com" 
              className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
            >
              <Mail size={18} className="text-primary" />
              info@funda-online.com
            </a>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} /> +243 973 900 363
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare size={16} /> Disponible sur WhatsApp
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}