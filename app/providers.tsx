"use client"; // Marca obligatoria si en el futuro montamos providers que usan hooks/effects

import type { ReactNode } from "react";

// Providers
// ---------
// Punto único donde se centralizan los providers globales de la app
// (theme, auth, analytics, client data layer, etc.).
//
// Estado actual: passthrough.
//   - El dashboard fetcha en server (RSC), no necesita un client data provider.
//   - El día que se añada theme-provider / auth / React Query, se monta aquí.
//
// Mantener este componente vacío como punto de inserción es deliberado:
// evita tocar app/layout.tsx cada vez que aparece un nuevo provider.

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>; // Passthrough — sin coste extra de JS de cliente por providers vacíos
}
