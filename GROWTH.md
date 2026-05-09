# Repo Growth Tracker

A living snapshot of the codebase. Add a new entry each time a significant feature lands (new algorithm, test milestone, new page, major refactor). Keep each snapshot honest — capture the state at the time of the entry, not aspirational numbers.

---

## How to add an entry

Copy the template at the bottom of this file, fill it in, and prepend it to the **Snapshots** section. Use the merge date of the PR (or today if committing directly). Run `npm test -- --coverage` to get coverage numbers.

---

## Snapshots

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
