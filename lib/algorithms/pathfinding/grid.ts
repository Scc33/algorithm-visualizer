import type { GridCoord } from "../../types";

export interface PathfindingInput {
  rows: number;
  cols: number;
  start: GridCoord;
  goal: GridCoord;
  walls: GridCoord[];
}

export function coordKey(c: GridCoord): string {
  return `${c.row}:${c.col}`;
}

export function inBounds(rows: number, cols: number, c: GridCoord): boolean {
  return c.row >= 0 && c.row < rows && c.col >= 0 && c.col < cols;
}

export function neighbors4(c: GridCoord): GridCoord[] {
  return [
    { row: c.row - 1, col: c.col },
    { row: c.row + 1, col: c.col },
    { row: c.row, col: c.col - 1 },
    { row: c.row, col: c.col + 1 },
  ];
}

export function manhattan(a: GridCoord, b: GridCoord): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function clampCoord(
  rows: number,
  cols: number,
  c: GridCoord
): GridCoord {
  return {
    row: Math.max(0, Math.min(rows - 1, c.row)),
    col: Math.max(0, Math.min(cols - 1, c.col)),
  };
}

export function coordFromKey(key: string): GridCoord {
  const [r, c] = key.split(":");
  return { row: Number(r), col: Number(c) };
}

export function neighborMessage(current: GridCoord, count: number): string {
  if (count === 0) {
    return `No neighbors of (${current.row},${current.col}) to relax.`;
  }
  const plural = count === 1 ? "" : "s";
  return `Relaxed ${count} neighbor${plural} of (${current.row},${current.col}).`;
}

export function popLowestKey(
  keys: Set<string>,
  scoreOf: (key: string) => number
): string | null {
  let best: string | null = null;
  let bestScore = Infinity;
  for (const k of keys) {
    const s = scoreOf(k);
    if (s < bestScore) {
      bestScore = s;
      best = k;
    }
  }
  return best;
}
