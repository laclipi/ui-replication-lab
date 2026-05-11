import { NextResponse } from "next/server"; // Helper de Next para responder JSON tipado
import { getDashboardMetrics } from "@/lib/dashboard/metrics"; // Misma fuente de verdad que usa la page

// GET /api/dashboard/metrics
// --------------------------
// Endpoint REST de las métricas del dashboard.
// - Delegate a getDashboardMetrics() en lib/dashboard/metrics.ts → un solo lugar para
//   evolucionar la lógica de datos (mock → DB → CRM…).
// - Útil para clientes externos, refetches desde el navegador o demo via curl.
//
// La Server Component de la página NO pasa por aquí: lee directamente del módulo,
// evitando un round-trip HTTP innecesario en cada render.

export async function GET() {
  try {
    const metrics = await getDashboardMetrics();
    return NextResponse.json(metrics); // 200 OK con el contrato DashboardMetrics
  } catch (error) {
    // Logueamos en server para tener trazabilidad; al cliente solo le devolvemos un mensaje genérico
    console.error("[/api/dashboard/metrics]", error);
    return NextResponse.json(
      { error: "Failed to load dashboard metrics" },
      { status: 500 }
    );
  }
}
