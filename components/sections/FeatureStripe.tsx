export function FeatureStripe() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Everything you need to build
          </h2>

          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            A complete platform designed to scale with your product from day
            one.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card space-y-2">
            <h3 className="font-medium">Global payments</h3>
            <p className="text-sm text-muted-foreground">
              Accept payments anywhere in the world with a single integration.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card space-y-2">
            <h3 className="font-medium">Developer first</h3>
            <p className="text-sm text-muted-foreground">
              Clean APIs and tools built for fast integration.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card space-y-2">
            <h3 className="font-medium">Scale securely</h3>
            <p className="text-sm text-muted-foreground">
              Built-in compliance, fraud detection, and reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
