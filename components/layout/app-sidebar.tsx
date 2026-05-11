"use client"; // Necesita usePathname() → forzosamente client component

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook que devuelve la URL actual en cliente
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  LifeBuoy,
} from "lucide-react"; // Iconos del sidebar (tree-shakeable desde lucide-react)
import type { ComponentType, SVGProps } from "react"; // Tipo genérico para iconos de lucide

import { cn } from "@/lib/utils"; // Helper para combinar classNames con merge de Tailwind

// AppSidebar
// ----------
// Sidebar del grupo (app). Muestra navegación principal del dashboard.
// - Resalta el item activo comparando con usePathname().
// - Usa los tokens --sidebar-* definidos en globals.css (light + dark).

// Item del sidebar tipado.
// `icon` es el componente de lucide, no su instancia → permite renderizarlo con className.
type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// Nav principal (top). Se renderiza arriba del sidebar.
const PRIMARY_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 }, // Ruta aún no existe — placeholder
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

// Nav secundaria (bottom). Útil para soporte / docs.
const SECONDARY_NAV: NavItem[] = [
  { href: "/#docs", label: "Documentation", icon: LifeBuoy },
];

export function AppSidebar() {
  const pathname = usePathname(); // p. ej. "/dashboard" → string actual de la URL

  // isActive: matchea exacto o como prefijo (ej. /dashboard/analytics/123 también activa Analytics)
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      // Sidebar fija a la izquierda. min-w-0 en hermanos permite que el main no overflow.
      className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex"
      aria-label="Sidebar"
    >
      {/* Brand del sidebar */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <span
          className="inline-block h-5 w-5 rounded-md bg-sidebar-foreground"
          aria-hidden
        />
        <span className="text-sm font-semibold tracking-tight">UI Lab</span>
      </div>

      {/* Nav principal — flex-1 para empujar el bottom block hacia abajo */}
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Primary">
        {PRIMARY_NAV.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon; // Renombramos a PascalCase para usar como JSX
          return (
            <Link
              key={item.href}
              href={item.href}
              // aria-current="page" da feedback semántico a lectores de pantalla
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Nav secundaria + user card abajo */}
      <div className="border-t border-sidebar-border p-3 space-y-3">
        <nav className="space-y-1" aria-label="Secondary">
          {SECONDARY_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User card placeholder — sustituir por sesión real cuando se integre auth */}
        <div className="flex items-center gap-2.5 rounded-md border border-sidebar-border bg-background/40 px-3 py-2">
          <div
            // Avatar con iniciales. Reemplazar por <Image /> cuando haya datos reales.
            className="flex h-7 w-7 items-center justify-center rounded-full bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground"
            aria-hidden
          >
            UL
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium leading-tight">
              Demo user
            </p>
            <p className="truncate text-[11px] text-sidebar-foreground/60">
              demo@uilab.dev
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
