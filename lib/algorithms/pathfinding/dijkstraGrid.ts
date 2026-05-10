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
  neighborMessage,
  neighbors4,
  popLowestKey,
  type PathfindingInput,
} from "./grid";

const PSEUDO = [
  "procedure dijkstra(start, goal, walls)",
  "  dist[start] := 0; dist[v] := ∞ for all other v",
  "  open := { start }",
  "  while open is not empty do",
  "    current := node in open with smallest dist",
  "    if current = goal then return reconstruct(current)",
  "    remove current from open; mark visited",
  "    for each neighbor n of current do",
  "      if n is wall or visited: continue",
  "      alt := dist[current] + 1",
  "      if alt < dist[n] then",
  "        dist[n] := alt; cameFrom[n] := current",
  "        add n to open",
  "  return failure",
];

const DETAILS = {
  timeComplexity: "O((V + E) log V)",
  spaceComplexity: "O(V)",
  reference: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm",
  pseudoCode: PSEUDO,
};

interface State {
  input: PathfindingInput;
  wallSet: Set<string>;
  open: Set<string>;
  closed: Set<string>;
  dist: Map<string, number>;
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
  dist: Map<string, number>
): GridCell[][] {
  const grid = emptyGrid(rows, cols);
  for (const [key, d] of dist) {
    if (!Number.isFinite(d)) continue;
    const { row, col } = coordFromKey(key);
    grid[row]![col] = d;
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
  const { input, dist, open, closed } = state;
  steps.push({
    rows: input.rows,
    cols: input.cols,
    cells: snapshotCells(input.rows, input.cols, dist),
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
  const { input, wallSet, closed, dist, cameFrom, open } = state;
  const relaxed: GridCoord[] = [];
  const baseDist = dist.get(bestKey) ?? Infinity;
  for (const n of neighbors4(current)) {
    if (!inBounds(input.rows, input.cols, n)) continue;
    const nKey = coordKey(n);
    if (wallSet.has(nKey) || closed.has(nKey)) continue;
    const alt = baseDist + 1;
    if (alt >= (dist.get(nKey) ?? Infinity)) continue;
    dist.set(nKey, alt);
    cameFrom.set(nKey, current);
    open.add(nKey);
    relaxed.push(n);
  }
  return relaxed;
}

function isGoal(c: GridCoord, goal: GridCoord): boolean {
  return c.row === goal.row && c.col === goal.col;
}

export function dijkstraGrid(input: PathfindingInput): AlgorithmVisualization {
  const { start, goal, walls } = input;
  const state: State = {
    input,
    wallSet: new Set(walls.map(coordKey)),
    open: new Set<string>([coordKey(start)]),
    closed: new Set<string>(),
    dist: new Map<string, number>([[coordKey(start), 0]]),
    cameFrom: new Map<string, GridCoord>(),
  };

  const steps: GridStep[] = [];
  pushStep(steps, state, {
    current: null,
    message: `Dijkstra from (${start.row},${start.col}) to (${goal.row},${goal.col}).`,
    lineNumber: 1,
  });

  while (state.open.size > 0) {
    const bestKey = popLowestKey(
      state.open,
      (k) => state.dist.get(k) ?? Infinity
    );
    if (bestKey === null) break;
    const current = coordFromKey(bestKey);
    const bestDist = state.dist.get(bestKey) ?? Infinity;

    pushStep(steps, state, {
      current,
      message: `Pop (${current.row},${current.col}) — distance ${bestDist}.`,
      lineNumber: 4,
    });

    if (isGoal(current, goal)) {
      const path = reconstructPath(state.cameFrom, goal);
      pushStep(steps, state, {
        current,
        path,
        message: `Reached goal — shortest distance is ${bestDist}.`,
        lineNumber: 5,
      });
      return createVisualization("dijkstraGrid", "grid-2d", steps, DETAILS);
    }

    state.open.delete(bestKey);
    state.closed.add(bestKey);
    const relaxed = relaxNeighbors(state, current, bestKey);

    pushStep(steps, state, {
      current,
      highlighted: relaxed,
      message: neighborMessage(current, relaxed.length),
      lineNumber: 7,
    });
  }

  pushStep(steps, state, {
    current: null,
    message: "Open set exhausted — goal unreachable.",
    lineNumber: 14,
  });
  return createVisualization("dijkstraGrid", "grid-2d", steps, DETAILS);
}
