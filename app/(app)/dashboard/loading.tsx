import { Section } from "@/components/ui/section";

// Dashboard loading skeleton
// --------------------------
// Fallback de Suspense para todo el segmento /dashboard.
// Next lo monta automáticamente envolviendo la page en <Suspense> mientras
// el Server Component resuelve sus datos.
// - Server component (no hace falta cliente).
// - Estructura visual idéntica al estado cargado → evita "layout shift" al hacer swap.
// - aria-busy avisa a tecnologías asistivas que la región está cargando.

// SkeletonBlock
// -------------
// Bloque genérico animado. Se usa para todas las piezas que cambian de tamaño/posición
// según el contenido real (texto, números, etc.). Mantenerlo aquí evita inflar el
// design system con un componente que solo vive en este segmento.
function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      // animate-pulse + bg muted = shimmer accesible y barato
      className={`animate-pulse rounded bg-muted ${className ?? ""}`}
      aria-hidden // El wrapper de arriba ya marca aria-busy; cada bloque no añade info
    />
  );
}

export default function DashboardLoading() {
  return (
    // aria-busy=true → screen readers anuncian "cargando" sin leer cada placeholder
    <div aria-busy="true" aria-live="polite">
      {/* PageHeader skeleton — title + description, mismas alturas que el real */}
      <Section>
        <div className="flex items-start justify-between border-b border-border pb-6">
          <div className="space-y-2">
            <SkeletonBlock className="h-7 w-40" /> {/* simula el <h1> */}
            <SkeletonBlock className="h-4 w-72" /> {/* simula el description */}
          </div>
          <SkeletonBlock className="h-7 w-20" /> {/* simula el botón Export */}
        </div>
      </Section>

      {/* MetricCard grid skeleton — 3 cards con la altura interna real */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Array.from con índice — clave estable suficiente para una lista estática */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 space-y-3"
            >
              <SkeletonBlock className="h-3 w-24" /> {/* title */}
              <SkeletonBlock className="h-7 w-32" /> {/* value */}
              <SkeletonBlock className="h-3 w-16" /> {/* change indicator */}
            </div>
          ))}
        </div>
      </Section>

      {/* Secondary layout — chart + feed placeholders (manteniendo la altura del real) */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonBlock className="h-40 rounded-xl border border-border bg-card" />
          <SkeletonBlock className="h-40 rounded-xl border border-border bg-card" />
        </div>
      </Section>
    </div>
  );
}
