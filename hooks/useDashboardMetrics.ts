"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

// useDashboardMetrics
// -------------------
// Hook de datos del dashboard con manejo completo de estados
// (loading, error, success)

type Metrics = {
  activeUsers: number;
  revenue: number;
  conversion: number;
};

export function useDashboardMetrics() {
  return useQuery<Metrics>({
    queryKey: ["dashboard-metrics"],
    queryFn: () => fetcher("/api/dashboard/metrics"),

    // UI-friendly config
    staleTime: 60 * 1000,
    retry: 1,
  });
}