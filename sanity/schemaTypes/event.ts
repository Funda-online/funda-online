import { defineField, defineType } from "sanity"

export default defineType({
  name: "event",
  title: "Événement à Venir",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      description: "L'événement disparaît du site une fois cette date passée.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "En ligne", value: "online" },
          { title: "Présentiel", value: "onsite" },
        ],
        layout: "radio",
      },
      initialValue: "online",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
      description: "Adresse pour un événement en présentiel (ex. « Université de Lubumbashi »).",
      hidden: ({ document }) => document?.format !== "onsite",
    }),
    defineField({
      name: "speaker",
      title: "Intervenant",
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Heure",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "registrationLink",
      title: "Lien d’inscription",
      type: "url",
    }),
  ],
  orderings: [
    { title: "Date", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
})
