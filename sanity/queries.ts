import { defineQuery } from 'next-sanity'

const sensibilisationCardFields = `
  _id,
  title,
  "slug": slug.current,
  summary,
  location,
  date,
  category,
  "mainImageUrl": mainImage.asset->url,
  "photoCount": count(gallery)
`

const upcomingEventFields = `
  _id,
  title,
  date,
  time,
  speaker,
  format,
  location,
  registrationLink,
  "imageUrl": image.asset->url
`

export const nextEventQuery = defineQuery(`
  *[_type == "event" && date >= now()] | order(date asc)[0] { ${upcomingEventFields} }
`)

export const upcomingEventsQuery = defineQuery(`
  *[_type == "event" && date >= now()] | order(date asc) { ${upcomingEventFields} }
`)

export const pastEventsQuery = defineQuery(`
  *[_type == "pastEvent"] | order(date desc) {
    _id,
    title,
    description,
    date,
    time,
    speaker,
    category,
    platform,
    replayUrl,
    slidesUrl,
    "imageUrl": image.asset->url
  }
`)

export const latestPastEventsQuery = defineQuery(`
  *[_type == "pastEvent"] | order(date desc)[0...6] {
    _id,
    title,
    replayUrl,
    "imageUrl": image.asset->url
  }
`)

/** Dernière sensibilisation réalisée, ou à défaut la plus récente planifiée. */
export const latestSensibilisationQuery = defineQuery(`
  coalesce(
    *[_type == "sensibilisation" && date <= now()] | order(date desc)[0],
    *[_type == "sensibilisation"] | order(date desc)[0]
  ) { ${sensibilisationCardFields} }
`)

export const allSensibilisationsQuery = defineQuery(`
  *[_type == "sensibilisation" && defined(slug.current)] | order(date desc) { ${sensibilisationCardFields} }
`)

export const relatedSensibilisationsQuery = defineQuery(`
  *[_type == "sensibilisation" && defined(slug.current) && slug.current != $slug]
    | order(date desc)[0...3] { ${sensibilisationCardFields} }
`)

export const sensibilisationBySlugQuery = defineQuery(`
  *[_type == "sensibilisation" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    location,
    date,
    category,
    summary,
    content,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url
  }
`)

export const sensibilisationSlugsQuery = defineQuery(`
  *[_type == "sensibilisation" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`)
