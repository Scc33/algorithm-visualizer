"use client";

import { useState } from "react";
import type { GridCoord } from "@/lib/types";

type EditMode = "wall" | "start" | "goal";

interface GridConfig {
  rows: number;
  cols: number;
  start: GridCoord;
  goal: GridCoord;
  walls: GridCoord[];
}

interface GridInputPanelProps {
  rows: number;
  cols: number;
  start: GridCoord;
  goal: GridCoord;
  walls: GridCoord[];
  onChange: (next: GridConfig) => void;
  onRandomize: () => void;
  onClearWalls: () => void;
}

function coordKey(c: GridCoord): string {
  return `${c.row}:${c.col}`;
}

function cellClass(
  isStart: boolean,
  isGoal: boolean,
  isWall: boolean
): string {
  if (isStart) return "bg-green-400 border-green-600";
  if (isGoal) return "bg-red-400 border-red-600";
  if (isWall) return "bg-gray-800 border-gray-900";
  return "bg-white border-gray-200 hover:bg-gray-50";
}

function applyClickInMode(
  mode: EditMode,
  config: GridConfig,
  row: number,
  col: number
): GridConfig | null {
  const key = `${row}:${col}`;
  const startKey = coordKey(config.start);
  const goalKey = coordKey(config.goal);
  if (mode === "start") {
    if (key === goalKey) return null;
    return {
      ...config,
      start: { row, col },
      walls: config.walls.filter((w) => coordKey(w) !== key),
    };
  }
  if (mode === "goal") {
    if (key === startKey) return null;
    return {
      ...config,
      goal: { row, col },
      walls: config.walls.filter((w) => coordKey(w) !== key),
    };
  }
  if (key === startKey || key === goalKey) return null;
  const wallSet = new Set(config.walls.map(coordKey));
  const walls = wallSet.has(key)
    ? config.walls.filter((w) => coordKey(w) !== key)
    : [...config.walls, { row, col }];
  return { ...config, walls };
}

function resize(config: GridConfig, nextRows: number, nextCols: number): GridConfig {
  return {
    rows: nextRows,
    cols: nextCols,
    start: {
      row: Math.min(config.start.row, nextRows - 1),
      col: Math.min(config.start.col, nextCols - 1),
    },
    goal: {
      row: Math.min(config.goal.row, nextRows - 1),
      col: Math.min(config.goal.col, nextCols - 1),
    },
    walls: config.walls.filter((w) => w.row < nextRows && w.col < nextCols),
  };
}

interface ModeToggleProps {
  mode: EditMode;
  onChange: (m: EditMode) => void;
}

function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="font-medium text-gray-700">Click to edit:</span>
      {(["wall", "start", "goal"] as const).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`rounded px-3 py-1 text-xs font-medium uppercase tracking-wide ${
            mode === m
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

interface SizeInputsProps {
  rows: number;
  cols: number;
  onResize: (rows: number, cols: number) => void;
}

function SizeInputs({ rows, cols, onResize }: SizeInputsProps) {
  const onChange = (which: "rows" | "cols", raw: string) => {
    const v = Number(raw);
    if (!Number.isFinite(v) || v < 5 || v > 25) return;
    if (which === "rows") onResize(v, cols);
    else onResize(rows, v);
  };
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <label className="flex items-center gap-2">
        Rows
        <input
          type="number"
          min={5}
          max={25}
          value={rows}
          onChange={(e) => onChange("rows", e.target.value)}
          className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
        />
      </label>
      <label className="flex items-center gap-2">
        Cols
        <input
          type="number"
          min={5}
          max={25}
          value={cols}
          onChange={(e) => onChange("cols", e.target.value)}
          className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
        />
      </label>
    </div>
  );
}

interface CellGridProps {
  rows: number;
  cols: number;
  startKey: string;
  goalKey: string;
  wallSet: Set<string>;
  onCellClick: (row: number, col: number) => void;
}

function CellGrid({
  rows,
  cols,
  startKey,
  goalKey,
  wallSet,
  onCellClick,
}: CellGridProps) {
  const cellSize = cols > 12 ? "h-6 w-6" : "h-7 w-7";
  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex">
            {Array.from({ length: cols }).map((_, c) => {
              const key = `${r}:${c}`;
              const cls = cellClass(
                key === startKey,
                key === goalKey,
                wallSet.has(key)
              );
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCellClick(r, c)}
                  className={`${cellSize} m-0.5 rounded border ${cls} transition-colors`}
                  aria-label={`Cell ${r},${c}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GridInputPanel({
  rows,
  cols,
  start,
  goal,
  walls,
  onChange,
  onRandomize,
  onClearWalls,
}: GridInputPanelProps) {
  const [mode, setMode] = useState<EditMode>("wall");
  const config: GridConfig = { rows, cols, start, goal, walls };
  const startKey = coordKey(start);
  const goalKey = coordKey(goal);
  const wallSet = new Set(walls.map(coordKey));

  const handleCellClick = (row: number, col: number) => {
    const next = applyClickInMode(mode, config, row, col);
    if (next) onChange(next);
  };

  const handleResize = (nextRows: number, nextCols: number) => {
    onChange(resize(config, nextRows, nextCols));
  };

  return (
    <div className="card space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
          Grid Editor
        </h3>
        <div className="flex gap-2">
          <button onClick={onRandomize} className="btn btn-secondary text-xs">
            Randomize
          </button>
          <button onClick={onClearWalls} className="btn btn-secondary text-xs">
            Clear Walls
          </button>
        </div>
      </div>
      <ModeToggle mode={mode} onChange={setMode} />
      <SizeInputs rows={rows} cols={cols} onResize={handleResize} />
      <CellGrid
        rows={rows}
        cols={cols}
        startKey={startKey}
        goalKey={goalKey}
        wallSet={wallSet}
        onCellClick={handleCellClick}
      />
    </div>
  );
}
