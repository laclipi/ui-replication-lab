"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Section } from "@/components/ui/section";
import { MetricCard } from "@/components/ui/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { PageHeader } from "@/components/ui/page-header";

// MARKETING LAYER (Stripe style sections)
import { HeroStripe } from "@/components/sections/HeroStripe";
import { FeatureStripe } from "@/components/sections/FeatureStripe";
import { DeveloperStripe } from "@/components/sections/DeveloperStripe";

export default function Home() {
  const { data, isLoading, isError } = useDashboardMetrics();

  return (
    <AppShell>
      {/* ========================= */}
      {/* MARKETING LAYER (TOP)     */}
      {/* ========================= */}

      {/* Hero principal tipo Stripe */}
      <HeroStripe />

      {/* Features (beneficios del producto) */}
      <FeatureStripe />

      {/* Developer section (API / confianza técnica) */}
      <DeveloperStripe />

      {/* ========================= */}
      {/* APP LAYER (DASHBOARD)     */}
      {/* ========================= */}

      {/* Header del dashboard */}
      <Section>
        <PageHeader
          title="Dashboard"
          description="Overview of your platform performance"
          actions={
            <button className="px-3 py-1 text-sm rounded-md border border-border hover:bg-muted transition">
              Export
            </button>
          }
        />
      </Section>

      {/* Métricas principales */}
      <Section>
        {isError && <ErrorState message="Failed to load dashboard metrics" />}

        {!isError && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Users metric */}
            <MetricCard
              title="Active Users"
              value={data?.activeUsers?.toString()}
              loading={isLoading}
              variant="default"
            />

            {/* Revenue metric */}
            <MetricCard
              title="Revenue"
              value={data?.revenue ? `$${data.revenue}` : undefined}
              loading={isLoading}
              variant="success"
              change="+12%"
            />

            {/* Conversion metric */}
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

      {/* Secondary dashboard layout */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chart placeholder */}
          <div className="h-40 rounded-xl border border-border bg-card flex items-center justify-center text-sm text-muted-foreground">
            Chart Placeholder
          </div>

          {/* Activity feed placeholder */}
          <div className="h-40 rounded-xl border border-border bg-card flex items-center justify-center text-sm text-muted-foreground">
            Activity Feed
          </div>
        </div>
      </Section>
    </AppShell>
  );
}
