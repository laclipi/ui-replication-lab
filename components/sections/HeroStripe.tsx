import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// HeroStripe — pro pass
// =====================
// Antes era una versión "demo" centrada con dos botones nativos. Ahora aplico la
// metodología de replicación pro en 5 pasadas — al final tienes la **misma
// estructura** que un hero de landing SaaS moderna, pero con copy + brand propios.
//
// Pasada 1 · Layout
//   • Container max-w-4xl (más estrecho que el resto del site) → fuerza columnas
//     de texto cortas y legibles incluso con h1 a 72px.
//   • Padding vertical asimétrico (más arriba que abajo) → genera "espacio
//     respirable" arriba del fold, característico de heros pro.
//   • Backdrop decorativo en capa absolute → no afecta el flow ni layout shift.
//
// Pasada 2 · Tipografía
//   • Escala responsive: text-5xl (móvil) → 6xl → 7xl (desktop) para impacto.
//   • tracking-tight + leading-[1.05] → densidad tipográfica SaaS moderna.
//   • text-balance (CSS Text Wrap Balancing) → evita "ríos" y orphans en h1/p.
//
// Pasada 3 · Color & profundidad
//   • hero-grid: patrón sutil de 64px con fade radial (utility en globals.css).
//   • hero-glow: halo arriba que adapta a light/dark vía color-mix(oklch).
//   • Badge variant="muted" con dot pulsante → eyebrow con jerarquía baja
//     pero "vivo".
//
// Pasada 4 · CTAs
//   • Jerarquía clara: 1 primario sólido + 1 ghost (no dos solid → ambiguo).
//   • h-11 (44px) = altura mínima recomendada de touch target (WCAG / Apple HIG).
//   • Layout flex-col en móvil → cada CTA full-width en pantallas pequeñas.
//
// Pasada 5 · Detalles
//   • animate-in fade-in slide-in-from-bottom-2 → entrada sutil al cargar
//     (tw-animate-css). Solo dispara una vez, no requiere JS de scroll.
//   • Meta line al final con datos REALES del repo (sin fake claims).

export function HeroStripe() {
  return (
    // relative + overflow-hidden → contiene el backdrop absoluto dentro de la
    // section incluso si su gradient se sale del viewport en pantallas anchas.
    <section className="relative overflow-hidden">
      {/* Backdrop decorativo
          ----------------
          pointer-events-none → nunca intercepta clicks (importante: los CTAs
          quedan encima de esto).
          -z-10 → detrás del contenido pero dentro del stacking context. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Grid pattern centrada con fade radial */}
        <div className="hero-grid absolute inset-0" />
        {/* Halo brillante en el top — se adapta al theme (light/dark) */}
        <div className="hero-glow absolute inset-x-0 top-0 h-160" />
      </div>

      {/* Wrapper del contenido
          ---------------------
          max-w-4xl → ~896px, sweet spot para heros centrados.
          pt > pb → más espacio arriba (deja entrar el nav sin pegarse al h1).
          La escala de padding crece con el viewport para mantener el ritmo. */}
      <div className="mx-auto max-w-4xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28">
        {/* Animación de entrada — fade + sutil slide hacia arriba.
            duration-700 ≈ 700ms: lento suficiente para notarse, rápido para no molestar. */}
        <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-col items-center gap-8 text-center duration-700">
          {/* Eyebrow Badge con dot "live"
              -----------------------------
              Patrón clásico SaaS: pill + dot animado = "estamos en marcha,
              hay actividad reciente". El dot usa dos capas: una pulsa con
              animate-ping (onda expansiva), otra fija (núcleo). */}
          <Badge variant="muted">
            <span className="relative inline-flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            v0.1 · Production-ready starter
          </Badge>

          {/* Headline principal
              ------------------
              text-balance → CSS text-wrap: balance, equilibra las líneas para
              evitar la última línea suelta de 2 palabras (look amateur).
              leading-[1.05] → casi tan alto como ancho cada renglón; agrupa
              visualmente el h1 como bloque sólido.
              tracking-tight → -0.025em, refuerza la sensación de "peso" denso. */}
          <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Build the future of payments
          </h1>

          {/* Sub-copy
              --------
              max-w-2xl más estrecho que el h1 → contraste de medidas
              (regla de tipografía: cuerpo más estrecho que el título).
              muted-foreground baja el peso visual → la lectura natural sigue
              siendo Badge → h1 → p → CTAs. */}
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance lg:text-xl">
            A unified platform to accept payments, send payouts, and manage
            business revenue at scale.
          </p>

          {/* CTA row
              -------
              flex-col en móvil → cada botón ocupa su línea (más tocable).
              sm:flex-row en tablet+ → vuelven a estar lado a lado.
              gap-3 separación cómoda sin sentirse despegados.
              pt-2 pequeño respiro entre subcopy y CTAs. */}
          <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row">
            {/* Primary CTA
                -----------
                asChild → el Button toma el styling pero el elemento real es
                el <Link>. Así Next.js prefetcha la ruta y mantenemos a11y.
                h-11 px-5 → override deliberado del size="lg" base (h-9). El
                hero merece botones más grandes que el resto del site. */}
            <Button size="lg" asChild className="h-11 px-5 text-sm">
              <Link href="/dashboard">
                Start now
                {/* Icono inline — la regla [&_svg]:size-4 del Button lo dimensiona */}
                <ArrowRight />
              </Link>
            </Button>

            {/* Secondary CTA — ghost para no competir con el primario.
                href="#contact" placeholder hasta que tengamos sección de contacto. */}
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="h-11 px-5 text-sm"
            >
              <a href="#contact">Talk to sales</a>
            </Button>
          </div>

          {/* Meta line
              ---------
              Datos REALES de este repo (no fake claims sobre clientes/usuarios).
              text-xs lo aleja de la jerarquía principal — funciona como
              "footnote" del hero. */}
          <p className="text-muted-foreground pt-8 text-xs">
            Free starter · MIT licensed · Built with Next.js 16 + React 19
          </p>
        </div>
      </div>
    </section>
  );
}
