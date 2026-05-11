import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

// Section
// -------
// Unidad de layout para agrupar bloques visuales
// Se usa para dividir páginas en secciones claras (dashboard, landing, etc.)

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("py-10 space-y-6", className)}>{children}</section>
  );
}
