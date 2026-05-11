import Link from "next/link"; // Mismo Link de Next para prefetch en footer

// MarketingFooter
// ---------------
// Footer público del grupo (marketing).
// Estructura "site map" en 4 columnas tipo Vercel/Stripe.
// Server component puro (sin estado).

// Mantengo las columnas como data estática → fácil de mover a CMS / i18n más adelante.
const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { href: "/#product", label: "Overview" },
      { href: "/#features", label: "Features" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/dashboard", label: "Dashboard" }, // Cross-link al área app
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/#docs", label: "Documentation" },
      { href: "/#api", label: "API reference" },
      { href: "/#status", label: "Status" },
      { href: "/#changelog", label: "Changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#customers", label: "Customers" },
      { href: "/#careers", label: "Careers" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/#privacy", label: "Privacy" },
      { href: "/#terms", label: "Terms" },
      { href: "/#security", label: "Security" },
      { href: "/#cookies", label: "Cookies" },
    ],
  },
] as const;

export function MarketingFooter() {
  // Se calcula en render (no en módulo) para que el año sea correcto incluso con SSG largo
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        {/* Bloque superior: brand + columnas */}
        <div className="grid gap-10 md:grid-cols-5">
          {/* Columna brand (ocupa 1 col, deja 4 para los link groups) */}
          <div className="space-y-3 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold tracking-tight"
            >
              <span
                className="inline-block h-5 w-5 rounded-md bg-foreground"
                aria-hidden
              />
              UI Lab
            </Link>
            <p className="text-xs text-muted-foreground">
              Frontend lab for replicating real SaaS UI tickets.
            </p>
          </div>

          {/* 4 columnas de links — se generan desde FOOTER_SECTIONS */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bloque inferior: copyright + links pequeños */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} UI Replication Lab. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/#privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/#terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/#cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
