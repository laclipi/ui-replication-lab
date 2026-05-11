import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

// Section
// -------
// Wrapper estándar de layout.
// Controla spacing vertical consistente en toda la app.

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16">
      {/* py-16 = ritmo vertical del sistema */}
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}
