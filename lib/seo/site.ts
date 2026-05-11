// Site SEO config
// ---------------
// Single source of truth for the site's identity used by metadata,
// sitemap, robots, OG/Twitter images, and structured data.
// Cambiar aquí → se propaga a todos los <head> de la app.

// Site URL
// --------
// En prod: leer de NEXT_PUBLIC_SITE_URL (ver .env.example). Sin esa env el
// build sigue funcionando pero los OG/Twitter previews verán "localhost:3000".
// Forzar a empezar con http(s) y no terminar con slash → URLs absolutas limpias.
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // Fallback dev-friendly: si nadie configuró la env, no rompemos el build.
  if (!raw) return "http://localhost:3000";

  // Normalizamos: sin trailing slash y forzando esquema completo.
  return raw.replace(/\/+$/, "");
}

export const siteConfig = {
  // Nombre comercial del proyecto. Aparece en title, OG, etc.
  name: "UI Replication Lab",

  // Eslogan corto. Lo usa el title default y la home OG.
  tagline: "Build the future of payments",

  // Descripción larga, ~160 chars (sweet spot para meta description / og:description).
  description:
    "Frontend lab for replicating real SaaS UI tickets. A unified platform demo built on Next.js 16, Server Components, and a typed API contract.",

  // URL canónica del sitio. Sin trailing slash para evitar dobles barras al concatenar.
  url: resolveSiteUrl(),

  // Handle de redes — opcionales pero útiles para twitter:creator etc.
  // Vacíos por ahora; rellenar cuando exista cuenta real.
  twitter: {
    handle: "", // ej. "@uilab" → habilita twitter:site/creator
  },

  // Locale por defecto. Usado por og:locale y <html lang="...">.
  locale: "en_US",
} as const;

export type SiteConfig = typeof siteConfig;
