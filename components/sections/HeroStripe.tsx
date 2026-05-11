export function HeroStripe() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl space-y-6 px-6 text-center">
        {/* Eyebrow */}
        <p className="text-muted-foreground text-sm">
          Payments infrastructure for the internet
        </p>

        {/* Main headline */}
        <h1 className="text-5xl font-semibold tracking-tight">
          Build the future of payments
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          A unified platform to accept payments, send payouts, and manage
          business revenue at scale.
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button className="rounded-md bg-black px-4 py-2 text-white">
            Start now
          </button>

          <button className="border-border rounded-md border px-4 py-2">
            Contact sales
          </button>
        </div>
      </div>
    </section>
  );
}
