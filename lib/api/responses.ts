// API response helpers
// --------------------
// Forma estándar de devolver datos desde Route Handlers.
// Centralizar aquí evita que cada route invente su propio envelope de error
// y garantiza que las respuestas son tipadas y validables en runtime.
//
// Contrato:
//   - Éxito: el body es el dato directamente (sin envoltorio { data: ... }) — coherente
//     con la mayoría de APIs REST "modernas" (Stripe, Vercel) y simplifica clients.
//   - Error: envoltorio { error: { message, code? } } → estructura predecible y extensible
//     (timestamp, requestId, etc.) sin breaking change para clientes existentes.

import "server-only"; // Solo se ejecuta en server: NextResponse no existe en cliente
import { NextResponse } from "next/server";
import { z } from "zod";

// ApiErrorSchema
// --------------
// Contrato de errores. Lo exponemos para que tests / clients puedan validar
// que un response "feo" sigue cumpliendo la forma esperada.
export const ApiErrorSchema = z.object({
  error: z.object({
    message: z.string(), // Mensaje human-readable. Nunca metas detalles internos aquí.
    code: z.string().optional(), // Code machine-readable opcional (ej. "RATE_LIMITED").
  }),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

// apiSuccess
// ----------
// Devuelve un response 200 (o el status que se pase) con el body tipado.
// Generic <T> propaga el tipo del payload a quien consuma la response.
export function apiSuccess<T>(
  data: T,
  init?: ResponseInit
): NextResponse<T> {
  return NextResponse.json(data, init);
}

// apiError
// --------
// Devuelve un response de error con la forma estandarizada.
// - status default 500 → si lo invocas sin pensar, comunicas "fallo del server".
// - code es opcional; solo aparece en el JSON si lo pasas explícitamente.
export function apiError(
  message: string,
  options?: { status?: number; code?: string }
): NextResponse<ApiError> {
  // Spread condicional: si code es undefined, no contamina el JSON con "code": null
  const payload: ApiError = {
    error: {
      message,
      ...(options?.code !== undefined && { code: options.code }),
    },
  };

  return NextResponse.json(payload, { status: options?.status ?? 500 });
}
