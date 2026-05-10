import type { AlgorithmVisualization, GridCell, GridStep } from "../../types";
import { createVisualization } from "../utils";

const PSEUDO = [
  "procedure editDistance(a, b)",
  "  m := length(a); n := length(b)",
  "  dp[0..m][0..n]",
  "  for i in 0..m: dp[i][0] := i",
  "  for j in 0..n: dp[0][j] := j",
  "  for i in 1..m do",
  "    for j in 1..n do",
  "      if a[i-1] = b[j-1] then",
  "        dp[i][j] := dp[i-1][j-1]",
  "      else",
  "        dp[i][j] := 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])",
  "  return dp[m][n]",
];

function makeGrid(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null as GridCell)
  );
}

function copy(grid: GridCell[][]): GridCell[][] {
  return grid.map((row) => [...row]);
}

function makeLabels(prefix: string, str: string): string[] {
  return [prefix, ...str.split("")];
}

interface FillContext {
  a: string;
  b: string;
  dp: GridCell[][];
  steps: GridStep[];
  rowLabels: string[];
  colLabels: string[];
}

function pushStep(
  ctx: FillContext,
  partial: Omit<GridStep, "rows" | "cols" | "cells" | "rowLabels" | "colLabels">
): void {
  ctx.steps.push({
    rows: ctx.dp.length,
    cols: ctx.dp[0]!.length,
    cells: copy(ctx.dp),
    rowLabels: ctx.rowLabels,
    colLabels: ctx.colLabels,
    ...partial,
  });
}

function fillBaseRow(ctx: FillContext): void {
  for (let i = 0; i < ctx.dp.length; i++) {
    ctx.dp[i]![0] = i;
    pushStep(ctx, {
      current: { row: i, col: 0 },
      highlighted: [],
      path: [],
      message: `Base case: ${i} edits to convert empty to "${ctx.a.slice(0, i)}".`,
      lineNumber: 3,
    });
  }
}

function fillBaseCol(ctx: FillContext): void {
  for (let j = 1; j < ctx.dp[0]!.length; j++) {
    ctx.dp[0]![j] = j;
    pushStep(ctx, {
      current: { row: 0, col: j },
      highlighted: [],
      path: [],
      message: `Base case: ${j} edits to convert empty to "${ctx.b.slice(0, j)}".`,
      lineNumber: 4,
    });
  }
}

function fillCell(ctx: FillContext, i: number, j: number): void {
  const aChar = ctx.a[i - 1]!;
  const bChar = ctx.b[j - 1]!;
  const deps = [
    { row: i - 1, col: j - 1 },
    { row: i - 1, col: j },
    { row: i, col: j - 1 },
  ];
  const diag = ctx.dp[i - 1]![j - 1]! as number;
  if (aChar === bChar) {
    ctx.dp[i]![j] = diag;
    pushStep(ctx, {
      current: { row: i, col: j },
      highlighted: deps,
      path: [],
      message: `'${aChar}' = '${bChar}'; copy diagonal ${diag}.`,
      lineNumber: 8,
    });
    return;
  }
  const up = ctx.dp[i - 1]![j]! as number;
  const left = ctx.dp[i]![j - 1]! as number;
  const value = 1 + Math.min(up, left, diag);
  ctx.dp[i]![j] = value;
  pushStep(ctx, {
    current: { row: i, col: j },
    highlighted: deps,
    path: [],
    message: `'${aChar}' ≠ '${bChar}'; 1 + min(${up}, ${left}, ${diag}) = ${value}.`,
    lineNumber: 10,
  });
}

function tracebackPath(ctx: FillContext): { row: number; col: number }[] {
  const path: { row: number; col: number }[] = [];
  let i = ctx.dp.length - 1;
  let j = ctx.dp[0]!.length - 1;
  while (i > 0 || j > 0) {
    path.push({ row: i, col: j });
    if (i === 0) {
      j--;
      continue;
    }
    if (j === 0) {
      i--;
      continue;
    }
    const diag = ctx.dp[i - 1]![j - 1]! as number;
    const up = ctx.dp[i - 1]![j]! as number;
    const left = ctx.dp[i]![j - 1]! as number;
    const min = Math.min(diag, up, left);
    if (diag === min) {
      i--;
      j--;
    } else if (up === min) {
      i--;
    } else {
      j--;
    }
  }
  path.push({ row: 0, col: 0 });
  return path.reverse();
}

export function editDistance(a: string, b: string): AlgorithmVisualization {
  const m = a.length;
  const n = b.length;
  const dp = makeGrid(m + 1, n + 1);
  const ctx: FillContext = {
    a,
    b,
    dp,
    steps: [],
    rowLabels: makeLabels("ε", a),
    colLabels: makeLabels("ε", b),
  };

  pushStep(ctx, {
    current: null,
    highlighted: [],
    path: [],
    message: `Computing edit distance from "${a}" to "${b}".`,
    lineNumber: 0,
  });

  fillBaseRow(ctx);
  fillBaseCol(ctx);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      fillCell(ctx, i, j);
    }
  }

  const path = tracebackPath(ctx);
  pushStep(ctx, {
    current: { row: m, col: n },
    highlighted: [],
    path,
    message: `Edit distance is ${dp[m]![n]}.`,
    lineNumber: 11,
  });

  return createVisualization("editDistance", "grid-2d", ctx.steps, {
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    reference: "https://en.wikipedia.org/wiki/Edit_distance",
    pseudoCode: PSEUDO,
  });
}
