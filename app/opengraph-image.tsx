import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/site";

// Default Open Graph image — applied to every route segment that doesn't
// override it. Next la sirve en /opengraph-image y la inyecta automáticamente
// en el <head> de cualquier page bajo este segmento.
//
// Notas técnicas:
//   - ImageResponse usa el runtime edge-rendered. Solo se permiten estilos
//     inline (NO Tailwind). Renderiza un subset de CSS — flex, fonts, colors.
//   - El resultado se cachea estáticamente en build (no hay request-time APIs aquí).
//   - 1200x630 es el tamaño de referencia para Facebook/LinkedIn; Twitter Large Card
//     usa el mismo aspect-ratio.

// Metadata estática que Next inyecta como <meta og:image:*> en el HTML.
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    // Capa raíz del OG. Inline styles only — sin Tailwind aquí.
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        // Fondo negro casi puro con gradiente sutil — feel "Vercel / Stripe template"
        background:
          "radial-gradient(circle at 20% 0%, #1a1a1a 0%, #000000 65%)",
        color: "#ffffff",
        fontFamily: "sans-serif", // ImageResponse usa system fonts si no cargas custom
      }}
    >
      {/* Marca + tagline (top-left) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Brand mark + name fila */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Cuadradito de marca — mismo recurso visual que la nav y el sidebar */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "#ffffff",
            }}
          />
          <span style={{ fontSize: "28px", fontWeight: 600 }}>
            {siteConfig.name}
          </span>
        </div>
      </div>

      {/* Headline (centro-bottom) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1
          style={{
            fontSize: "84px",
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {siteConfig.tagline}
        </h1>
        <p
          style={{
            fontSize: "28px",
            lineHeight: 1.4,
            color: "#9ca3af", // Tailwind gray-400 aprox — bajado a hex porque no hay tw aquí
            maxWidth: "880px",
            margin: 0,
          }}
        >
          {siteConfig.description}
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
