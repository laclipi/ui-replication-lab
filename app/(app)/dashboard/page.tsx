"use client"; // useDashboardMetrics es un hook de React Query → necesita cliente

import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

// Dashboard — URL: "/dashboard"
// -----------------------------
// Vive dentro del grupo (app); el chrome (sidebar + topbar) lo aporta
// app/(app)/layout.tsx. Aquí solo va el contenido propio de la página.
// Nota: en una iteración siguiente extraemos los hooks a un sub-componente
// cliente para que la page pueda volver a ser server component.

export default function DashboardPage() {
  // React Query maneja loading/error/refetch; la prop `loading` la consumen los MetricCard
  const { data, isLoading, isError } = useDashboardMetrics();

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

      {/* Métricas principales */}
      <Section>
        {/* Error tiene prioridad: si falla, no renderizamos el grid de cards */}
        {isError && <ErrorState message="Failed to load dashboard metrics" />}

        {!isError && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Active Users"
              value={data?.activeUsers?.toString()}
              loading={isLoading}
              variant="default"
            />

            <MetricCard
              title="Revenue"
              value={data?.revenue ? `$${data.revenue}` : undefined}
              loading={isLoading}
              variant="success"
              change="+12%"
            />

            <MetricCard
              title="Conversion"
              value={data?.conversion ? `${data.conversion}%` : undefined}
              loading={isLoading}
              variant="warning"
              change="+0.4%"
            />
          </div>
        )}
      </Section>

      {/* Secondary dashboard layout — placeholders hasta que metamos charts reales */}
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
