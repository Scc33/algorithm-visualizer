"use client";

import type { GridCoord, GridStep } from "@/lib/types";

function coordKey(c: GridCoord): string {
  return `${c.row}:${c.col}`;
}

interface CellSets {
  highlighted: Set<string>;
  path: Set<string>;
  walls: Set<string>;
  frontier: Set<string>;
  visited: Set<string>;
}

function isCoordEqual(a: GridCoord | null | undefined, row: number, col: number): boolean {
  return !!a && a.row === row && a.col === col;
}

function cellClasses(
  row: number,
  col: number,
  step: GridStep,
  sets: CellSets
): string {
  const key = coordKey({ row, col });
  if (sets.walls.has(key)) return "bg-gray-800 border-gray-900";
  if (isCoordEqual(step.start, row, col))
    return "bg-green-400 border-green-600 text-white";
  if (isCoordEqual(step.goal, row, col))
    return "bg-red-400 border-red-600 text-white";
  if (isCoordEqual(step.current, row, col))
    return "bg-yellow-300 border-yellow-500";
  if (sets.path.has(key)) return "bg-emerald-200 border-emerald-400";
  if (sets.frontier.has(key)) return "bg-sky-200 border-sky-400";
  if (sets.visited.has(key)) return "bg-indigo-100 border-indigo-300";
  if (sets.highlighted.has(key)) return "bg-blue-100 border-blue-300";
  return "bg-white border-gray-200";
}

interface Grid2DProps {
  step: GridStep;
}

export default function Grid2D({ step }: Grid2DProps) {
  const sets: CellSets = {
    highlighted: new Set(step.highlighted.map(coordKey)),
    path: new Set(step.path.map(coordKey)),
    walls: new Set((step.walls ?? []).map(coordKey)),
    frontier: new Set((step.frontier ?? []).map(coordKey)),
    visited: new Set((step.visited ?? []).map(coordKey)),
  };

  const hasColLabels = step.colLabels.length > 0;
  const hasRowLabels = step.rowLabels.length > 0;
  const cellSize = step.cols > 8 ? "h-9 w-9 text-xs" : "h-11 w-11 text-sm";

  return (
    <div className="flex w-full flex-col items-center overflow-x-auto bg-white p-6">
      <table className="border-separate border-spacing-1">
        {hasColLabels && (
          <thead>
            <tr>
              {hasRowLabels && <th className={cellSize} />}
              {step.colLabels.map((label, i) => (
                <th
                  key={`col-${i}`}
                  className={`${cellSize} font-mono text-gray-500`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {step.cells.map((row, rIdx) => (
            <tr key={`row-${rIdx}`}>
              {hasRowLabels && (
                <th
                  className={`${cellSize} font-mono text-gray-500`}
                  scope="row"
                >
                  {step.rowLabels[rIdx] ?? ""}
                </th>
              )}
              {row.map((value, cIdx) => (
                <td
                  key={`cell-${rIdx}-${cIdx}`}
                  className={`${cellSize} rounded border text-center font-mono font-medium text-gray-800 transition-colors ${cellClasses(
                    rIdx,
                    cIdx,
                    step,
                    sets
                  )}`}
                >
                  {value === null ? "" : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {step.message && (
        <div className="mt-4 w-full rounded-md bg-gray-50 p-3 text-sm text-gray-700">
          {step.message}
        </div>
      )}
    </div>
  );
}
