import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Funda",
    short_name: "Funda",
    description:
      "Apprendre l'informatique à Lubumbashi : webinaires, événements et sensibilisations gratuites.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0799ba",
    lang: "fr",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
