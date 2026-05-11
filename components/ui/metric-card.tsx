import { cn } from "@/lib/utils";

type MetricVariant = "default" | "success" | "warning" | "danger";

type MetricCardProps = {
  title: string;
  value?: string;
  change?: string;
  loading?: boolean;
  variant?: "default" | "success" | "warning";
};

// MetricCard
// ----------
// Componente de sistema para métricas SaaS.
// Diseñado como primitive reutilizable estilo Stripe.

export function MetricCard({
  title,
  value,
  change,
  loading = false,
  variant = "default",
}: MetricCardProps) {
  // 🎨 Variante visual del card
  const variantStyles = {
    default: "text-foreground",
    success: "text-green-600",
    warning: "text-yellow-600",
  };

  return (
    <div
      className="
        rounded-2xl border border-border
        bg-card p-6
        space-y-2
        transition-all duration-200
      "
    >
      {/* Title */}
      <p className="text-sm text-muted-foreground">{title}</p>

      {/* Value */}
      <div className="text-2xl font-semibold">
        {loading ? (
          // Skeleton simple inline
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <span className={variantStyles[variant]}>{value}</span>
        )}
      </div>

      {/* Change indicator */}
      {change && !loading && (
        <p className="text-xs text-muted-foreground">{change}</p>
      )}
    </div>
  );
}
