"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Section } from "@/components/ui/section";
import { MetricCard } from "@/components/ui/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { PageHeader } from "@/components/ui/page-header";

export default function Home() {
  const { data, isLoading, isError } = useDashboardMetrics();

  return (
    <AppShell>
      {/* Header */}
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

      {/* Content */}
      <Section>
        {/* Error state */}
        {isError && <ErrorState message="Failed to load dashboard metrics" />}

        {/* Metrics grid */}
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

      {/* Secondary layout (estructura SaaS real) */}
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
    </AppShell>
  );
}
