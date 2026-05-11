import { AppShell } from "@/components/layout/AppShell";
import { HeroStripe } from "@/components/sections/HeroStripe";
import { FeatureStripe } from "@/components/sections/FeatureStripe";
import { DeveloperStripe } from "@/components/sections/DeveloperStripe";

// Marketing landing (public)
// --------------------------
// Lives under the (marketing) route group so it shares the root layout
// without leaking dashboard concerns. URL: /

export default function MarketingHome() {
  return (
    <AppShell>
      <HeroStripe />
      <FeatureStripe />
      <DeveloperStripe />
    </AppShell>
  );
}
