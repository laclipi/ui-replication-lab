import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type AppShellProps = {
  children: ReactNode;
};

// AppShell
// --------
// Layout base de la aplicación SaaS
// Define fondo, color y estructura global

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Container className="py-10">{children}</Container>
    </div>
  );
}
