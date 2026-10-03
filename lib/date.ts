const TIME_ZONE = "Africa/Lubumbashi"

const MONTHS_FR = [
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "decembre",
]

const stripAccents = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "")

/**
 * Convertit une date Sanity en `Date`.
 * Accepte : "2026-04-06" (type date), un datetime ISO, et les anciens formats
 * saisis à la main "21/03/2026" ou "28 Février 2026".
 * Les dates sans heure sont placées à midi UTC pour ne jamais changer de jour.
 */
export function parseSanityDate(value?: string | null): Date | null {
  if (!value) return null
  const trimmed = value.trim()

  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (iso) return new Date(Date.UTC(+iso[1], +iso[2] - 1, +iso[3], 12))

  const slashed = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (slashed) return new Date(Date.UTC(+slashed[3], +slashed[2] - 1, +slashed[1], 12))

  const written = stripAccents(trimmed.toLowerCase()).match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/)
  if (written) {
    const month = MONTHS_FR.indexOf(written[2])
    if (month >= 0) return new Date(Date.UTC(+written[3], month, +written[1], 12))
  }

  const parsed = new Date(trimmed)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

/** « 6 avril 2026 », ou la valeur brute si elle n'est pas reconnue. */
export function formatDate(value?: string | null): string {
  const date = parseSanityDate(value)
  if (!date) return value ?? ""
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  })
}

export function dateParts(value?: string | null) {
  const date = parseSanityDate(value)
  if (!date) return null
  const part = (options: Intl.DateTimeFormatOptions) =>
    date.toLocaleString("fr-FR", { ...options, timeZone: TIME_ZONE })
  return {
    day: part({ day: "numeric" }),
    month: part({ month: "long" }),
    year: part({ year: "numeric" }),
  }
}

/** Date ISO (AAAA-MM-JJ) pour les données structurées, ou undefined. */
export function toIsoDate(value?: string | null): string | undefined {
  return parseSanityDate(value)?.toISOString().slice(0, 10)
}
