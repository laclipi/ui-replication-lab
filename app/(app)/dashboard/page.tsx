import { headers } from "next/headers"; // Request-time API → opta a dynamic rendering (Next 16)
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { getDashboardMetrics } from "@/lib/dashboard/metrics"; // Server-only data layer

// Dashboard — URL: "/dashboard"
// -----------------------------
// Server Component. Lee los datos en el servidor → 0 JS de cliente en el camino crítico.
// Estados de UI manejados por archivos hermanos del segmento:
//   - loading.tsx → Suspense fallback automático mientras esta page resuelve.
//   - error.tsx   → Error boundary si getDashboardMetrics() lanza.
// El componente solo se preocupa del "happy path".
//
// Dynamic rendering:
// En Next 16, `export const dynamic = "force-dynamic"` se reserva al opt-in de Cache
// Components. La forma canónica fuera de ese opt-in es leer una Request-time API
// (headers / cookies / draftMode). Lo hacemos abajo con un único await headers().

// Formateadores
// -------------
// Se construyen una vez por render (no son hooks → vale en RSC).
// Intl.* es la API estándar; respeta el locale del entorno cuando se le pasa explícitamente.
const formatRevenue = (value: number) =>
  // Notación compacta: 12400 → "$12.4K". Bonito para tarjetas KPI.
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value); // 1284 → "1,284"

const formatPercent = (value: number) =>
  `${value.toFixed(1)}%`; // 3.2 → "3.2%"

export default async function DashboardPage() {
  // Forzamos dynamic rendering leyendo headers() del request.
  // El día que la page reciba auth (cookies de sesión / Authorization), este await
  // se sustituirá por la lectura real de la sesión y desaparece el comentario.
  await headers();

  // Await directo en el servidor — Suspense se encarga del loading state vía loading.tsx.
  // Si esto lanza, error.tsx renderiza el fallback del segmento.
  const metrics = await getDashboardMetrics();

  return (
    <>
      {/* Header del dashboard */}
      <Section>
        <PageHeader
          title="Dashboard"
          description="Overview of your platform performance"
          actions={
            <button
              type="button"
              className="px-3 py-1 text-sm rounded-md border border-border hover:bg-muted transition"
            >
              Export
            </button>
          }
        />
      </Section>

      {/* Métricas principales — sin estados de loading: el servidor ya tiene los datos */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Active Users"
            value={formatNumber(metrics.activeUsers)}
            variant="default"
          />

          <MetricCard
            title="Revenue"
            value={formatRevenue(metrics.revenue)}
            variant="success"
            change="+12%"
          />

          <MetricCard
            title="Conversion"
            value={formatPercent(metrics.conversion)}
            variant="warning"
            change="+0.4%"
          />
        </div>
      </Section>

      {/* Secondary layout — placeholders hasta que metamos charts/feed reales */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-40 rounded-xl border border-border bg-card flex items-center justify-center text-sm text-muted-foreground">
            Chart Placeholder
          </div>

          <div className="h-40 rounded-xl border border-border bg-card flex items-center justify-center text-sm text-muted-foreground">
            Activity Feed
          </div>
        </div>
      </Section>
    </>
  );
}
