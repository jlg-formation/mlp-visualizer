# AGENTS.md

Front-end only React 19 + TypeScript + Vite app visualizing a small MLP recognizing 8x8 digits. Product spec (in French): [Specification.md](Specification.md). Project is managed with pnpm (see `packageManager` in [package.json](package.json)).

## Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Type-check + production build: `pnpm build` (runs `tsc -b` then `vite build`)
- Lint: `pnpm lint`
- Format: `pnpm format`

There is no test runner configured.

CI (`.github/workflows/vite_pnpm.yml`) runs on pushes to `main`: `pnpm install` then `pnpm run build`, and deploys `dist/` to GitHub Pages. Node 22.

## Project stats (`npx jlgstat`, 2026-10-22)

- 50 files, about 128k non-empty lines. About 96% of lines are `public/digits_8x8.json` (124k lines); `pnpm-lock.yaml` adds about 3k.
- Hand-written source is small: 32 files, about 1.7k lines (`src/components/` 11 files, `src/pages/` 7, `src/stores/` 6, `src/lib/` 2).
- Languages in source: TSX 21 files, TypeScript 9, plus Markdown, YAML, SVG, JS, HTML and CSS.
- Largest source file: [src/components/MLPGraph.tsx](src/components/MLPGraph.tsx) (233 lines).

When measuring or reviewing the codebase, exclude `public/digits_8x8.json` and `pnpm-lock.yaml` from line counts.

## Token economy

Save context: never read `public/digits_8x8.json` or `pnpm-lock.yaml` in full. Use grep or a short line range. Read source files in targeted ranges, not whole files, unless the file is small.

## Architecture

- Routing uses `HashRouter` in [src/App.tsx](src/App.tsx). Routes are `/`, `/board`, `/images`, `/doc`, `/test`, `/model`, `/training`. Because of hash routing, links look like `#/doc`, not `/doc`.
- Pages live in `src/pages/`, reusable UI in `src/components/`.
- Global state is a single Zustand store in [src/stores/useMLPStore.ts](src/stores/useMLPStore.ts), composed from slices in `src/stores/mlp/` (`dataSlice`, `modelSlice`, `trainingSlice`). Types are in `src/stores/mlp/types.ts`. `useImageStore.ts` is a separate store.
- The store calls `loadData()` on creation. Data comes from `public/digits_8x8.json`.
- TensorFlow.js model construction is in [src/lib/model.ts](src/lib/model.ts). `createModel` builds a 64-input network with ReLU hidden layers (default `[32, 16]`) and a 10-unit softmax output, compiled with Adam and `categoricalCrossentropy`.
- Layer structure extraction for the graph view is in [src/lib/extractLayerStructure.tsx](src/lib/extractLayerStructure.tsx).

## Conventions

- TypeScript is `strict`, with `noUnusedLocals`, `noUnusedParameters`, and `verbatimModuleSyntax`. Use `import type` for type-only imports.
- Styling is Tailwind CSS v4 via the `@tailwindcss/vite` plugin. There is no `tailwind.config` file; configure through CSS.
- Keep ML logic in `src/lib/` and state in `src/stores/`, not inside components.

## Pitfalls

- Vite `base` is `/mlp-visualizer/` only for `build`; dev uses `/`. Do not hardcode either path in components.
- The `README.md` is still the default Vite template and does not describe this project. Use [Specification.md](Specification.md) for product intent.
- The spec mentions `public/digits.json`, but the actual file is `public/digits_8x8.json`.
- Dataset split is 80% train / 20% test per the spec.
</content>
