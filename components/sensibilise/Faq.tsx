import { ChevronDown } from "lucide-react"
import { ORGANIZATION } from "@/lib/site"

export const SENSIBILISE_FAQ = [
  {
    question: "Les sensibilisations Funda Sensibilise sont-elles payantes ?",
    answer:
      "Non. Funda Sensibilise est un programme entièrement gratuit, pour les élèves, les étudiants et les communautés.",
  },
  {
    question: "Quels thèmes sont abordés pendant les sensibilisations ?",
    answer:
      "Trois axes : l'intelligence artificielle (comprendre ses usages et ses limites), la cybersécurité (protéger ses données, reconnaître le phishing et la désinformation) et l'auto-apprentissage (se former en ligne et obtenir des certifications).",
  },
  {
    question: "Où ont lieu les sensibilisations ?",
    answer:
      "Dans les écoles, les universités et les communautés de Lubumbashi, en République démocratique du Congo.",
  },
  {
    question: "Comment organiser une sensibilisation dans mon école ou ma communauté ?",
    answer: `Contactez l'équipe Funda par e-mail à ${ORGANIZATION.email} ou par téléphone au +243 83 886 5862.`,
  },
  {
    question: "Comment être informé des prochaines activités Funda ?",
    answer:
      "Rejoignez la chaîne WhatsApp Funda ou suivez Funda sur Facebook, YouTube et LinkedIn : chaque événement et chaque sensibilisation y est annoncé.",
  },
]

export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-4xl">
        <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-foreground mb-10">
          Questions fréquentes
        </h2>

        <div className="space-y-4">
          {SENSIBILISE_FAQ.map(({ question, answer }) => (
            <details
              key={question}
              className="group bg-white rounded-2xl border border-primary/10 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                <h3 className="text-base md:text-lg">{question}</h3>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
