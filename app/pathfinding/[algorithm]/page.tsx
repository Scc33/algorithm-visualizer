"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import GridInputPanel from "@/components/visualizer/GridInputPanel";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getPathfindingAlgorithm } from "@/lib/algorithms";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import type { GridCoord } from "@/lib/types";

interface GridConfig {
  rows: number;
  cols: number;
  start: GridCoord;
  goal: GridCoord;
  walls: GridCoord[];
}

const DEFAULT_ROWS = 11;
const DEFAULT_COLS = 15;

function defaultConfig(): GridConfig {
  return {
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    start: { row: 5, col: 1 },
    goal: { row: 5, col: 13 },
    walls: [
      { row: 2, col: 7 },
      { row: 3, col: 7 },
      { row: 4, col: 7 },
      { row: 5, col: 7 },
      { row: 6, col: 7 },
      { row: 7, col: 7 },
      { row: 8, col: 7 },
    ],
  };
}

function clampInt(
  value: number | null,
  min: number,
  max: number,
  fallback: number
): number {
  if (value === null || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function parseCoord(raw: string | null): GridCoord | null {
  if (!raw) return null;
  const [r, c] = raw.split(",").map((s) => Number(s));
  if (!Number.isFinite(r) || !Number.isFinite(c)) return null;
  return { row: r as number, col: c as number };
}

function parseWalls(raw: string | null): GridCoord[] | null {
  if (!raw) return null;
  if (raw.trim() === "") return [];
  const out: GridCoord[] = [];
  for (const part of raw.split(";")) {
    const coord = parseCoord(part);
    if (!coord) return null;
    out.push(coord);
  }
  return out;
}

function configFromParams(
  params: URLSearchParams,
  fallback: GridConfig
): GridConfig {
  const rows = clampInt(Number(params.get("r")), 5, 25, fallback.rows);
  const cols = clampInt(Number(params.get("c")), 5, 25, fallback.cols);
  const startRaw = parseCoord(params.get("s"));
  const goalRaw = parseCoord(params.get("g"));
  const wallsRaw = parseWalls(params.get("w"));
  const start: GridCoord = startRaw
    ? {
        row: clampInt(startRaw.row, 0, rows - 1, fallback.start.row),
        col: clampInt(startRaw.col, 0, cols - 1, fallback.start.col),
      }
    : { row: Math.min(fallback.start.row, rows - 1), col: Math.min(fallback.start.col, cols - 1) };
  const goal: GridCoord = goalRaw
    ? {
        row: clampInt(goalRaw.row, 0, rows - 1, fallback.goal.row),
        col: clampInt(goalRaw.col, 0, cols - 1, fallback.goal.col),
      }
    : { row: Math.min(fallback.goal.row, rows - 1), col: Math.min(fallback.goal.col, cols - 1) };
  const walls = (wallsRaw ?? fallback.walls).filter(
    (w) => w.row < rows && w.col < cols
  );
  return { rows, cols, start, goal, walls };
}

function configToParams(cfg: GridConfig): URLSearchParams {
  const params = new URLSearchParams();
  params.set("r", String(cfg.rows));
  params.set("c", String(cfg.cols));
  params.set("s", `${cfg.start.row},${cfg.start.col}`);
  params.set("g", `${cfg.goal.row},${cfg.goal.col}`);
  params.set("w", cfg.walls.map((w) => `${w.row},${w.col}`).join(";"));
  return params;
}

function randomWalls(rows: number, cols: number, density: number): GridCoord[] {
  const walls: GridCoord[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < density) walls.push({ row: r, col: c });
    }
  }
  return walls;
}

function randomizeWalls(prev: GridConfig): GridConfig {
  const walls = randomWalls(prev.rows, prev.cols, 0.22).filter(
    (w) =>
      !(w.row === prev.start.row && w.col === prev.start.col) &&
      !(w.row === prev.goal.row && w.col === prev.goal.col)
  );
  return { ...prev, walls };
}

function clearWalls(prev: GridConfig): GridConfig {
  return { ...prev, walls: [] };
}

function PathfindingPageInner() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch } = useAlgorithm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initializedFromUrl = useRef(false);

  const algorithmInfo = availableAlgorithms[algorithmKey];

  const [config, setConfig] = useState<GridConfig>(defaultConfig);

  useEffect(() => {
    if (initializedFromUrl.current) return;
    initializedFromUrl.current = true;
    setConfig(configFromParams(searchParams, defaultConfig()));
  }, [searchParams]);

  useEffect(() => {
    if (!algorithmKey) return;
    dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });
    const fn = getPathfindingAlgorithm(algorithmKey);
    if (!fn) return;
    try {
      const viz = fn(config);
      dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
    } catch (error) {
      console.error("Error generating visualization:", error);
    }
  }, [algorithmKey, config, dispatch]);

  useEffect(() => {
    router.replace(`?${configToParams(config).toString()}`, { scroll: false });
  }, [config, router]);

  const handleRandomize = useCallback(() => {
    setConfig(randomizeWalls);
  }, []);

  const handleClearWalls = useCallback(() => {
    setConfig(clearWalls);
  }, []);

  if (!algorithmInfo) {
    return (
      <PageLayout title="Algorithm Not Found">
        <div className="py-12 text-center">
          <h2 className="heading-lg text-red-600">Algorithm Not Found</h2>
          <p className="mt-4 text-gray-600">
            The algorithm you are looking for does not exist or is not
            available.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={algorithmInfo.name} subtitle={algorithmInfo.subtitle}>
      <div className="mb-6">
        <GridInputPanel
          rows={config.rows}
          cols={config.cols}
          start={config.start}
          goal={config.goal}
          walls={config.walls}
          onChange={setConfig}
          onRandomize={handleRandomize}
          onClearWalls={handleClearWalls}
        />
      </div>
      <AlgorithmVisualizer />
    </PageLayout>
  );
}

export default function PathfindingAlgorithmPage() {
  return (
    <Suspense>
      <PathfindingPageInner />
    </Suspense>
  );
}
