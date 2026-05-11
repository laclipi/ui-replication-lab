// Dashboard data layer
// --------------------
// Una sola fuente de verdad para las métricas del dashboard:
// - El Server Component de la page la consume directamente (sin roundtrip HTTP).
// - El Route Handler (/api/dashboard/metrics) la consume para servir a clientes
//   externos o a futuras fetches desde el navegador.
// El día que aparezca una BBDD/CRM real, solo se cambia esta función.

import "server-only"; // Guardia: importar este módulo desde un Client Component fallará en build

// Tipo público del módulo.
// Lo exportamos para que cualquier consumidor (cliente o servidor) pueda
// referenciar el contrato exacto sin volver a declararlo.
export type DashboardMetrics = {
  activeUsers: number; // Usuarios activos en la ventana actual
  revenue: number; // Ingresos del periodo (en USD, sin formato)
  conversion: number; // Tasa de conversión en porcentaje (0-100)
  updatedAt: string; // ISO timestamp — fija el "as-of" de la métrica
};

// Pequeño helper para simular latencia de I/O sin meter dependencias.
// Cuando se conecte una BBDD/HTTP real, esto desaparece.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// getDashboardMetrics
// -------------------
// Carga las métricas del dashboard.
// Pensado para correr en server (Server Component o Route Handler).
// - Devuelve siempre un objeto del tipo DashboardMetrics.
// - Lanza si el origen de datos falla → el error.tsx del segmento lo captura.
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  // Simulación de latencia para que el loading.tsx (Suspense fallback)
  // sea visible al desarrollar y al hacer demo. En real, esto será await db.query(...).
  await sleep(600);

  // Mock data — reemplazar por la fuente real cuando exista (DB/API externa).
  return {
    activeUsers: 1284,
    revenue: 12400,
    conversion: 3.2,
    updatedAt: new Date().toISOString(), // Marca el momento de la lectura
  };
}
