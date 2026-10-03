import type { ImageLoader } from 'next/image'

/**
 * Délègue le redimensionnement au CDN Sanity : le navigateur reçoit une image
 * à la bonne largeur, en WebP/AVIF quand il les supporte.
 */
export const sanityImageLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 75))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  return url.toString()
}
