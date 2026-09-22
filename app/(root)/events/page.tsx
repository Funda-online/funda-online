import { client } from "@/sanity/lib/client"
import EventsPageClient from "@/components/events/EventsPageClient"

const upcomingQuery = `
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    date,
    time,
    speaker,
    image,
    registrationLink,
    slug
  }
`

const pastEventsQuery = `
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
    resources,
    image {
      asset->{
        url
      }
    }
  }
`

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    client.fetch(upcomingQuery, {}, { cache: "no-store" }),
    client.fetch(pastEventsQuery, {}, { cache: "no-store" }),
  ])

  return <EventsPageClient upcoming={upcoming || []} past={past || []} />
}
