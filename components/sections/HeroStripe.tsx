import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroCodePreview } from "@/components/sections/HeroCodePreview";

// HeroStripe — v2 (Stripe-inspired)
// =================================
// El "no veo demasiado cambio" de v1 venía de que aplicaba convenciones SaaS
// genéricas (Linear/Vercel). Esta v2 va a por los movimientos firma de
// stripe.com — los que hacen que tu cerebro diga "esto es como Stripe":
//
//   1. Aurora gradient — degradado iridiscente multicolor de fondo (cian →
//      violeta → magenta → ámbar) en su capa absoluta detrás del contenido.
//   2. Corte diagonal — clip-path al pie del backdrop, la firma de Stripe.
//   3. Composición a 2 columnas — texto izquierda, panel de código derecha,
//      en lugar del clásico hero centrado.
//   4. Headline left-aligned en desktop — más editorial, menos "marketing".
//   5. Glass cards a la derecha — el `code-window` utility hace backdrop-blur
//      sobre el aurora → efecto premium reconocible.
//
// Mobile-first: en pantallas chicas el código se oculta (hidden lg:block) y el
// texto vuelve a estar centrado. Esto es exactamente lo que hace Stripe.

export function HeroStripe() {
  return (
    // isolate crea stacking context propio → las z-index del code preview y
    // el backdrop solo compiten DENTRO de este section, nunca contra el nav.
    <section className="relative isolate overflow-hidden">
      {/* Backdrop decorativo ------------------------------------------------
          - pointer-events-none + -z-10 → detrás de todo, no intercepta clics.
          - hero-slant aplicado SOLO aquí → el degradado se corta en diagonal
            pero el contenido sigue plano (sin perder CTAs). */}
      <div className="hero-slant pointer-events-none absolute inset-0 -z-10">
        {/* Aurora — la capa de color iridiscente */}
        <div className="hero-aurora absolute inset-0" />
        {/* Grid sutil ENCIMA del aurora con opacity baja → añade textura
            sin tapar el color. */}
        <div className="hero-grid absolute inset-0 opacity-40" />
      </div>

      {/* Container ----------------------------------------------------------
          max-w-7xl porque ahora tenemos dos columnas (vs el max-w-4xl
          centrado de v1). py grande arriba, padding-bottom mayor abajo para
          dejar respirar el corte diagonal del backdrop. */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 sm:pt-28 sm:pb-40 lg:pt-32 lg:pb-48">
        {/* Grid 12-col → más control fino de cómo se reparte el espacio.
            En lg+: text 6/12, code 6/12, vertical-centrados.
            En < lg: una sola columna, el code preview se oculta. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* COL IZQUIERDA — Texto + CTAs --------------------------------- */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 lg:col-span-6">
            <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">
              {/* Eyebrow badge con dot live (idéntico a v1, ya funcionaba) */}
              <Badge variant="muted">
                <span className="relative inline-flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                v0.1 · Production-ready starter
              </Badge>

              {/* Headline
                  --------
                  text-balance equilibra a 2 líneas casi siempre.
                  En lg pasa a left-aligned con max-w-xl para forzar wrap natural
                  → look editorial. Mantengo leading-[1.05] denso.

                  "payments" va con .gradient-text-aurora → la palabra clave del
                  brand se pinta con el mismo degradado del backdrop. Truco
                  pequeño, impacto enorme: el ojo te lleva directo a esa palabra
                  y a la vez "ata" el headline al fondo. */}
              <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:max-w-xl lg:text-7xl">
                Build the future of{" "}
                <span className="gradient-text-aurora">payments</span>
              </h1>

              {/* Sub-copy — más estrecho que el h1 para crear contraste. */}
              <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-balance lg:text-xl">
                A unified platform to accept payments, send payouts, and manage
                business revenue at scale.
              </p>

              {/* CTAs — columna en móvil, fila en sm+. h-11 para touch target. */}
              <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
                <Button size="lg" asChild className="h-11 px-5 text-sm">
                  <Link href="/dashboard">
                    Start now
                    <ArrowRight />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="h-11 px-5 text-sm"
                >
                  <a href="#contact">Talk to sales</a>
                </Button>
              </div>

              {/* Meta line — datos REALES del repo (sin fake claims). */}
              <p className="text-muted-foreground pt-4 text-xs">
                Free starter · MIT licensed · Built with Next.js 16 + React 19
              </p>
            </div>
          </div>

          {/* COL DERECHA — Code preview ------------------------------------
              hidden lg:block → en móvil/tablet desaparece (mejor que apilarlo
              y romper el flow del hero). delay-200 → entra DESPUÉS del texto,
              guía la lectura: primero te lo explican, luego ves el código. */}
          <div className="animate-in fade-in slide-in-from-right-4 hidden delay-200 duration-700 lg:col-span-6 lg:block">
            <HeroCodePreview />
          </div>
        </div>
      </div>
    </section>
  );
}
