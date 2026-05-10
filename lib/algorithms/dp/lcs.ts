import type {
  AlgorithmVisualization,
  GridCell,
  GridStep,
} from "../../types";
import { createVisualization } from "../utils";

const PSEUDO = [
  "procedure lcs(a, b)",
  "  m := length(a); n := length(b)",
  "  dp[0..m][0..n] := 0",
  "  for i in 1..m do",
  "    for j in 1..n do",
  "      if a[i-1] = b[j-1] then",
  "        dp[i][j] := dp[i-1][j-1] + 1",
  "      else",
  "        dp[i][j] := max(dp[i-1][j], dp[i][j-1])",
  "  return dp[m][n]",
];

function makeGrid(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0 as GridCell)
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
  partial: Omit<
    GridStep,
    "rows" | "cols" | "cells" | "rowLabels" | "colLabels"
  >
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

function fillCell(ctx: FillContext, i: number, j: number): void {
  const aChar = ctx.a[i - 1]!;
  const bChar = ctx.b[j - 1]!;
  if (aChar === bChar) {
    const v = (ctx.dp[i - 1]![j - 1]! as number) + 1;
    ctx.dp[i]![j] = v;
    pushStep(ctx, {
      current: { row: i, col: j },
      highlighted: [{ row: i - 1, col: j - 1 }],
      path: [],
      message: `'${aChar}' = '${bChar}'; extend LCS to ${v}.`,
      lineNumber: 6,
    });
    return;
  }
  const up = ctx.dp[i - 1]![j]! as number;
  const left = ctx.dp[i]![j - 1]! as number;
  const v = Math.max(up, left);
  ctx.dp[i]![j] = v;
  pushStep(ctx, {
    current: { row: i, col: j },
    highlighted: [
      { row: i - 1, col: j },
      { row: i, col: j - 1 },
    ],
    path: [],
    message: `'${aChar}' ≠ '${bChar}'; max(${up}, ${left}) = ${v}.`,
    lineNumber: 8,
  });
}

function tracebackPath(
  a: string,
  b: string,
  dp: GridCell[][]
): { row: number; col: number }[] {
  const path: { row: number; col: number }[] = [];
  let i = dp.length - 1;
  let j = dp[0]!.length - 1;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      path.push({ row: i, col: j });
      i--;
      j--;
      continue;
    }
    const up = dp[i - 1]![j]! as number;
    const left = dp[i]![j - 1]! as number;
    if (up >= left) i--;
    else j--;
  }
  return path.reverse();
}

export function lcs(a: string, b: string): AlgorithmVisualization {
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
    message: `Computing LCS of "${a}" and "${b}".`,
    lineNumber: 0,
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      fillCell(ctx, i, j);
    }
  }

  const path = tracebackPath(a, b, dp);
  const lcsLength = dp[m]![n] as number;
  pushStep(ctx, {
    current: { row: m, col: n },
    highlighted: [],
    path,
    message: `LCS length is ${lcsLength}.`,
    lineNumber: 9,
  });

  return createVisualization("lcs", "grid-2d", ctx.steps, {
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    reference: "https://en.wikipedia.org/wiki/Longest_common_subsequence",
    pseudoCode: PSEUDO,
  });
}
