import Link from "next/link";
import { ArrowRight } from "lucide-react";

// AnnouncementRibbon
// ==================
// El ribbon finito arriba del nav (estilo "Stripe Sessions 2024 →" o
// "Vercel Ship is live →"). Aporta dos cosas:
//
//   1. Sensación de PRODUCTO VIVO — hay novedades, hay roadmap.
//   2. Refuerza el degradado aurora con una línea muy tenue del mismo color
//      → tu cerebro lee top-de-página como una banda diseñada y coherente.
//
// Server component sin estado. Si quisiéramos hacerlo dismissible, lo
// migraríamos a "use client" con localStorage; lo dejamos out-of-scope para
// no introducir client JS solo por un banner.

export function AnnouncementRibbon() {
  return (
    // role="region" + aria-label → da contexto al lector de pantalla.
    // border-b casi invisible para no crear "tres bandas duras" arriba.
    <div
      role="region"
      aria-label="Announcements"
      className="border-border/20 relative z-50 border-b"
    >
      {/* Capa decorativa de tinte
          ------------------------
          Un linear-gradient horizontal con MUY poca opacidad (mismos tonos
          del aurora). Va detrás del texto con -z-10 dentro del ribbon.
          pointer-events-none → nunca intercepta los clics del link. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.78 0.18 220 / 0.12), oklch(0.6 0.24 285 / 0.12) 50%, oklch(0.65 0.25 320 / 0.12))",
        }}
      />

      {/* Contenedor centrado — h-9 (36px) para que sea ribbon, no sub-nav. */}
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-center px-6">
        <Link
          href="/#changelog"
          // group/anuncio → permite mover el icono en hover sin estado JS.
          className="group/announce text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs transition-colors"
        >
          {/* Pildora "New" — etiqueta visual mínima a la izquierda */}
          <span className="bg-foreground/10 text-foreground rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
            New
          </span>

          <span>v0.2 ships next month — Server Components dashboard live</span>

          {/* Flecha que se desplaza ligeramente en hover (típico de Stripe/Vercel) */}
          <ArrowRight
            aria-hidden
            className="size-3 transition-transform group-hover/announce:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
