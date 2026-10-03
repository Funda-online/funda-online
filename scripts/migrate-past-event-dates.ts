/**
 * Convertit le champ `date` des événements passés (texte libre : "21/03/2026",
 * "28 Février 2026") au format date Sanity "AAAA-MM-JJ".
 *
 * Aperçu (aucune écriture) :
 *   npx sanity exec scripts/migrate-past-event-dates.ts --with-user-token
 * Application :
 *   npx sanity exec scripts/migrate-past-event-dates.ts --with-user-token -- --apply
 */
import { getCliClient } from "sanity/cli"

import { parseSanityDate } from "../lib/date"

const apply = process.argv.includes("--apply")
const client = getCliClient({ apiVersion: "2025-09-06" }).withConfig({ perspective: "raw" })

async function run() {
  const docs: { _id: string; title?: string; date?: string }[] = await client.fetch(
    `*[_type == "pastEvent" && defined(date)]{ _id, title, date }`
  )

  const tx = client.transaction()
  let changes = 0

  for (const doc of docs) {
    if (!doc.date || /^\d{4}-\d{2}-\d{2}$/.test(doc.date)) continue

    const parsed = parseSanityDate(doc.date)
    if (!parsed) {
      console.warn(`⚠ Non reconnue, à corriger à la main : "${doc.date}" (${doc.title ?? doc._id})`)
      continue
    }

    const iso = parsed.toISOString().slice(0, 10)
    console.log(`${doc.date.padEnd(20)} → ${iso}   ${doc.title?.trim() ?? doc._id}`)
    tx.patch(doc._id, (patch) => patch.set({ date: iso }))
    changes++
  }

  if (changes === 0) {
    console.log("Rien à migrer.")
    return
  }
  if (!apply) {
    console.log(`\n${changes} document(s) à migrer. Relancez avec "-- --apply" pour enregistrer.`)
    return
  }

  await tx.commit()
  console.log(`\n✓ ${changes} document(s) migré(s).`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
