import { describe, it, expect } from "vitest";
import { dfs } from "@/lib/algorithms/graph/dfs";
import { bfs } from "@/lib/algorithms/graph/bfs";
import { dijkstra } from "@/lib/algorithms/graph/dijkstra";
import { topologicalSort } from "@/lib/algorithms/graph/topologicalSort";
import type { AlgorithmVisualization, GraphStep } from "@/lib/types";

type GraphFn = (arr: number[], start?: number) => AlgorithmVisualization;

const traversals: Array<{ name: string; key: string; fn: GraphFn }> = [
  { name: "dfs", key: "dfs", fn: dfs },
  { name: "bfs", key: "bfs", fn: bfs },
];

function lastStep(viz: AlgorithmVisualization): GraphStep {
  const steps = viz.steps as GraphStep[];
  return steps[steps.length - 1]!;
}

describe.each(traversals)("$name", ({ key, fn }) => {
  it("returns metadata", () => {
    const viz = fn([], 0);
    expect(viz.key).toBe(key);
    expect(viz.category).toBe("graph");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("visits every reachable vertex from start vertex 0", () => {
    const viz = fn([], 0);
    const final = lastStep(viz);
    // The hardcoded graph in dfs/bfs has 6 fully connected vertices
    expect(final.visited.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("clamps invalid start vertex to 0", () => {
    const viz = fn([], 999);
    const final = lastStep(viz);
    expect(final.visited.length).toBeGreaterThan(0);
  });
});

describe("dijkstra", () => {
  it("returns metadata", () => {
    const viz = dijkstra([], 0);
    expect(viz.key).toBe("dijkstra");
    expect(viz.category).toBe("graph");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("visits all 6 vertices in the predefined graph", () => {
    const viz = dijkstra([], 0);
    const final = lastStep(viz);
    expect(final.visited.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("starts from the given source", () => {
    const viz = dijkstra([], 2);
    const steps = viz.steps as GraphStep[];
    // First non-empty visited entry should include 2
    const firstVisit = steps.find((s) => s.visited.length > 0);
    expect(firstVisit?.visited).toContain(2);
  });

  it("clamps invalid source to 0", () => {
    const viz = dijkstra([], -1);
    const final = lastStep(viz);
    expect(final.visited.length).toBe(6);
  });
});

describe("topologicalSort", () => {
  it("returns metadata", () => {
    const viz = topologicalSort([]);
    expect(viz.key).toBe("topologicalSort");
    expect(viz.category).toBe("graph");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("produces a valid ordering of all vertices", () => {
    const viz = topologicalSort([]);
    const final = lastStep(viz);
    // The DAG has 6 vertices: 0 -> {1,2}, 1 -> 3, 2 -> {3,4}, 3 -> 5, 4 -> 5
    expect(final.stack.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("orders dependencies before dependents", () => {
    const viz = topologicalSort([]);
    const order = lastStep(viz).stack;
    const indexOf = (v: number) => order.indexOf(v);
    // 0 must come before 1, 2; 1 before 3; 2 before 3, 4; 3 before 5; 4 before 5
    expect(indexOf(0)).toBeLessThan(indexOf(1));
    expect(indexOf(0)).toBeLessThan(indexOf(2));
    expect(indexOf(1)).toBeLessThan(indexOf(3));
    expect(indexOf(2)).toBeLessThan(indexOf(3));
    expect(indexOf(2)).toBeLessThan(indexOf(4));
    expect(indexOf(3)).toBeLessThan(indexOf(5));
    expect(indexOf(4)).toBeLessThan(indexOf(5));
  });
});
