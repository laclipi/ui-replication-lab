"use client"; // usePathname() → client component

import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";

// AppTopbar
// ---------
// Topbar privada del grupo (app). Se queda sticky en la parte superior
// del panel principal (a la derecha del sidebar).
// - Deriva el título de página desde el pathname para evitar repetir prop drilling.
// - Stubs (search, notifications) listos para conectar en fases siguientes.

// Mapa pathname → título legible. Mantenerlo aquí permite una fuente
// única de verdad para la jerarquía del área app.
// Si una ruta no está en el mapa, caemos al label "Dashboard" (default seguro).
const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/analytics": "Analytics",
  "/dashboard/customers": "Customers",
  "/dashboard/settings": "Settings",
};

function resolveTitle(pathname: string): string {
  // Match exacto primero
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];

  // Fallback: buscamos el prefijo más largo conocido (ej. /dashboard/settings/billing → "Settings")
  const match = Object.keys(ROUTE_TITLES)
    .filter((key) => pathname.startsWith(`${key}/`))
    .sort((a, b) => b.length - a.length)[0];

  return match ? ROUTE_TITLES[match] : "Dashboard";
}

export function AppTopbar() {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return (
    <header
      // Sticky con blur — el contenido scrollea por debajo
      className="border-border bg-background/70 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b px-6 backdrop-blur-md"
    >
      {/* Título de página (izquierda) */}
      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold tracking-tight">
          {title}
        </h1>
      </div>

      {/* Acciones (derecha) — placeholders por ahora */}
      <div className="flex items-center gap-2">
        {/* Search stub — visible solo en >= sm para no comerse el espacio en mobile */}
        <div className="relative hidden sm:block">
          <Search
            className="text-muted-foreground absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search..."
            // role/label implícito por type=search; aria-label evita lectores confundidos
            aria-label="Search"
            className="border-border bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/40 h-8 w-56 rounded-md border pr-3 pl-8 text-sm outline-none focus-visible:ring-2"
          />
        </div>

        {/* Notifications stub */}
        <button
          type="button"
          aria-label="Notifications"
          className="border-border text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors"
        >
          <Bell className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </header>
  );
}
