import { HeroStripe } from "@/components/sections/HeroStripe";
import { FeatureStripe } from "@/components/sections/FeatureStripe";
import { DeveloperStripe } from "@/components/sections/DeveloperStripe";

// Marketing home — URL: "/"
// -------------------------
// El chrome (nav + footer) lo aporta app/(marketing)/layout.tsx,
// así que esta page solo se preocupa de su contenido propio.
// Server component → se prerendera como HTML estático.

export default function MarketingHome() {
  return (
    // Fragment: el layout del grupo ya envuelve con <main>, no necesitamos otro wrapper
    <>
      <HeroStripe />
      <FeatureStripe />
      <DeveloperStripe />
    </>
  );
}
