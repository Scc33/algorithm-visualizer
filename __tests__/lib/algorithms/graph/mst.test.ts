import { describe, it, expect } from "vitest";
import { prim } from "@/lib/algorithms/graph/prim";
import { kruskal } from "@/lib/algorithms/graph/kruskal";
import {
  createGraph,
  sampleWeightedGraph,
} from "@/lib/algorithms/graph/sampleGraphs";
import type { Edge, GraphStep } from "@/lib/types";

function lastStep(steps: GraphStep[]): GraphStep {
  return steps[steps.length - 1]!;
}

function totalWeight(edges: Edge[]): number {
  return edges.reduce((sum, e) => sum + e.weight, 0);
}

// Triangle 0-1-2 with weights 1, 2, 3. MST is the two edges of weight 1 + 2 = 3.
function triangleGraph() {
  return createGraph({
    numVertices: 3,
    directed: false,
    edges: [
      { from: 0, to: 1, weight: 1 },
      { from: 1, to: 2, weight: 2 },
      { from: 0, to: 2, weight: 3 },
    ],
  });
}

describe("prim", () => {
  it("returns metadata", () => {
    const viz = prim(sampleWeightedGraph(), 0);
    expect(viz.key).toBe("prim");
    expect(viz.category).toBe("graph");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("produces an MST with V-1 edges and minimum total weight", () => {
    const viz = prim(triangleGraph(), 0);
    const final = lastStep(viz.steps as GraphStep[]);
    expect(final.treeEdges).toBeDefined();
    expect(final.treeEdges!.length).toBe(2);
    expect(totalWeight(final.treeEdges!)).toBe(3);
  });

  it("spans all reachable vertices on the sample graph", () => {
    const viz = prim(sampleWeightedGraph(), 0);
    const final = lastStep(viz.steps as GraphStep[]);
    expect(final.treeEdges!.length).toBe(5);
    expect(final.visited.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("clamps invalid start vertex to 0", () => {
    const viz = prim(sampleWeightedGraph(), 999);
    const final = lastStep(viz.steps as GraphStep[]);
    expect(final.treeEdges!.length).toBe(5);
  });
});

describe("kruskal", () => {
  it("returns metadata", () => {
    const viz = kruskal(sampleWeightedGraph());
    expect(viz.key).toBe("kruskal");
    expect(viz.category).toBe("graph");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("produces an MST with V-1 edges and minimum total weight", () => {
    const viz = kruskal(triangleGraph());
    const final = lastStep(viz.steps as GraphStep[]);
    expect(final.treeEdges!.length).toBe(2);
    expect(totalWeight(final.treeEdges!)).toBe(3);
  });

  it("spans all vertices on the sample graph", () => {
    const viz = kruskal(sampleWeightedGraph());
    const final = lastStep(viz.steps as GraphStep[]);
    expect(final.treeEdges!.length).toBe(5);
  });

  it("Prim and Kruskal agree on total MST weight", () => {
    const primViz = prim(sampleWeightedGraph(), 0);
    const kruskalViz = kruskal(sampleWeightedGraph());
    const primFinal = lastStep(primViz.steps as GraphStep[]);
    const kruskalFinal = lastStep(kruskalViz.steps as GraphStep[]);
    expect(totalWeight(primFinal.treeEdges!)).toBe(
      totalWeight(kruskalFinal.treeEdges!)
    );
  });
});
