# Repo Growth Tracker

A living snapshot of the codebase. Add a new entry each time a significant feature lands (new algorithm, test milestone, new page, major refactor). Keep each snapshot honest — capture the state at the time of the entry, not aspirational numbers.

---

## How to add an entry

Copy the template at the bottom of this file, fill it in, and prepend it to the **Snapshots** section. Use the merge date of the PR (or today if committing directly). Run `npm test -- --coverage` to get coverage numbers.

---

## Snapshots

### 2026-05-10 — After Phases 6 & 7: data structures and DP on the new primitives

**Trigger:** Phase 6 data structures (BST insert, min-heap insert) and Phase 7 dynamic programming (Edit Distance, LCS) layered on top of the Phase 5 visual-primitives architecture. Two new primitives — TreeShape and Grid2D — extend the existing array-bars / array-cells / graph-2d set.

#### Algorithms

| Category        | Count  | Names                                                                    |
| --------------- | ------ | ------------------------------------------------------------------------ |
| Sorting         | 6      | bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort |
| Searching       | 2      | linearSearch, binarySearch                                               |
| Graph           | 7      | bfs, dfs, dijkstra, topologicalSort, bellmanFord, prim, kruskal          |
| Data Structures | 2      | bstInsert, minHeapInsert                                                 |
| Dynamic Prog.   | 2      | editDistance, lcs                                                        |
| **Total**       | **19** |                                                                          |

Difficulty breakdown: easy × 4, medium × 11, hard × 4

#### Test suite

| Metric             | Count  |
| ------------------ | ------ |
| Test files         | 14     |
| Test cases         | 162    |
| Statement coverage | 57.35% |
| Branch coverage    | 42.62% |
| Function coverage  | 46.15% |

New test files:

- `__tests__/lib/algorithms/datastructure/bst.test.ts` — BST insertion, in-order property, duplicates, lineNumber annotations
- `__tests__/lib/algorithms/datastructure/heap.test.ts` — min-heap invariant, no input mutation, lineNumber annotations
- `__tests__/lib/algorithms/dp/dp.test.ts` — Edit Distance and LCS correctness across canonical pairs

#### Pages & routes

| Metric           | Count  |
| ---------------- | ------ |
| Static routes    | 8      |
| Dynamic routes   | 8      |
| **Total routes** | **16** |

New routes: `/datastructure`, `/datastructure/[algorithm]`, `/dp`, `/dp/[algorithm]`. Sitemap updated.

#### Components

| Metric                | Count |
| --------------------- | ----- |
| Total components      | 21    |
| Visualizer primitives | 5     |

New primitives in `components/primitives/`:

- `TreeShape.tsx` — binary tree SVG layout, BFS coloring per `TreeStep`
- `Grid2D.tsx` — DP-table grid with row/col labels, dependency highlights, traceback path

New input panel: `components/visualizer/StringPairInputPanel.tsx` — two-string input for DP algorithms.

`renderPrimitive`'s exhaustive switch now covers all five primitives.

#### Source code

| Metric                                   | Count  |
| ---------------------------------------- | ------ |
| TypeScript/TSX files                     | 76     |
| Total lines (lib+components+context+app) | ~8,457 |

#### Notes

- **Discriminated primitives:** new algorithms declare `primitive: "tree-shape"` or `"grid-2d"` and the `StepsForPrimitive` mapped type constrains their step shape at the `createVisualization` call site.
- **DP input model:** DP page maintains its own `(stringA, stringB)` state independent of the global `data: number[]`. Strings are URL-synced as `?a=…&b=…`.
- **Categories:** added `dp` to `AlgorithmCategory`. Home page now uses an explicit label map and category ordering rather than auto-titlecasing the category key.

---

### 2026-05-09 — After Phase 3 & 4: Graph algorithms + test expansion

**Trigger:** Addition of Bellman-Ford, Prim's, Kruskal's algorithms; Phase 4 custom input editing & shareable URLs; comprehensive test suite expansion.

#### Algorithms

| Category   | Count | Names |
|------------|-------|-------|
| Sorting    | 6     | bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort |
| Searching  | 2     | linearSearch, binarySearch |
| Graph      | 7     | bfs, dfs, dijkstra, topologicalSort, bellmanFord, prim, kruskal |
| **Total**  | **15** | |

Difficulty breakdown: easy × 4, medium × 8, hard × 3

#### Test suite

| Metric | Count |
|--------|-------|
| Test files | 11 |
| Test cases | 134 |
| Statement coverage | 57.17% |
| Branch coverage | 44.73% |
| Function coverage | 42.55% |

Test files:
- `__tests__/lib/utils.test.ts` — 2 cases
- `__tests__/lib/algorithms/index.test.ts` — 4 cases
- `__tests__/lib/algorithms/sorting/bubbleSort.test.ts` — 6 cases
- `__tests__/lib/algorithms/sorting/sorting.test.ts` — 7 cases
- `__tests__/lib/algorithms/searching/searching.test.ts` — 8 cases
- `__tests__/lib/algorithms/graph/graph.test.ts` — 11 cases
- `__tests__/lib/algorithms/graph/bellmanFord.test.ts` — NEW
- `__tests__/lib/algorithms/graph/mst.test.ts` — NEW (Prim's & Kruskal's)
- `__tests__/lib/algorithms/graph/sampleGraphs.test.ts` — NEW
- `__tests__/context/AlgorithmContext.test.ts` — 17 cases
- `__tests__/lib/urlState.test.ts` — NEW

