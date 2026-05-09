# Algorithm Visualizer

Interactive web app that teaches algorithms via step-by-step visualizations. Each algorithm runs to completion in-memory and emits a sequence of immutable "step" snapshots; the UI plays them back with controls (play/pause, scrub, speed, step forward/back).

## Run it

```bash
npm install
npm run dev          # turbopack, http://localhost:3000
npm run build        # production build
npm run lint         # eslint (next config)
npm test             # jest
npm run test:watch
npm run test:coverage
npx tsc --noEmit     # type-check (CI runs this)
```

Node 20+. CI (`.github/workflows/pr-validation.yaml`) runs lint → tsc → build → test → npm audit on every PR.

## Stack

Next.js 15 (app router, turbopack) · React 19 · TypeScript 5 strict · Tailwind 4 · Jest 30 + Testing Library · React Context + `useReducer` for visualization state.

## Layout

- `app/` — app-router routes. Dynamic algo pages live at `app/sorting/[algorithm]`, `app/searching/[algorithm]`, `app/graph/[algorithm]`. Static pages: `about`, `glossary`, `difficulty/[difficulty]`. Plus `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `not-found.tsx`.
- `lib/algorithms/` — pure algorithm implementations grouped by `sorting/`, `searching/`, `graph/`. Each exports a function that returns an `AlgorithmVisualization`. Registry in `index.ts`, display metadata in `metadata.ts`, shared helper in `utils.ts` (`createVisualization`).
- `lib/types.ts` — `SortingStep` / `SearchStep` / `GraphStep` (discriminated unions), `AlgorithmVisualization`, `VisualizationState` and reducer `Action` types.
- `components/visualizer/` — `AlgorithmVisualizer` (parent), `SortingVisualization` / `SearchVisualization` / `GraphVisualization` (renderers per category), `VisualizerControls`, `AlgorithmInfo`, `AlgorithmPseudocode`, `ColorLegend`.
- `components/layout/` — `PageLayout`, `Navbar`, `Footer`. `components/glossary/`, `components/seo/` for the obvious.
- `context/AlgorithmContext.tsx` — `AlgorithmProvider` + `useAlgorithm` hook. Reducer holds `currentStep`, `isPlaying`, `speed`, `algorithm`, `data`, `target`. Animation loop is a `setInterval` dispatching `NEXT_STEP`.
- `__tests__/` — currently only `lib/utils.test.ts`. Coverage is configured for `components/`, `lib/`, `context/` but is essentially empty. **Big gap.**
- `idea.md` — original project concept / wishlist (interactive code editor, comparison mode, custom datasets, etc.). Aspirational, not a spec.

## How a visualizer works

The pattern, using `lib/algorithms/sorting/bubbleSort.ts` as the canonical example:

1. Copy the input array (never mutate the caller's data).
2. Walk the algorithm. After every meaningful state change, push an immutable snapshot into a `steps[]` array. A snapshot is whatever the renderer needs to draw the moment — current array, indices being compared, swap flag, completed indices, visited nodes, etc.
3. Return `createVisualization(name, steps, { timeComplexity, spaceComplexity, reference, pseudoCode })`.

The UI never re-runs the algorithm. It indexes into `steps[]` based on `currentStep`. This is what makes scrubbing and stepping backward trivial — but it means steps must be self-contained snapshots, not diffs.

## Adding a new algorithm

1. **Implementation:** `lib/algorithms/{category}/{name}.ts`. Match the signature for the category (sort/search take `(array, target?)`, graph takes `(array, startVertex?)`). Push step snapshots; return via `createVisualization`.
2. **Registry:** import + add to the `algorithms` map in `lib/algorithms/index.ts`.
3. **Metadata:** add an entry to `availableAlgorithms` in `lib/algorithms/metadata.ts` with `name`, `key`, `category`, `subtitle`, `description`, `difficulty` (`easy` | `medium` | `hard`).
4. **Route:** the dynamic `[algorithm]` page under the right category usually picks it up automatically once the key is registered. If a new category is needed, copy the `app/sorting/[algorithm]/page.tsx` shape.
5. **Step type:** if the algorithm needs new visual state, extend the relevant step union in `lib/types.ts` and update the matching renderer in `components/visualizer/`.
6. **Tests:** at minimum, a unit test in `__tests__/` that runs the algorithm on a small array and asserts the final step is correct.

## Conventions

- TypeScript `strict` is on. No `any`. No `@ts-ignore`. Keep it that way.
- Step snapshots are **deep copies**, not references. `[...arr]` at every push.
- Pseudocode in metadata is an array of strings, one per line.
- File naming: camelCase for algorithm files (`mergeSort.ts`), PascalCase for components.
- Tests live under `__tests__/` mirroring source paths; `*.test.ts(x)`.
- Don't add `console.log` to algorithms — they run during render.

## What the user wants to work on

**Phase 1 — tech debt cleanup before adding features.** Concrete items spotted during repo research (verify before acting):

- **Test coverage is near zero** outside `lib/utils.test.ts`. Algorithms and reducer logic are pure functions and easy to cover — that's the highest-leverage place to start.
- **Graph algorithms (`dfs`, `bfs`, `dijkstra`, `topologicalSort`) ignore the input array and use hardcoded sample graphs.** This is the biggest functional gap; a real graph input/edit story is needed before bulking out the graph section.
- **`getAlgorithmByName` return type** in `lib/algorithms/index.ts` papers over the sort/search vs. graph signature split — the cast loses the `startVertex` parameter shape. Worth tightening with a discriminated registry.
- **Magic numbers in animation timing** (`1100 - speed * 100`, etc.) belong in named constants.
- No TODO/FIXME comments and no commented-out code blocks — codebase is otherwise clean.

**Phase 2 — expand graph visualizations significantly.** This is the user's main feature goal. `idea.md` lists candidates: A* pathfinding, Prim's, Kruskal's, plus better DFS/BFS/Dijkstra with user-editable graph input. Eventually: code editor, comparison mode, custom datasets.

When in doubt about scope, prefer cleanup + foundations (graph input model, test scaffolding, shared graph step type) over piling new algorithms on top of the current shape.

## Deploy

Vercel-ready. Standard Next.js, no custom server.
