# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds app code: domain logic (`domain/`), reusable composables (`composables/`), Pinia stores (`stores/`), and UI (`components/`, `views/`). Routing lives in `router/`, i18n in `i18n/`, and global styles in `assets/main.css`.
- Configuration: `vite.config.ts` (Vite + PWA), `tailwind.config.js`, `tsconfig.*`, and `postcss.config.js`. Public assets (manifest, icons) sit in `public/`.
- Tests live in `tests/` (Vitest + Vue Test Utils). Keep fixtures close to subject modules for clarity.

## Build, Test, and Development Commands
- `npm run dev` – Vite dev server with hot reload, PWA dev mode, and Tailwind JIT.
- `npm run build` – Type-check via `vue-tsc -b`, then Vite production build with service worker injection.
- `npm run preview` – Serves the production build locally (use to verify PWA installability).
- `npm run test:unit` – Runs Vitest (jsdom) for domain + component specs. Add focused suites rather than one mega spec.

## Coding Style & Naming Conventions
- Use Vue 3 Composition API with `<script setup lang="ts">`. Co-locate component logic and markup; prefer smaller focused components (`DeviceRow`, `EfficiencyPanel`, etc.).
- Types live in `domain/types.ts`; import shared types instead of re-declaring.
- Tailwind is the default styling layer. Use semantic utility stacks (`card`, `focus-ring` helpers) defined in CSS where repetition occurs. Respect dark mode via `dark:` classes and CSS variables.
- Name Pinia stores as `useXStore`. Composables follow `useThing.ts`. Keep filenames in camelCase based on exported symbol.

## Testing Guidelines
- Vitest: cover edge cases in `domain/calc.ts` (mixed units, strategy factors, derating). Snapshot tests aren’t useful here—assert numeric outputs.
- Vue Test Utils: mount critical components (`DeviceRow`, `StrategySelect`, `ResultsSummary`) to ensure emits and rendering logic. Mock Pinia state when necessary.
- Aim for fast, deterministic tests. Prefer fixtures over random numbers; document tricky scenarios inline.

## Commit & Pull Request Guidelines
- Use conventional-ish verbs (`feat:`, `fix:`, `docs:`) to highlight intent plus scope (e.g., `feat: add temperature derating slider`). Reference issue IDs when available.
- PRs should describe motivation, solution outline, screenshots of UI changes (light + dark themes), and any accessibility or performance implications. Mention new env vars, storage keys, or breaking changes.

## PWA, Security & Persistence Notes
- Update `public/manifest.json` and icon set if branding changes. Ensure `vite.config.ts` PWA plugin stays in sync with manifest metadata.
- Local data lives under `powercalc.*.v1` keys; bump suffix + add migration when shapes change.
- No analytics/telemetry allowed. Keep third-party assets self-hosted; follow the CSP suggested in documentation.
