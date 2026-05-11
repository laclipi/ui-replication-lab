export function DeveloperStripe() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl space-y-10 px-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Built for developers
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
            Simple APIs, powerful abstractions, and full control over your
            integration.
          </p>
        </div>

        {/* Code block */}
        <div className="border-border overflow-x-auto rounded-xl border bg-black p-6 text-white">
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
