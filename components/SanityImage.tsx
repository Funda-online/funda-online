"use client"

import Image, { type ImageProps } from "next/image"
import { sanityImageLoader } from "@/sanity/lib/image"

/** next/image pour les URL cdn.sanity.io, redimensionnées par le CDN Sanity. */
export default function SanityImage({ alt, ...props }: ImageProps) {
  return <Image loader={sanityImageLoader} alt={alt} {...props} />
}
