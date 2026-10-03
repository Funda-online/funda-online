import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { sanityFetch } from "@/sanity/lib/fetch"
import { sensibilisationSlugsQuery } from "@/sanity/queries"

const lastUpdatesQuery = `{
  "events": *[_type in ["event", "pastEvent"]] | order(_updatedAt desc)[0]._updatedAt,
  "sensibilisation": *[_type == "sensibilisation"] | order(_updatedAt desc)[0]._updatedAt
}`

const toDate = (value?: string | null) => (value ? new Date(value) : undefined)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [updates, sessions] = await Promise.all([
      sanityFetch<{ events?: string | null; sensibilisation?: string | null }>({
        query: lastUpdatesQuery,
        tags: ["event", "pastEvent", "sensibilisation"],
      }),
      sanityFetch<{ slug: string; _updatedAt?: string }[]>({
        query: sensibilisationSlugsQuery,
        tags: ["sensibilisation"],
      }),
    ])

    const eventsUpdated = toDate(updates?.events)
    const sensibilisationUpdated = toDate(updates?.sensibilisation)
    const homeUpdated = [eventsUpdated, sensibilisationUpdated]
      .filter((date): date is Date => Boolean(date))
      .sort((a, b) => b.getTime() - a.getTime())[0]

    return [
      { url: SITE_URL, lastModified: homeUpdated, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE_URL}/events`, lastModified: eventsUpdated, changeFrequency: "weekly", priority: 0.9 },
      {
        url: `${SITE_URL}/sensibilise`,
        lastModified: sensibilisationUpdated,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      ...(sessions ?? []).map((session) => ({
        url: `${SITE_URL}/sensibilise/${session.slug}`,
        lastModified: toDate(session._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ]
  } catch {
    return [
      { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE_URL}/events`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${SITE_URL}/sensibilise`, changeFrequency: "weekly", priority: 0.9 },
    ]
  }
}
