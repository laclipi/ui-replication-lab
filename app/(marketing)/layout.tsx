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

export const metadata: Metadata = {
  // Title template aplica solo a las páginas dentro del grupo marketing.
  // El "%s" se sustituye por el title que defina cada page; el default cubre la home.
  title: {
    default: "UI Replication Lab — Build the future of payments",
    template: "%s — UI Replication Lab",
  },
  description:
    "Frontend lab for replicating real SaaS UI tickets. A unified platform demo.",
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    // min-h-screen + flex-col → footer siempre al final aunque el contenido sea corto
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MarketingNav />

      {/* flex-1 → el main absorbe el espacio sobrante, empujando el footer hacia abajo */}
      <main className="flex-1">{children}</main>

      <MarketingFooter />
    </div>
  );
}
