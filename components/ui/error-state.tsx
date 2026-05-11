// ErrorState
// ----------
// Componente estándar para mostrar errores en UI SaaS
// Reutilizable en dashboards, páginas y sections

type ErrorStateProps = {
  message?: string;
};

export function ErrorState({
  message = "Something went wrong",
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}
