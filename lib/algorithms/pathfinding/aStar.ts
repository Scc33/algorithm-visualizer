import type {
  AlgorithmVisualization,
  GridCell,
  GridCoord,
  GridStep,
} from "../../types";
import { createVisualization } from "../utils";
import {
  coordFromKey,
  coordKey,
  inBounds,
  manhattan,
  neighborMessage,
  neighbors4,
  popLowestKey,
  type PathfindingInput,
} from "./grid";

const PSEUDO = [
  "procedure aStar(start, goal, walls)",
  "  open := { start }",
  "  g[start] := 0; f[start] := h(start, goal)",
  "  while open is not empty do",
  "    current := node in open with lowest f",
  "    if current = goal then return reconstruct(current)",
  "    remove current from open; mark closed",
  "    for each neighbor n of current do",
  "      if n is wall or closed: continue",
  "      tentative := g[current] + 1",
  "      if tentative < g[n] then",
  "        cameFrom[n] := current",
  "        g[n] := tentative; f[n] := tentative + h(n, goal)",
  "        add n to open",
  "  return failure",
];

const DETAILS = {
  timeComplexity: "O((V + E) log V)",
  spaceComplexity: "O(V)",
  reference: "https://en.wikipedia.org/wiki/A*_search_algorithm",
  pseudoCode: PSEUDO,
};

interface CellCost {
  g: number;
  f: number;
}

interface State {
  input: PathfindingInput;
  wallSet: Set<string>;
  open: Set<string>;
  closed: Set<string>;
  cost: Map<string, CellCost>;
  cameFrom: Map<string, GridCoord>;
}

function emptyGrid(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null as GridCell)
  );
}

function snapshotCells(
  rows: number,
  cols: number,
  cost: Map<string, CellCost>
): GridCell[][] {
  const grid = emptyGrid(rows, cols);
  for (const [key, c] of cost) {
    const { row, col } = coordFromKey(key);
    grid[row]![col] = Number.isFinite(c.f) ? c.f : null;
  }
  return grid;
}

function reconstructPath(
  cameFrom: Map<string, GridCoord>,
  goal: GridCoord
): GridCoord[] {
  const path: GridCoord[] = [];
  let cur: GridCoord | undefined = goal;
  while (cur) {
    path.push(cur);
    cur = cameFrom.get(coordKey(cur));
  }
  return path.reverse();
}

function pushStep(
  steps: GridStep[],
  state: State,
  partial: {
    current: GridCoord | null;
    path?: GridCoord[];
    highlighted?: GridCoord[];
    message: string;
    lineNumber: number;
  }
): void {
  const { input, cost, open, closed } = state;
  steps.push({
    rows: input.rows,
    cols: input.cols,
    cells: snapshotCells(input.rows, input.cols, cost),
    rowLabels: [],
    colLabels: [],
    current: partial.current,
    highlighted: partial.highlighted ?? [],
    path: partial.path ?? [],
    walls: input.walls.map((w) => ({ ...w })),
    start: { ...input.start },
    goal: { ...input.goal },
    frontier: [...open].map(coordFromKey),
    visited: [...closed].map(coordFromKey),
    message: partial.message,
    lineNumber: partial.lineNumber,
  });
}

function relaxNeighbors(
  state: State,
  current: GridCoord,
  bestKey: string
): GridCoord[] {
  const { input, wallSet, closed, cost, cameFrom, open } = state;
  const expandable: GridCoord[] = [];
  const baseG = cost.get(bestKey)?.g ?? Infinity;
  for (const n of neighbors4(current)) {
    if (!inBounds(input.rows, input.cols, n)) continue;
    const nKey = coordKey(n);
    if (wallSet.has(nKey) || closed.has(nKey)) continue;
    const tentativeG = baseG + 1;
    const existing = cost.get(nKey);
    if (existing && tentativeG >= existing.g) continue;
    cameFrom.set(nKey, current);
    cost.set(nKey, { g: tentativeG, f: tentativeG + manhattan(n, input.goal) });
    open.add(nKey);
    expandable.push(n);
  }
  return expandable;
}

function isGoal(c: GridCoord, goal: GridCoord): boolean {
  return c.row === goal.row && c.col === goal.col;
}

export function aStar(input: PathfindingInput): AlgorithmVisualization {
  const { start, goal, walls } = input;
  const state: State = {
    input,
    wallSet: new Set(walls.map(coordKey)),
    open: new Set<string>([coordKey(start)]),
    closed: new Set<string>(),
    cost: new Map<string, CellCost>([
      [coordKey(start), { g: 0, f: manhattan(start, goal) }],
    ]),
    cameFrom: new Map<string, GridCoord>(),
  };

  const steps: GridStep[] = [];
  pushStep(steps, state, {
    current: null,
    message: `A* from (${start.row},${start.col}) to (${goal.row},${goal.col}).`,
    lineNumber: 1,
  });

  while (state.open.size > 0) {
    const bestKey = popLowestKey(
      state.open,
      (k) => state.cost.get(k)?.f ?? Infinity
    );
    if (bestKey === null) break;
    const current = coordFromKey(bestKey);
    const bestF = state.cost.get(bestKey)?.f ?? Infinity;

    pushStep(steps, state, {
      current,
      message: `Pop (${current.row},${current.col}) — lowest f = ${bestF}.`,
      lineNumber: 4,
    });

    if (isGoal(current, goal)) {
      const path = reconstructPath(state.cameFrom, goal);
      pushStep(steps, state, {
        current,
        path,
        message: `Reached goal — path length ${path.length - 1}.`,
        lineNumber: 5,
      });
      return createVisualization("aStar", "grid-2d", steps, DETAILS);
    }

    state.open.delete(bestKey);
    state.closed.add(bestKey);
    const expandable = relaxNeighbors(state, current, bestKey);

    pushStep(steps, state, {
      current,
      highlighted: expandable,
      message: neighborMessage(current, expandable.length),
      lineNumber: 7,
    });
  }

  pushStep(steps, state, {
    current: null,
    message: "Open set exhausted — no path exists.",
    lineNumber: 14,
  });
  return createVisualization("aStar", "grid-2d", steps, DETAILS);
}
