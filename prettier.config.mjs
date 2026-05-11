// Prettier configuration
// ----------------------
// Source of truth for code formatting in the repo.
// CI (`npm run format:check`) fails if any file drifts from these rules.
//
// Notable choices:
//   - Plain `printWidth: 80` keeps diffs reviewable.
//   - Trailing commas everywhere → cleaner git history when adding new items.
//   - The Tailwind plugin sorts utility classes deterministically so we never
//     argue about className order in reviews.

/** @type {import("prettier").Config} */
const config = {
  // Core formatting
  semi: true, // Always end statements with a semicolon
  singleQuote: false, // Use double quotes (matches React/TS ecosystem default)
  jsxSingleQuote: false, // Same in JSX (no surprises crossing files)
  tabWidth: 2, // Two-space indentation everywhere
  useTabs: false, // Spaces, never tabs
  trailingComma: "all", // Cleaner diffs when appending items to multiline collections
  printWidth: 80, // Soft line-length cap — Prettier wraps when it makes sense
  arrowParens: "always", // (x) => x rather than x => x; consistent and rename-safe
  bracketSpacing: true, // { foo } not {foo}
  endOfLine: "lf", // LF on every platform → no CRLF noise on Windows

  // Plugins
  plugins: [
    // Sorts Tailwind classes deterministically. Reads tailwind.config from cwd by default.
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
