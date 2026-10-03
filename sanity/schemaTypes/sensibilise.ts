import { defineField, defineType } from "sanity";

export default defineType({
  name: "sensibilisation",
  title: "Sensibilisations",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre de l'activité",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie (Badge)",
      type: "string",
      initialValue: "Éducation",
    }),
    defineField({ name: "location", title: "Lieu", type: "string" }),
    defineField({
      name: "date",
      title: "Date de l'activité",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Résumé/Introduction",
      type: "text",
      description: "Affiché sur les cartes et utilisé comme description pour Google.",
      validation: (rule) => rule.max(300).warning("Un résumé court (≤ 300 caractères) s'affiche mieux."),
    }),
    defineField({
      name: "content",
      title: "Contenu complet (Résumé)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "mainImage",
      title: "Image Principale",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galerie d'images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
  orderings: [
    { title: "Date (récent d'abord)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
