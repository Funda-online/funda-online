export default function JsonLd({ data }: { data: unknown }) {
  // Échappe "<" : un titre saisi dans Sanity contenant "</script>" ne doit pas
  // pouvoir fermer la balise et injecter du HTML.
  const json = JSON.stringify(data).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
