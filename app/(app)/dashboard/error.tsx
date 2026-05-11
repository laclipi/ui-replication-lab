"use client"; // Error boundaries en App Router DEBEN ser Client Components

import { useEffect } from "react";
import { Section } from "@/components/ui/section";
import { ErrorState } from "@/components/ui/error-state";

// Dashboard error boundary
// ------------------------
// Captura cualquier error sin tratar dentro del segmento /dashboard.
// - Reemplaza el contenido de page.tsx (no del layout) hasta que se hace retry.
// - En Next 16 el helper de reintento se llama `unstable_retry`
//   (deja de ser `reset`). Refrescar el segmento entero en vez de re-throw.
// - Side-effect: lo logueamos para que en dev se vea en consola y en prod
//   pueda engancharse a un reporter (Sentry, Logflare, etc.).

type DashboardErrorProps = {
  error: Error & { digest?: string }; // `digest` es el hash que sirve Next para correlacionar en server logs
  unstable_retry: () => void; // Next 16 API: vuelve a montar el segmento intentándolo de nuevo
};

export default function DashboardError({
  error,
  unstable_retry,
}: DashboardErrorProps) {
  // Side effect: log al montar/actualizar el error.
  // Cuando exista observabilidad real, sustituir console.error por sendToReporter(error).
  useEffect(() => {
    console.error("[dashboard] segment error:", error);
  }, [error]);

  return (
    <Section>
      <div className="space-y-4">
        <ErrorState
          message="Something went wrong loading the dashboard. Please try again."
        />

        {/* digest: opcional, ayuda a soporte a correlacionar con server logs */}
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Reference ID: <code className="font-mono">{error.digest}</code>
          </p>
        )}

        <button
          type="button"
          onClick={unstable_retry} // Re-renderiza el segmento desde cero (re-ejecuta el Server Component)
          className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
        >
          Try again
        </button>
      </div>
    </Section>
  );
}
