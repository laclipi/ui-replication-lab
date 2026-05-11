// MetricCard
// ----------
// Componente de sistema para métricas SaaS.
// Diseñado como primitive reutilizable estilo Stripe.

// Variantes visuales soportadas — single source of truth para tipo y estilos.
type MetricVariant = "default" | "success" | "warning";

type MetricCardProps = {
  title: string; // Nombre de la métrica (ej. "Active Users")
  value?: string; // Valor formateado; undefined ⇒ se asume loading
  change?: string; // Indicador de variación (ej. "+12%")
  loading?: boolean; // Si true, muestra skeleton inline
  variant?: MetricVariant; // Color semántico del valor
};

// Mapa de variante → clase Tailwind. Tipado como Record para que TS exija
// que toda nueva variante tenga estilo asociado (no se cuela un fallthrough).
const variantStyles: Record<MetricVariant, string> = {
  default: "text-foreground",
  success: "text-green-600",
  warning: "text-yellow-600",
};

export function MetricCard({
  title,
  value,
  change,
  loading = false,
  variant = "default",
}: MetricCardProps) {
  return (
    <div className="border-border bg-card space-y-2 rounded-2xl border p-6 transition-all duration-200">
      {/* Title */}
      <p className="text-muted-foreground text-sm">{title}</p>

      {/* Value */}
      <div className="text-2xl font-semibold">
        {loading ? (
          // Skeleton inline — ancho fijo para que no haya layout shift al hacer swap
          <div className="bg-muted h-6 w-24 animate-pulse rounded" />
        ) : (
          <span className={variantStyles[variant]}>{value}</span>
        )}
      </div>

      {/* Change indicator — solo aparece si hay valor real (no en loading) */}
      {change && !loading && (
        <p className="text-muted-foreground text-xs">{change}</p>
      )}
    </div>
  );
}
