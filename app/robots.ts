import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site";

// robots.txt
// ----------
// Genera /robots.txt a partir de este default export.
// Política:
//   - Allow root para que la home y assets públicos se indexen.
//   - Disallow /dashboard/* (área autenticada) y /api/* (no indexable).
//   - Sitemap absoluto para ayudar a Google/Bing a descubrir URLs.
//
// Ojo: aunque (app)/layout.tsx ya tiene robots noindex en metadata, robots.txt
// es la primera defensa — algunos crawlers lo respetan antes de ver el HTML.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Aplica a todos los bots por defecto
      allow: "/", // Indexable: el landing y sus assets
      disallow: [
        "/dashboard", // Área autenticada
        "/api/", // Endpoints REST internos
      ],
    },
    // URL absoluta — los crawlers la necesitan así para resolverla
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
