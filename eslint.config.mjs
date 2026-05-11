// ESLint flat config (v9+)
// ------------------------
// Extends the canonical Next.js presets and tightens a few rules
// that catch the bugs reviewers actually flag in pull requests.

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals"; // Core Web Vitals: a11y, img tags, etc.
import nextTs from "eslint-config-next/typescript"; // TypeScript rules + parser

const eslintConfig = defineConfig([
  // Base presets first — order matters: our overrides win because they're declared after.
  ...nextVitals,
  ...nextTs,

  // Project-wide overrides
  {
    rules: {
      // Unused vars are a smell — flip warnings to errors.
      // Prefix with `_` to opt-out intentionally (e.g. `_ignoredParam`).
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // `any` silently kills type safety. Make it an explicit decision.
      "@typescript-eslint/no-explicit-any": "error",

      // Defensive prefer-const: catches accidental `let` that never gets reassigned.
      "prefer-const": "error",

      // `console` is allowed for warn/error/info (used in error.tsx + route handlers).
      // Plain console.log is too noisy and slips into production easily.
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },

  // Default ignores of eslint-config-next, kept explicit so future contributors see them.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
