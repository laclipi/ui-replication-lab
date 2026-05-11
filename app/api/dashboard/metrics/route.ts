import { getDashboardMetrics } from "@/lib/dashboard/metrics"; // Misma fuente de verdad que usa la page
import { apiSuccess, apiError } from "@/lib/api/responses"; // Helpers de envelope tipado

// GET /api/dashboard/metrics
// --------------------------
// Endpoint REST de las métricas del dashboard.
//
// Tipado:
//   getDashboardMetrics() devuelve DashboardMetrics (validado en boundary
//   con DashboardMetricsSchema). El helper apiSuccess propaga ese tipo a la
//   NextResponse generic → cualquier consumidor en TS puede inferir el shape
//   importando este módulo o directamente DashboardMetrics.
//
// Errores:
//   - 500 con envelope { error: { message, code? } } via apiError().
//   - Distinguimos VALIDATION_FAILED (datos malformados en origen) del genérico
//     INTERNAL_ERROR para que un cliente pueda decidir si reintenta o reporta.

export async function GET() {
  try {
    const metrics = await getDashboardMetrics();
    return apiSuccess(metrics); // 200 OK con el contrato DashboardMetrics
  } catch (error) {
    // Log con todo el detalle en server — el cliente solo ve el envelope limpio
    console.error("[/api/dashboard/metrics]", error);

    // ZodError = el origen devolvió datos que no cumplen el contrato.
    // Lo separamos del resto para facilitar alerting/diagnóstico.
    // Detección estructural (no instanceof) por si llega de otra realm.
    const isZodError = error instanceof Error && error.name === "ZodError";

    if (isZodError) {
      return apiError("Dashboard metrics failed validation at the source.", {
        status: 500,
        code: "VALIDATION_FAILED",
      });
    }

    return apiError("Failed to load dashboard metrics.", {
      status: 500,
      code: "INTERNAL_ERROR",
    });
  }
}
