import { describe, it, expect } from "vitest";
import { dfs } from "@/lib/algorithms/graph/dfs";
import { bfs } from "@/lib/algorithms/graph/bfs";
import { dijkstra } from "@/lib/algorithms/graph/dijkstra";
import { topologicalSort } from "@/lib/algorithms/graph/topologicalSort";
import {
  sampleDAG,
  sampleUndirectedGraph,
  sampleWeightedGraph,
} from "@/lib/algorithms/graph/sampleGraphs";
import type { AlgorithmVisualization, Graph, GraphStep } from "@/lib/types";

type GraphFn = (graph: Graph, start?: number) => AlgorithmVisualization;

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
    const viz = fn(sampleUndirectedGraph(), 0);
    expect(viz.key).toBe(key);
    expect(viz.category).toBe("graph");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("visits every reachable vertex from start vertex 0", () => {
    const viz = fn(sampleUndirectedGraph(), 0);
    const final = lastStep(viz);
    expect(final.visited.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("clamps invalid start vertex to 0", () => {
    const viz = fn(sampleUndirectedGraph(), 999);
    const final = lastStep(viz);
    expect(final.visited.length).toBeGreaterThan(0);
  });

  it("each step embeds the original graph", () => {
    const viz = fn(sampleUndirectedGraph(), 0);
    const step = lastStep(viz);
    expect(step.graph.numVertices).toBe(6);
    expect(step.graph.directed).toBe(false);
  });
});

describe("dijkstra", () => {
  it("returns metadata", () => {
    const viz = dijkstra(sampleWeightedGraph(), 0);
    expect(viz.key).toBe("dijkstra");
    expect(viz.category).toBe("graph");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("visits all 6 vertices in the predefined graph", () => {
    const viz = dijkstra(sampleWeightedGraph(), 0);
    const final = lastStep(viz);
    expect(final.visited.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("starts from the given source", () => {
    const viz = dijkstra(sampleWeightedGraph(), 2);
    const steps = viz.steps as GraphStep[];
    const firstVisit = steps.find((s) => s.visited.length > 0);
    expect(firstVisit?.visited).toContain(2);
  });

  it("clamps invalid source to 0", () => {
    const viz = dijkstra(sampleWeightedGraph(), -1);
    const final = lastStep(viz);
    expect(final.visited.length).toBe(6);
  });
});

describe("topologicalSort", () => {
  it("returns metadata", () => {
    const viz = topologicalSort(sampleDAG());
    expect(viz.key).toBe("topologicalSort");
    expect(viz.category).toBe("graph");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("produces a valid ordering of all vertices", () => {
    const viz = topologicalSort(sampleDAG());
    const final = lastStep(viz);
    expect(final.stack.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("orders dependencies before dependents", () => {
    const viz = topologicalSort(sampleDAG());
    const order = lastStep(viz).stack;
    const indexOf = (v: number) => order.indexOf(v);
    // sampleDAG: 0->{1,2}, 1->3, 2->{3,4}, 3->5, 4->5
    expect(indexOf(0)).toBeLessThan(indexOf(1));
    expect(indexOf(0)).toBeLessThan(indexOf(2));
    expect(indexOf(1)).toBeLessThan(indexOf(3));
    expect(indexOf(2)).toBeLessThan(indexOf(3));
    expect(indexOf(2)).toBeLessThan(indexOf(4));
    expect(indexOf(3)).toBeLessThan(indexOf(5));
    expect(indexOf(4)).toBeLessThan(indexOf(5));
  });

  it("each step embeds the directed graph", () => {
    const viz = topologicalSort(sampleDAG());
    const step = lastStep(viz);
    expect(step.graph.directed).toBe(true);
  });
});
