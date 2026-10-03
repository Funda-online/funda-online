import type { PortableTextBlock } from 'next-sanity'

/** Formes des résultats renvoyés par les requêtes de sanity/queries.ts. */

export type UpcomingEvent = {
  _id: string
  title: string
  date: string
  time?: string | null
  speaker?: string | null
  format?: 'online' | 'onsite' | null
  location?: string | null
  registrationLink?: string | null
  imageUrl?: string | null
}

export type PastEvent = {
  _id: string
  title: string
  description?: string | null
  date?: string | null
  time?: string | null
  speaker?: string | null
  category?: string | null
  platform?: 'facebook' | 'youtube' | null
  replayUrl?: string | null
  slidesUrl?: string | null
  imageUrl?: string | null
}

export type PastEventSlide = Pick<PastEvent, '_id' | 'title' | 'replayUrl' | 'imageUrl'>

export type SensibilisationCard = {
  _id: string
  title: string
  slug: string
  summary?: string | null
  location?: string | null
  date?: string | null
  category?: string | null
  mainImageUrl?: string | null
  photoCount?: number | null
}

export type SensibilisationDetail = {
  _id: string
  _updatedAt?: string
  title: string
  slug: string
  location?: string | null
  date?: string | null
  category?: string | null
  summary?: string | null
  content?: PortableTextBlock[] | null
  mainImage?: string | null
  gallery?: (string | null)[] | null
}
