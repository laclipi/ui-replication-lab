export function FeatureStripe() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Everything you need to build
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
            A complete platform designed to scale with your product from day
            one.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="border-border bg-card space-y-2 rounded-xl border p-6">
            <h3 className="font-medium">Global payments</h3>
            <p className="text-muted-foreground text-sm">
              Accept payments anywhere in the world with a single integration.
            </p>
          </div>

          <div className="border-border bg-card space-y-2 rounded-xl border p-6">
            <h3 className="font-medium">Developer first</h3>
            <p className="text-muted-foreground text-sm">
              Clean APIs and tools built for fast integration.
            </p>
          </div>

          <div className="border-border bg-card space-y-2 rounded-xl border p-6">
            <h3 className="font-medium">Scale securely</h3>
            <p className="text-muted-foreground text-sm">
              Built-in compliance, fraud detection, and reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
