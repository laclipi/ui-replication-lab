import type { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Merge de clases Tailwind con dedupe semántico

// Section
// -------
// Wrapper estándar de layout vertical.
// Controla ritmo y ancho máximo consistente en toda la app.
// Acepta className para extender (ej. fondo distinto, padding ajustado).

type SectionProps = {
  children: ReactNode;
  className?: string; // Extiende/sobrescribe estilos del <section> externo
};

export function Section({ children, className }: SectionProps) {
  return (
    // py-16 marca el ritmo vertical del sistema; className puede sobrescribirlo si hace falta
    <section className={cn("py-16", className)}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
