export default {
  name: 'sensibilisation',
  title: 'Sensibilisations Passées',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titre de l\'activité', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    // AJOUT : Le badge (ex: Éducation)
    { name: 'category', title: 'Catégorie (Badge)', type: 'string', initialValue: 'Éducation' },
    { name: 'location', title: 'Lieu', type: 'string' }, // ex: LUBUMBASHI [cite: 8]
    { name: 'date', title: 'Date de l\'activité', type: 'date' }, // ex: 10 FÉVRIER 2026 [cite: 51]
    { name: 'summary', title: 'Résumé/Introduction', type: 'text' },
    { name: 'content', title: 'Contenu complet (Résumé)', type: 'array', of: [{type: 'block'}] },
    { name: 'mainImage', title: 'Image Principale', type: 'image', options: { hotspot: true } },
    {
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [{ type: 'image' }]
    }
  ]
}