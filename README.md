# UI Replication Lab

Opinionated Next.js 16 starter for replicating real SaaS UI tickets. Built as a public reference for what a "clone the Stripe/Vercel landing + dashboard" lab should look like in 2026: App Router, Server Components, Tailwind v4, shadcn primitives, Zod-typed API contracts, and CI gates that actually run.

> Public landing at `/`, private dashboard at `/dashboard`. Two route groups, two layouts, one shared design system.

---

## Stack

| Layer         | Choice                                                | Why                                                                     |
| ------------- | ----------------------------------------------------- | ----------------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router)         | RSC, route groups, streaming with `loading.tsx` out of the box          |
| Runtime       | Node 22 LTS                                           | Pinned via `.nvmrc` + `engines.node` so CI and local stay in sync       |
| UI            | React 19 + [Tailwind CSS v4](https://tailwindcss.com) | OKLCH design tokens defined in `app/globals.css`                        |
| Components    | [shadcn/ui](https://ui.shadcn.com) primitives         | Owned-in-repo `components/ui/*`; no opaque vendor lock                  |
| Icons         | [lucide-react](https://lucide.dev)                    | Tree-shakeable per icon                                                 |
| Validation    | [Zod 4](https://zod.dev)                              | Schema-first contracts; types inferred via `z.infer`                    |
| Data fetching | RSC `fetch` / direct server functions                 | No client data layer by default (React Query removed, easy to add back) |
| Lint          | ESLint 9 (flat config) + `eslint-config-next`         | Project-wide overrides in `eslint.config.mjs`                           |
| Format        | Prettier 3 + `prettier-plugin-tailwindcss`            | Deterministic className order; CI fails on drift                        |
| CI            | GitHub Actions                                        | One workflow: typecheck + lint + format + build                         |

---

## Getting started

```bash
# Use the pinned Node version (nvm / fnm / volta will all read .nvmrc)
nvm use

npm install
npm run dev
```

Open <http://localhost:3000> for the marketing landing. <http://localhost:3000/dashboard> for the dashboard.

### Scripts

| Command                | What it does                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm run dev`          | Next.js dev server with Turbopack                                      |
| `npm run build`        | Production build                                                       |
| `npm run start`        | Serve the production build                                             |
| `npm run typecheck`    | `tsc --noEmit` — catches type errors that Next's build skips for speed |
| `npm run lint`         | ESLint over the whole repo                                             |
| `npm run lint:fix`     | ESLint with `--fix`                                                    |
| `npm run format`       | Prettier `--write` (mutates files)                                     |
| `npm run format:check` | Prettier `--check` (read-only; CI uses this)                           |
| `npm run check`        | Full local equivalent of CI: typecheck → lint → format:check → build   |

Run `npm run check` before opening a PR. If it passes locally, CI passes.

---

## Project structure

```
app/
├── (marketing)/              # Public landing — server components, prerendered static
│   ├── layout.tsx              ├── MarketingNav + MarketingFooter
│   └── page.tsx                └── Hero / Feature / Developer stripes
├── (app)/                    # Authenticated area — dynamic, sidebar + topbar
│   ├── layout.tsx              ├── AppSidebar + AppTopbar (active-aware via usePathname)
│   └── dashboard/
│       ├── page.tsx            ├── async RSC, awaits getDashboardMetrics()
│       ├── loading.tsx         ├── Suspense fallback skeleton (no layout shift)
│       └── error.tsx           └── Segment error boundary with unstable_retry
├── api/dashboard/metrics/    # Public REST surface (delegates to lib/dashboard/metrics)
│   └── route.ts
├── layout.tsx                # Root layout — fonts, providers seam
└── providers.tsx             # Passthrough — insertion point for theme/auth/etc.

components/
├── layout/                   # Group-specific chrome
│   ├── marketing-nav.tsx
│   ├── marketing-footer.tsx
│   ├── app-sidebar.tsx
│   └── app-topbar.tsx
├── sections/                 # Marketing sections (server components, no JS shipped)
│   ├── HeroStripe.tsx
│   ├── FeatureStripe.tsx
│   └── DeveloperStripe.tsx
└── ui/                       # Owned shadcn primitives + design system
    ├── button.tsx
    ├── container.tsx
    ├── error-state.tsx
    ├── metric-card.tsx
    ├── page-header.tsx
    └── section.tsx

lib/
├── api/responses.ts          # apiSuccess<T> / apiError helpers + ApiErrorSchema
├── dashboard/metrics.ts      # Single source of truth: schema + type + server-only getter
└── utils.ts                  # cn() etc.
```

### Route-group convention

`(marketing)` and `(app)` are [route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups). The parentheses **do not affect URLs**; they only let us:

1. Ship a different chrome (nav vs sidebar) per area without two root layouts.
2. Keep marketing components and dashboard components in mental silos.

Cross-linking between groups (e.g. the "Get started" CTA in the marketing nav linking to `/dashboard`) is a normal client-side transition — no full reload, because both groups share `app/layout.tsx` as their single root layout.

---

## Architecture conventions

These are the rules the codebase already follows. Stick to them when extending.

### Server vs client

- **Default to Server Components.** Every page and layout is RSC unless it needs `usePathname`, state, effects, or event handlers.
- Client components are leaf islands (`AppSidebar`, `AppTopbar`, `error.tsx`). Their `"use client"` directive lives at the top of the file.
- Data fetching for the initial render belongs on the server. The dashboard page awaits `getDashboardMetrics()` directly — no HTTP round-trip to its own API.

### Data layer

- `lib/<feature>/<resource>.ts` declares a Zod schema and a `get<Resource>()` async function.
- The schema is the source of truth; the TS type is `z.infer<typeof Schema>`.
- `import "server-only"` at the top so a Client Component can never bundle it.
- The `get*` function validates with `Schema.parse()` before returning. Defense in depth: when the mock is replaced by a DB query, a malformed row fails here with a clear Zod error instead of leaking into the render.

### API contract

- Success responses return the data directly (Stripe-style; no `{ data: ... }` envelope).
- Error responses use `{ error: { message, code? } }` via `apiError(...)`.
- `code` is machine-readable and optional. Set it when clients can act on the error type (`VALIDATION_FAILED`, `RATE_LIMITED`, etc.).

### Dynamic rendering

The dashboard page calls `await headers()` to opt into dynamic rendering on every request. In Next 16, `export const dynamic = "force-dynamic"` is reserved for the Cache Components opt-in — the canonical alternative is reading a Request-time API (`headers`/`cookies`/`draftMode`). When auth lands, that `await headers()` is replaced by the real session read.

---

## What's intentionally **not** included

- **Auth.** Add `next-auth` / `clerk` / `lucia` when you need it; the `(app)` group is the right place to gate.
- **Database.** `getDashboardMetrics()` is a mock with simulated latency so the Suspense fallback is visible during demos. Swap it for your ORM call.
- **Tests.** Out of scope for the public starter — add Vitest / Playwright when extending.
- **Client data fetching.** React Query was removed once the dashboard moved to RSC. Reinstall it (or pick SWR / `use(promise)` from a Server Component) when you actually need it.

---

## License

MIT — see `LICENSE` (not yet shipped; add when needed).
