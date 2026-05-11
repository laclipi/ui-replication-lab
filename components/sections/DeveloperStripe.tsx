export function DeveloperStripe() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Built for developers
          </h2>

          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Simple APIs, powerful abstractions, and full control over your
            integration.
          </p>
        </div>

        {/* Code block */}
        <div className="rounded-xl border border-border bg-black text-white p-6 overflow-x-auto">
          <pre className="text-sm leading-relaxed">
            {`// Create a payment intent
const payment = await stripe.paymentIntents.create({
  amount: 2000,
  currency: "usd",
});`}
          </pre>
        </div>
      </div>
    </section>
  );
}
