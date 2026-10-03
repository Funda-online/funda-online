import { BrainCircuit, ShieldCheck, Rocket } from "lucide-react";
import Reveal from "../motion/Reveal";

const axes = [
  {
    title: "Intelligence Artificielle",
    desc: "Démystifier l'IA : comprendre ses fondamentaux, ses applications concrètes et les enjeux éthiques pour ne plus subir mais choisir sa technologie.",
    icon: BrainCircuit,
  },
  {
    title: "Cybersécurité",
    desc: "Protection des données, gestion des mots de passe et réflexes face aux cybermenaces (désinformation, phishing) pour naviguer en toute sérénité.",
    icon: ShieldCheck,
  },
  {
    title: "Auto-apprentissage",
    desc: "Devenir acteur de son futur : exploiter les cours en ligne, obtenir des certifications et maîtriser l'ingénierie de prompt pour optimiser son temps.",
    icon: Rocket,
  },
];

export default function Axes() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="max-w-2xl mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos axes d’intervention
          </h2>
          <p className="text-lg text-muted-foreground">
            Le programme s&apos;articule autour de trois piliers fondamentaux pour une autonomie numérique complète.
          </p>
        </div>

        <Reveal stagger={0.2} duration={0.4} className="grid md:grid-cols-3 gap-8">
          {axes.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="group relative p-8 bg-white rounded-3xl hover:shadow-sm hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-10 h-10" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {desc}
              </p>

              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Icon className="w-10 h-10" aria-hidden="true" />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
