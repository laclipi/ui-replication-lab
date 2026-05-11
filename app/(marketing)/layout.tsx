import type { ReactNode } from "react";
import type { Metadata } from "next";

import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";

// Marketing layout
// ----------------
// Layout compartido por todo el grupo (marketing).
// - Server component (los componentes hijos también lo son → 0 JS de cliente aquí).
// - Define el chrome público: nav arriba + footer abajo.
// - Nada de auth ni dashboards: marketing está estrictamente aislado.
//
// Metadata:
//   El title + OG defaults vienen del root layout (que lee siteConfig).
//   Aquí sólo refinamos la **descripción** para que el copy público sea más corto
//   y orientado a usuario (en vez del copy técnico que usamos como fallback global).

const marketingDescription =
  "Frontend lab for replicating real SaaS UI tickets. A unified platform demo.";

export const metadata: Metadata = {
  description: marketingDescription,
  openGraph: {
    description: marketingDescription, // Mantiene el OG card alineado al copy público
  },
  twitter: {
    description: marketingDescription, // Idem para Twitter card
  },
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    // min-h-screen + flex-col → footer siempre al final aunque el contenido sea corto
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <MarketingNav />

      {/* flex-1 → el main absorbe el espacio sobrante, empujando el footer hacia abajo */}
      <main className="flex-1">{children}</main>

      <MarketingFooter />
    </div>
  );
}
