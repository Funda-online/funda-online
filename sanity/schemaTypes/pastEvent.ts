import { defineField, defineType } from "sanity"

export default defineType({
  name: "pastEvent",
  title: "Événement passé",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image (affiche)",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      // Type date pour que le tri soit chronologique. Les anciennes valeurs
      // texte se convertissent avec scripts/migrate-past-event-dates.ts.
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "time",
      title: "Heure",
      type: "string",
    }),
    defineField({
      name: "speaker",
      title: "Intervenant",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Webinaire", value: "Webinaire" },
          { title: "Conférence", value: "Conférence" },
          { title: "Formation", value: "Formation" },
        ],
      },
    }),
    defineField({
      name: "platform",
      title: "Plateforme",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "replayUrl",
      title: "Lien du replay",
      type: "url",
    }),
    defineField({
      name: "slidesUrl",
      title: "Lien des slides (optionnel)",
      type: "url",
    }),
    defineField({
      name: "resources",
      title: "Ressources complémentaires",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  orderings: [
    { title: "Date (récent d'abord)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
})
