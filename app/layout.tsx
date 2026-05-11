import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { siteConfig } from "@/lib/seo/site";

// Geist Sans — fuente principal del UI
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Mono — fuente para código (snippets en marketing, etc.)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root metadata
// -------------
// Lo que se aplica globalmente al <head>. Cada layout/page anidado puede
// sobrescribir campos puntuales sin tocar los demás (Metadata API hace deep-merge
// para algunos campos como `title.template` y replace para otros).
//
// metadataBase es CRÍTICO: convierte cualquier path relativo en metadata
// (`/opengraph-image`, `/icon`) en URL absoluta. Sin esto los crawlers reciben
// rutas tipo "/opengraph-image" sin host y fallan al fetch.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  // Title template: la home usa `default`; child pages pasan su title y
  // se concatena con el template (ej. "Dashboard — UI Replication Lab").
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },

  description: siteConfig.description,

  // Aplicaciones default: la marca + descripción usadas al compartir el link.
  // Las rutas /opengraph-image y /twitter-image generan las imágenes automáticamente
  // gracias a app/opengraph-image.tsx y app/twitter-image.tsx.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: siteConfig.locale,
  },

  twitter: {
    card: "summary_large_image", // Versión grande del card — combina con OG image 1200x630
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    // creator/site solo se incluyen si hay handle configurado en siteConfig.
    // Ternario (no &&) para que TS infiera siempre un objeto spreable.
    ...(siteConfig.twitter.handle
      ? {
          creator: siteConfig.twitter.handle,
          site: siteConfig.twitter.handle,
        }
      : {}),
  },

  // Robots default a indexable. (app)/layout.tsx lo sobrescribe a noindex para
  // todo el grupo autenticado (ya estaba puesto en Phase 1).
  robots: {
    index: true,
    follow: true,
  },
};

// RootLayout
// ----------
// Layout global de la app. Conecta fonts globales y providers.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
