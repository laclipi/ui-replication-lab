import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

// PageHeader
// ----------
// Header tipo SaaS (Stripe/Vercel style)
// Mejora jerarquía visual y separación clara de contenido

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="border-border flex items-start justify-between border-b pb-6">
      {/* Left */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>

      {/* Right */}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
