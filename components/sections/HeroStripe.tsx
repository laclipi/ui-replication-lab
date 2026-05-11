export function HeroStripe() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
        {/* Eyebrow */}
        <p className="text-sm text-muted-foreground">
          Payments infrastructure for the internet
        </p>

        {/* Main headline */}
        <h1 className="text-5xl font-semibold tracking-tight">
          Build the future of payments
        </h1>

        {/* Subtext */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A unified platform to accept payments, send payouts, and manage
          business revenue at scale.
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button className="px-4 py-2 rounded-md bg-black text-white">
            Start now
          </button>

          <button className="px-4 py-2 rounded-md border border-border">
            Contact sales
          </button>
        </div>
      </div>
    </section>
  );
}
