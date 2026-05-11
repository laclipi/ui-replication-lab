import { cn } from "@/lib/utils";

type MetricVariant = "default" | "success" | "warning" | "danger";

type MetricCardProps = {
  title: string;
  value?: string;
  change?: string;
  loading?: boolean;
  variant?: MetricVariant;
};

// MetricCard
// ----------
// Card de métricas con sistema de variantes visuales
// Permite representar estados de negocio (growth, risk, warning, neutral)

export function MetricCard({
  title,
  value,
  change,
  loading = false,
  variant = "default",
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 space-y-2",
        "transition-colors",
        variant === "default" && "border-border",
        variant === "success" && "border-green-200",
        variant === "warning" && "border-yellow-200",
        variant === "danger" && "border-red-200",
      )}
    >
      {/* Title */}
      <p className="text-sm text-muted-foreground">{title}</p>

      {/* Value */}
      {loading ? (
        <div className="h-6 w-20 animate-pulse rounded bg-muted" />
      ) : (
        <p className="text-2xl font-semibold">{value}</p>
      )}

      {/* Change */}
      {!loading && change && (
        <p
          className={cn(
            "text-xs",
            variant === "success" && "text-green-600",
            variant === "warning" && "text-yellow-600",
            variant === "danger" && "text-red-600",
            variant === "default" && "text-muted-foreground",
          )}
        >
          {change}
        </p>
      )}
    </div>
  );
}
