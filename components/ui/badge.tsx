import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Badge
// -----
// Primitive pequeño para etiquetar estado, version, categoria, etc.
// Patrón cva igual que el Button → cuando alguien lea el repo encuentra la
// misma forma de hacer variants en todos los primitives.
//
// Por qué tiene su propio archivo en components/ui:
//   - Se va a usar en muchas sections (hero, pricing, comparison).
//   - Si el día de mañana añadimos size="sm/lg", lo cambias aquí y se propaga.

const badgeVariants = cva(
  // Base shared por todas las variants — no se sobrescribe.
  // inline-flex + items-center + gap = composición con icono o dot dentro.
  // rounded-full + px-2.5 + py-0.5 = forma "pill" estándar SaaS.
  // text-xs + font-medium + tracking-tight = legibilidad pequeña sin perder peso.
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight transition-colors",
  {
    variants: {
      variant: {
        // default: contrastado, para llamar la atención
        default: "border-transparent bg-primary text-primary-foreground",

        // secondary: gris medio, etiquetas neutras
        secondary: "border-transparent bg-secondary text-secondary-foreground",

        // outline: solo borde, mínimo peso visual
        outline: "border-border bg-background text-foreground",

        // muted: el más sutil — para eyebrows y "ya conoces este estado"
        // Ideal en heros donde el badge acompaña sin competir con el headline.
        muted:
          "border-border/60 bg-muted/40 text-muted-foreground backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Props extiende los attrs nativos de <span> + las variants tipadas.
// Permitir `asChild` quedaría para una próxima iteración si hace falta;
// por ahora un span basta y mantiene el componente simple.
type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
