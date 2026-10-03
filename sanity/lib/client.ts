import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Les pages sont mises en cache par Next (ISR) et invalidées par webhook :
  // on interroge l'API directement pour toujours régénérer avec le contenu publié.
  useCdn: false,
  perspective: 'published',
})
