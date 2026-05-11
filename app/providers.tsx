"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Query client singleton
// ----------------------
// Evita recrear el client en cada render

const queryClient = new QueryClient();

type ProvidersProps = {
  children: ReactNode;
};

// Providers
// ---------
// Centraliza providers globales (React Query, futuros themes, auth, etc.)

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
