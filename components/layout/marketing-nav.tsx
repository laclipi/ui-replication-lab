import Link from "next/link"; // Client-side navigation con prefetch automático (Next/Link)
import { ArrowRight } from "lucide-react"; // Icono del CTA principal
import { Button } from "@/components/ui/button"; // Botón del design system (soporta asChild)

// MarketingNav
// ------------
// Top navigation pública del grupo (marketing).
// - Sticky con backdrop blur (estilo Vercel / Stripe).
// - Solo se renderiza en rutas dentro de app/(marketing)/*.
// - Server component: no necesita estado ni hooks de cliente.

const NAV_LINKS = [
  { href: "/#product", label: "Product" }, // Anchors al landing por ahora
  { href: "/#pricing", label: "Pricing" },
  { href: "/#docs", label: "Docs" },
  { href: "/#customers", label: "Customers" },
] as const; // as const → tipa cada href/label como literal y evita mutaciones

export function MarketingNav() {
  return (
    <header
      // sticky + backdrop blur = nav que "flota" sobre el contenido al hacer scroll
      className="border-border/60 bg-background/70 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        {/* Logo / brand (izquierda) */}
        <Link
          href="/" // Vuelve siempre al home del grupo marketing
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span
            // Cuadradito de marca: usa el primary del theme para que respete dark mode
            className="bg-foreground inline-block h-5 w-5 rounded-md"
            aria-hidden // No aporta info al lector de pantalla, solo decorativo
          />
          UI Lab
        </Link>

        {/* Links centrales (ocultos en mobile para no saturar) */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Acciones derecha: sign in + CTA principal */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard" // Saltamos al área app (auth real vendrá en otra fase)
            className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:inline-block"
          >
            Sign in
          </Link>

          <Button asChild size="sm">
            {/* asChild = el Button presta sus estilos al <Link> hijo (sin <button> dentro de <a>) */}
            <Link href="/dashboard">
              Get started
              <ArrowRight aria-hidden />{" "}
              {/* Tamaño lo controla la variante del Button */}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
