// Dashboard data layer
// --------------------
// Una sola fuente de verdad para las métricas del dashboard.
//
// Contrato:
//   El SCHEMA es la fuente de verdad. El tipo se infiere desde él (z.infer),
//   no se declara aparte. Cambiar el shape → cambia el schema → TypeScript
//   propaga el error en todos los consumidores (page, route, futuros clients).
//
// Consumidores:
//   - Server Component (page) → llama getDashboardMetrics() directo, sin HTTP.
//   - Route Handler (/api/...) → expone la misma función como REST público.

import "server-only"; // Guardia: importar este módulo desde un Client Component fallará en build
import { z } from "zod"; // Runtime validator + type inference en un solo objeto

// DashboardMetricsSchema
// ----------------------
// Contrato runtime del payload de métricas.
// Reglas:
//   - activeUsers: entero ≥ 0 (no tiene sentido un .5 de usuario).
//   - revenue: número ≥ 0, sin restricción de decimales (centavos posibles).
//   - conversion: porcentaje 0-100 con un decimal de precisión razonable.
//   - updatedAt: ISO 8601 datetime ("2025-05-11T12:34:56.789Z").
// Las restricciones funcionan tanto como validación como documentación viva
// del contrato — cualquier desviación falla en parse() y nos enteramos.
export const DashboardMetricsSchema = z.object({
  activeUsers: z.number().int().nonnegative(),
  revenue: z.number().nonnegative(),
  conversion: z.number().min(0).max(100),
  updatedAt: z.iso.datetime(), // Zod v4: helper específico para ISO 8601 datetime
});

// DashboardMetrics
// ----------------
// Tipo TS derivado del schema (z.infer). Único tipo público del módulo.
// No declarar el tipo a mano → garantiza que schema y type nunca diverjan.
export type DashboardMetrics = z.infer<typeof DashboardMetricsSchema>;

// Helper para simular latencia de I/O sin meter dependencias.
// Cuando se conecte una BBDD/HTTP real, esto desaparece.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// getDashboardMetrics
// -------------------
// Carga las métricas del dashboard.
// Diseñado para correr en server (Server Component o Route Handler).
//
// Defensa en profundidad:
//   El objeto se construye y se pasa por DashboardMetricsSchema.parse() antes
//   de devolverlo. Si en el futuro el origen de datos (DB / CRM / API externa)
//   devuelve algo malformado, fallamos aquí con un mensaje claro de Zod en lugar
//   de propagar basura al render del cliente.
//
//   .parse() lanza ZodError. error.tsx del segmento /dashboard lo captura como
//   cualquier otro error → mensaje + retry para el usuario.
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  // Simulación de latencia para que el loading.tsx (Suspense fallback)
  // sea visible al desarrollar y al hacer demo. En real, esto será await db.query(...).
  await sleep(600);

  // Mock data — reemplazar por la fuente real (DB/API externa) cuando exista.
  // Lo tipamos como `unknown` deliberadamente para forzar el paso por parse()
  // y prevenir el atajo de "ya está tipado, no hace falta validar".
  const raw: unknown = {
    activeUsers: 1284,
    revenue: 12400,
    conversion: 3.2,
    updatedAt: new Date().toISOString(), // Marca el momento de la lectura
  };

  return DashboardMetricsSchema.parse(raw); // Devuelve datos garantizados-válidos
}
