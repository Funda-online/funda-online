import { ImageResponse } from "next/og"

export const alt = "Funda Sensibilise — Numérique responsable en RDC"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function SensibiliseOpenGraphImage() {
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
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 8 }}>FUNDA</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
            Funda Sensibilise
          </div>
          <div style={{ fontSize: 28, color: "#d7f4fa", maxWidth: 860, lineHeight: 1.4 }}>
            Sensibilisations gratuites au numérique responsable dans les écoles et communautés de Lubumbashi.
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
