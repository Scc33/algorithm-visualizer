import type {
  AlgorithmVisualization,
  GridCell,
  GridCoord,
  GridStep,
} from "../../types";
import { createVisualization } from "../utils";
import { coordKey, type PathfindingInput } from "./grid";

const PSEUDO = [
  "procedure recursiveBacktracker(grid)",
  "  mark every cell as wall",
  "  push start onto stack; carve start",
  "  while stack is not empty do",
  "    current := top of stack",
  "    candidates := neighbors 2 cells away that are still walls",
  "    if candidates is empty then",
  "      pop stack (backtrack)",
  "    else",
  "      pick random candidate n",
  "      carve cell between current and n",
  "      carve n; push n",
];

function emptyCells(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null as GridCell)
  );
}

function listWalls(
  isWall: boolean[][],
  rows: number,
  cols: number
): GridCoord[] {
  const out: GridCoord[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isWall[r]![c]) out.push({ row: r, col: c });
    }
  }
  return out;
}

interface BuildArgs {
  input: PathfindingInput;
  isWall: boolean[][];
  carved: Set<string>;
  stack: GridCoord[];
  rng: () => number;
}

function pushStep(
  steps: GridStep[],
  args: BuildArgs,
  partial: {
    current: GridCoord | null;
    highlighted?: GridCoord[];
    message: string;
    lineNumber: number;
  }
): void {
  const { input, isWall, carved, stack } = args;
  const visited: GridCoord[] = [];
  for (const k of carved) {
    const [r, c] = k.split(":");
    visited.push({ row: Number(r), col: Number(c) });
  }
  const frontier: GridCoord[] = stack.map((c) => ({ ...c }));
  steps.push({
    rows: input.rows,
    cols: input.cols,
    cells: emptyCells(input.rows, input.cols),
    rowLabels: [],
    colLabels: [],
    current: partial.current,
    highlighted: partial.highlighted ?? [],
    path: [],
    walls: listWalls(isWall, input.rows, input.cols),
    start: null,
    goal: null,
    frontier,
    visited,
    message: partial.message,
    lineNumber: partial.lineNumber,
  });
}

function unvisitedNeighbors(
  cell: GridCoord,
  isWall: boolean[][],
  rows: number,
  cols: number
): { neighbor: GridCoord; between: GridCoord }[] {
  const offsets = [
    { dr: -2, dc: 0 },
    { dr: 2, dc: 0 },
    { dr: 0, dc: -2 },
    { dr: 0, dc: 2 },
  ];
  const out: { neighbor: GridCoord; between: GridCoord }[] = [];
  for (const o of offsets) {
    const n = { row: cell.row + o.dr, col: cell.col + o.dc };
    if (n.row <= 0 || n.row >= rows - 1 || n.col <= 0 || n.col >= cols - 1) {
      continue;
    }
    if (!isWall[n.row]![n.col]) continue;
    const between = { row: cell.row + o.dr / 2, col: cell.col + o.dc / 2 };
    out.push({ neighbor: n, between });
  }
  return out;
}

function snapStartCell(input: PathfindingInput): GridCoord {
  const r =
    input.start.row % 2 === 1
      ? input.start.row
      : Math.max(1, input.start.row - 1);
  const c =
    input.start.col % 2 === 1
      ? input.start.col
      : Math.max(1, input.start.col - 1);
  return {
    row: Math.min(r, input.rows - 2),
    col: Math.min(c, input.cols - 2),
  };
}

export function mazeRecursiveBacktracker(
  input: PathfindingInput
): AlgorithmVisualization {
  const { rows, cols } = input;
  const isWall: boolean[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => true)
  );
  const carved = new Set<string>();
  const stack: GridCoord[] = [];
  const rng = mulberry32(0x9e3779b9);
  const args: BuildArgs = { input, isWall, carved, stack, rng };

  const steps: GridStep[] = [];
  pushStep(steps, args, {
    current: null,
    message: `Initialize: every cell is a wall on a ${rows}×${cols} grid.`,
    lineNumber: 1,
  });

  const startCell = snapStartCell(input);
  isWall[startCell.row]![startCell.col] = false;
  carved.add(coordKey(startCell));
  stack.push(startCell);
  pushStep(steps, args, {
    current: startCell,
    message: `Carve start at (${startCell.row},${startCell.col}).`,
    lineNumber: 2,
  });

  while (stack.length > 0) {
    const current = stack[stack.length - 1]!;
    const candidates = unvisitedNeighbors(current, isWall, rows, cols);
    if (candidates.length === 0) {
      stack.pop();
      pushStep(steps, args, {
        current,
        message: `Backtrack from (${current.row},${current.col}) — no walled neighbors.`,
        lineNumber: 7,
      });
      continue;
    }
    const pick = candidates[Math.floor(rng() * candidates.length)]!;
    isWall[pick.between.row]![pick.between.col] = false;
    isWall[pick.neighbor.row]![pick.neighbor.col] = false;
    carved.add(coordKey(pick.between));
    carved.add(coordKey(pick.neighbor));
    stack.push(pick.neighbor);
    pushStep(steps, args, {
      current: pick.neighbor,
      highlighted: [pick.between],
      message: `Carve (${pick.between.row},${pick.between.col}) → (${pick.neighbor.row},${pick.neighbor.col}).`,
      lineNumber: 11,
    });
  }

  pushStep(steps, args, {
    current: null,
    message: `Maze complete — ${carved.size} cells carved.`,
    lineNumber: 0,
  });

  return createVisualization("mazeRecursiveBacktracker", "grid-2d", steps, {
    timeComplexity: "O(rows × cols)",
    spaceComplexity: "O(rows × cols)",
    reference:
      "https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search",
    pseudoCode: PSEUDO,
  });
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
