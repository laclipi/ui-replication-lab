import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site";

// sitemap.xml
// -----------
// Next genera /sitemap.xml a partir del default export de este módulo.
// Solo listamos URLs **públicas** — el área (app) está bajo noindex y nunca
// debería aparecer aquí (los crawlers lo verán y se confundirán si la indexan).
//
// El día que existan rutas dinámicas (blog, docs, customers/...), se enumeran
// vía `generateSitemaps` o se concatenan al return de abajo.

export default function sitemap(): MetadataRoute.Sitemap {
  // Tiempo del build → "lastModified" estable por release.
  // Cuando aparezca contenido editorial (blog), cada item traerá su propio updatedAt.
  const lastModified = new Date();

  return [
    {
      url: `${siteConfig.url}/`, // Home pública — la única ruta indexable hoy
      lastModified,
      changeFrequency: "monthly", // El landing cambia de vez en cuando, no a diario
      priority: 1, // Página principal → prioridad máxima
    },
  ];
}
