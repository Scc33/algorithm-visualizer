import { describe, it, expect } from "vitest";
import { aStar } from "@/lib/algorithms/pathfinding/aStar";
import { dijkstraGrid } from "@/lib/algorithms/pathfinding/dijkstraGrid";
import { mazeRecursiveBacktracker } from "@/lib/algorithms/pathfinding/mazeRecursiveBacktracker";
import type { PathfindingInput } from "@/lib/algorithms/pathfinding/grid";
import type { AlgorithmVisualization, GridCoord, GridStep } from "@/lib/types";

function input(overrides: Partial<PathfindingInput> = {}): PathfindingInput {
  return {
    rows: 5,
    cols: 5,
    start: { row: 0, col: 0 },
    goal: { row: 4, col: 4 },
    walls: [],
    ...overrides,
  };
}

function lastStep(viz: AlgorithmVisualization): GridStep {
  return viz.steps[viz.steps.length - 1] as GridStep;
}

function pathContains(path: GridCoord[], c: GridCoord): boolean {
  return path.some((p) => p.row === c.row && p.col === c.col);
}

describe("aStar", () => {
  it("returns metadata bound to grid-2d", () => {
    const viz = aStar(input());
    expect(viz.key).toBe("aStar");
    expect(viz.category).toBe("pathfinding");
    expect(viz.primitive).toBe("grid-2d");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("finds a path of optimal length on an empty grid", () => {
    const viz = aStar(input());
    const last = lastStep(viz);
    expect(last.path.length).toBe(9);
    expect(pathContains(last.path, { row: 0, col: 0 })).toBe(true);
    expect(pathContains(last.path, { row: 4, col: 4 })).toBe(true);
  });

  it("routes around a wall barrier", () => {
    const walls: GridCoord[] = [
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
      { row: 3, col: 2 },
    ];
    const viz = aStar(input({ walls }));
    const last = lastStep(viz);
    expect(last.path.length).toBeGreaterThan(0);
    for (const w of walls) {
      expect(pathContains(last.path, w)).toBe(false);
    }
  });

  it("reports failure when goal is walled in", () => {
    const walls: GridCoord[] = [
      { row: 3, col: 4 },
      { row: 4, col: 3 },
    ];
    const viz = aStar(input({ walls }));
    const last = lastStep(viz);
    expect(last.path.length).toBe(0);
    expect(last.message.toLowerCase()).toContain("no path");
  });

  it("trivially succeeds when start equals goal", () => {
    const viz = aStar(input({ goal: { row: 0, col: 0 } }));
    const last = lastStep(viz);
    expect(last.path.length).toBe(1);
  });
});

describe("dijkstraGrid", () => {
  it("returns metadata bound to grid-2d", () => {
    const viz = dijkstraGrid(input());
    expect(viz.key).toBe("dijkstraGrid");
    expect(viz.primitive).toBe("grid-2d");
  });

  it("finds optimal path on empty grid", () => {
    const viz = dijkstraGrid(input());
    const last = lastStep(viz);
    expect(last.path.length).toBe(9);
  });

  it("matches A* path length when both are optimal", () => {
    const walls: GridCoord[] = [{ row: 2, col: 2 }];
    const a = lastStep(aStar(input({ walls })));
    const d = lastStep(dijkstraGrid(input({ walls })));
    expect(a.path.length).toBe(d.path.length);
  });

  it("reports failure when goal is unreachable", () => {
    const walls: GridCoord[] = [
      { row: 3, col: 4 },
      { row: 4, col: 3 },
    ];
    const viz = dijkstraGrid(input({ walls }));
    const last = lastStep(viz);
    expect(last.path.length).toBe(0);
  });
});

describe("mazeRecursiveBacktracker", () => {
  it("returns metadata bound to grid-2d", () => {
    const viz = mazeRecursiveBacktracker(input({ rows: 7, cols: 7 }));
    expect(viz.key).toBe("mazeRecursiveBacktracker");
    expect(viz.primitive).toBe("grid-2d");
    expect(viz.steps.length).toBeGreaterThan(1);
  });

  it("carves at least one passage on a 7x7 grid", () => {
    const viz = mazeRecursiveBacktracker(input({ rows: 7, cols: 7 }));
    const last = lastStep(viz);
    expect(last.visited?.length ?? 0).toBeGreaterThan(1);
    const wallCount = last.walls?.length ?? 0;
    expect(wallCount).toBeGreaterThan(0);
    expect(wallCount).toBeLessThan(7 * 7);
  });

  it("carved cells and wall cells are disjoint", () => {
    const viz = mazeRecursiveBacktracker(input({ rows: 7, cols: 7 }));
    const last = lastStep(viz);
    const wallSet = new Set(
      (last.walls ?? []).map((w) => `${w.row}:${w.col}`)
    );
    for (const c of last.visited ?? []) {
      expect(wallSet.has(`${c.row}:${c.col}`)).toBe(false);
    }
  });
});
