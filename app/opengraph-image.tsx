import { ImageResponse } from "next/og"

export const alt = "Funda — Apprendre l'informatique à Lubumbashi"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #023642 0%, #046075 55%, #0799ba 100%)",
          color: "white",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "#0799ba",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            fu
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 8 }}>FUNDA</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            La nouvelle façon d’apprendre.
          </div>
          <div style={{ fontSize: 28, color: "#d7f4fa", maxWidth: 820, lineHeight: 1.4 }}>
            Informatique, webinaires et sensibilisations gratuites pour les jeunes de Lubumbashi et de la RDC.
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
