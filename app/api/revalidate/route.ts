import { revalidateTag } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"
import { parseBody } from "next-sanity/webhook"

/**
 * Webhook Sanity : invalide le cache des pages qui affichent le type de
 * document modifié. Configuration dans le README.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return new NextResponse("SANITY_REVALIDATE_SECRET manquant", { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret)

    if (!isValidSignature) {
      return new NextResponse("Signature invalide", { status: 401 })
    }
    if (!body?._type) {
      return new NextResponse("Corps de requête invalide", { status: 400 })
    }

    revalidateTag(body._type)
    return NextResponse.json({ revalidated: true, tag: body._type })
  } catch (error) {
    console.error("Erreur de revalidation", error)
    return new NextResponse("Erreur interne", { status: 500 })
  }
}
