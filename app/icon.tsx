import { ImageResponse } from "next/og";

// Dynamic favicon — Next genera /icon.png a partir de este default export
// y añade el <link rel="icon" ...> automáticamente al <head>.
// Sin imágenes binarias en el repo: el icono se renderiza al build.

// 32x32 es el tamaño canónico de favicon (Chrome/Firefox/Edge lo prefieren).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    // Letterform "UL" sobre fondo negro — versión chiquita del brand mark del OG.
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        color: "#ffffff",
        fontSize: 18, // El mejor compromiso para que "UL" entre en 32x32 con padding visual
        fontWeight: 700,
        letterSpacing: "-0.5px",
        borderRadius: 6, // Esquinas suaves — Chrome respeta el shape al renderizar el icon
      }}
    >
      UL
    </div>,
    { ...size },
  );
}
