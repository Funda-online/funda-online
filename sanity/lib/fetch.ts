import type { QueryParams } from 'next-sanity'

import { client } from './client'

/** Filet de sécurité si le webhook de revalidation n'est pas configuré. */
const DEFAULT_REVALIDATE = 300

/** Types de documents Sanity, utilisés comme tags de cache (voir app/api/revalidate). */
export type SanityTag = 'event' | 'pastEvent' | 'sensibilisation'

export function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: QueryParams
  tags: SanityTag[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: DEFAULT_REVALIDATE, tags },
  })
}
