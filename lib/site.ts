export const SITE_NAME = "Funda"
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://funda-online.com"

export const SITE_DESCRIPTION =
  "Funda aide les jeunes de Lubumbashi et de la RDC à apprendre l'informatique : webinaires, événements publics et sensibilisations gratuites dans les écoles et les communautés."

export const SITE_TAGLINE = "La nouvelle façon d'apprendre l'informatique à Lubumbashi"

export const SITE_KEYWORDS = [
  "Funda",
  "informatique",
  "Lubumbashi",
  "RDC",
  "Congo",
  "webinaires",
  "apprentissage",
  "numérique",
  "Funda Sensibilise",
  "intelligence artificielle",
]

export const ORGANIZATION = {
  name: SITE_NAME,
  email: "info@funda-tech.com",
  phone: "+243838865862",
  address: {
    street: "15, chaussée de Kasenga, Bel air",
    city: "Lubumbashi",
    region: "Haut-Katanga",
    country: "CD",
  },
  sameAs: [
    "https://www.facebook.com/funda.cd",
    "https://www.youtube.com/@Fundaonlinecd",
    "https://www.linkedin.com/company/fundacd/",
    "https://whatsapp.com/channel/0029Vaq7xx82Jl8IT3kiwg36",
  ],
}

export const absoluteUrl = (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}
