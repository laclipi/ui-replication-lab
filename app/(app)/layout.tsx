import type { ReactNode } from "react";
import type { Metadata } from "next";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";

// App layout
// ----------
// Layout compartido por todo el grupo (app) — el área autenticada.
// - Server component que monta el chrome privado: sidebar + topbar.
// - Los componentes interactivos (sidebar/topbar) son client porque usan usePathname.
// - "noindex" por seguridad: los buscadores no deben indexar el dashboard.

export const metadata: Metadata = {
  title: {
    default: "Dashboard — UI Replication Lab",
    template: "%s — UI Replication Lab",
  },
  robots: {
    index: false, // No queremos que Google indexe el área privada
    follow: false,
  },
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    // h-screen + flex horizontal → sidebar fija a la izq, panel principal a la derecha
    <div className="bg-background text-foreground flex min-h-screen">
      <AppSidebar />

      {/* min-w-0 evita que un hijo con contenido ancho fuerce overflow horizontal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar />

        {/* main scrolleable; el padding lo gestionan las pages (vía Section) para no doblar spacing */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
