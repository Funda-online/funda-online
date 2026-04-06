import { defineType } from "sanity";

export default defineType({
  name: "sensibilisation",
  title: "Sensibilisations Passées",
  type: "document",
  fields: [
    { name: "title", title: "Titre de l'activité", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },

    {
      name: "category",
      title: "Catégorie (Badge)",
      type: "string",
      initialValue: "Éducation",
    },
    { name: "location", title: "Lieu", type: "string" }, 
    { name: "date", title: "Date de l'activité", type: "date" }, 
    { name: "summary", title: "Résumé/Introduction", type: "text" },
    {
      name: "content",
      title: "Contenu complet (Résumé)",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "mainImage",
      title: "Image Principale",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "gallery",
      title: "Galerie d'images",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
});
