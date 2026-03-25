"use client";

import { CheckCircle2, ClipboardCheck, Users } from "lucide-react";

export default function ModeleIntervention() {
  const responsibilities = {
    funda: [
      "Préparation et fourniture du contenu pédagogique",
      "Animation complète de la session",
      "Supports de présentation et matériel pédagogique",
      "Expertise technique et pédagogique"
    ],
    beneficiaire: [
      "Confirmation officielle de la date",
      "Mise à disposition d'une salle adaptée",
      "Sonorisation fonctionnelle (micro et haut-parleur)",
      "Mobilisation et information des participants"
    ]
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Modèle d'intervention
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Une collaboration claire pour garantir le succès et l'impact de chaque sensibilisation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Funda Side */}
          <div className="bg-primary p-8 md:p-12 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold">Engagement de Funda</h3>
            </div>
            <ul className="space-y-4">
              {responsibilities.funda.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <CheckCircle2 className="mt-1 shrink-0 text-white" size={20} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Beneficiary Side */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground text-primary">Le Bénéficiaire</h3>
            </div>
            <ul className="space-y-4">
              {responsibilities.beneficiaire.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-1 shrink-0 text-primary" size={20} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}