#### Pages & routes

| Metric | Count |
|--------|-------|
| Static routes | 6 |
| Dynamic routes | 6 |
| **Total routes** | **12** |

Routes unchanged from baseline; all new algorithms available via existing route structure.

#### Components

| Metric | Count |
|--------|-------|
| Total components | 17 |
| Visualizer components | 10 |

New components: InputPanel, graphEdge (support for custom input editing and graph visualization).

#### Source code

| Metric | Count |
|--------|-------|
| TypeScript/TSX files | 75 |
| Total lines | ~7,879 |

#### Notes

- **Test coverage:** Increased from ~0% to 57.17% statement coverage. Algorithm implementations now 93%+ covered; components remain untested.
- **Graph algorithms:** Added 3 new minimum spanning tree & shortest path algorithms (Bellman-Ford handles negative weights; Prim's and Kruskal's compute MSTs).
- **Custom input:** Phase 4 added InputPanel and graph edge editor for user-provided graphs (instead of hardcoded sample graphs).
- **Code growth:** +6 TypeScript/TSX files, +1,329 lines, +4 test files, +78 test cases.

---

### 2026-05-09 — Baseline snapshot

**Trigger:** Initial tracking entry; codebase post-Phase-1 tech-debt cleanup (tests for algorithms, reducer, and utils added).

#### Algorithms

| Category   | Count | Names |
|------------|-------|-------|
| Sorting    | 6     | bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort |
| Searching  | 2     | linearSearch, binarySearch |
| Graph      | 4     | bfs, dfs, dijkstra, topologicalSort |
| **Total**  | **12** | |

Difficulty breakdown: easy × 4, medium × 6, hard × 2

#### Test suite

| Metric | Count |
|--------|-------|
| Test files | 7 |
| Test cases | 56 |
| Files with zero coverage | ~50 (components, most lib) |

Test files:
- `__tests__/lib/utils.test.ts` — 2 cases
- `__tests__/lib/algorithms/index.test.ts` — 4 cases
- `__tests__/lib/algorithms/sorting/bubbleSort.test.ts` — 6 cases
- `__tests__/lib/algorithms/sorting/sorting.test.ts` — 7 cases (covers 5 sorting algorithms)
- `__tests__/lib/algorithms/searching/searching.test.ts` — 8 cases
- `__tests__/lib/algorithms/graph/graph.test.ts` — 11 cases
- `__tests__/context/AlgorithmContext.test.ts` — 17 cases

#### Pages & routes (`app/`)

| Route | Type |
|-------|------|
| `/` | Static |
| `/about` | Static |
| `/difficulty` | Static |
| `/difficulty/[difficulty]` | Dynamic |
| `/glossary` | Static |
| `/glossary/[term]` | Dynamic |
| `/sorting` | Static |
| `/sorting/[algorithm]` | Dynamic |
| `/searching` | Static |
| `/searching/[algorithm]` | Dynamic |
| `/graph` | Static |
| `/graph/[algorithm]` | Dynamic |

**Total routes: 12** (6 static + 6 dynamic)

#### Components (`components/`)

| Directory | Components |
|-----------|------------|
| `components/` (root) | AlgorithmCard, Controls |
| `components/glossary/` | GlossaryItem |
| `components/layout/` | Footer, Navbar, PageLayout |
| `components/seo/` | JsonLd |
| `components/visualizer/` | AlgorithmInfo, AlgorithmPseudocode, AlgorithmVisualizer, ColorLegend, GraphVisualization, SearchVisualization, SortingVisualization, VisualizerControls |

**Total components: 15**

#### Source code

| Metric | Count |
|--------|-------|
| TypeScript/TSX files | 69 |
| Total lines (all `.ts`/`.tsx`) | ~6,550 |
| Type definitions (`lib/types.ts`) | 8 |
| Step types | 3 (SortingStep, SearchStep, GraphStep) |

#### Dependencies

| Type | Count |
|------|-------|
| Production | 3 (next, react, react-dom) |
| Development | 23 |
| **Total** | **26** |

---

## Template

Copy and fill in for each new snapshot:

```markdown
### YYYY-MM-DD — <short description of what changed>

**Trigger:** <what landed — PR title, milestone, etc.>

#### Algorithms

| Category   | Count | Names |
|------------|-------|-------|
| Sorting    |       | |
| Searching  |       | |
| Graph      |       | |
| **Total**  |       | |

Difficulty breakdown: easy × ?, medium × ?, hard × ?

#### Test suite

| Metric | Count |
|--------|-------|
| Test files | |
| Test cases | |
| Statement coverage | |
| Branch coverage | |

#### Pages & routes

| Metric | Count |
|--------|-------|
| Static routes | |
| Dynamic routes | |
| **Total routes** | |

#### Components

| Metric | Count |
|--------|-------|
| Total components | |
| Visualizer components | |

#### Source code

| Metric | Count |
|--------|-------|
| TypeScript/TSX files | |
| Total lines | |

#### Notes

- <anything worth calling out: new step type added, big refactor, etc.>
```
