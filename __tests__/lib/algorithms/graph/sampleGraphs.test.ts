import { describe, it, expect } from "vitest";
import {
  cloneGraph,
  createGraph,
  defaultGraphFor,
  sampleDAG,
  sampleUndirectedGraph,
  sampleWeightedGraph,
} from "@/lib/algorithms/graph/sampleGraphs";

describe("createGraph", () => {
  it("derives adjacency from edges for undirected graphs", () => {
    const g = createGraph({
      numVertices: 3,
      directed: false,
      edges: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
      ],
    });
    expect(g.adjacency[0]!.map((e) => e.to)).toEqual([1]);
    expect(g.adjacency[1]!.map((e) => e.to).sort()).toEqual([0, 2]);
    expect(g.adjacency[2]!.map((e) => e.to)).toEqual([1]);
  });

  it("derives adjacency from edges for directed graphs", () => {
    const g = createGraph({
      numVertices: 3,
      directed: true,
      edges: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
      ],
    });
    expect(g.adjacency[0]!.map((e) => e.to)).toEqual([1]);
    expect(g.adjacency[1]!.map((e) => e.to)).toEqual([2]);
    expect(g.adjacency[2]).toEqual([]);
  });

  it("defaults edge weight to 1", () => {
    const g = createGraph({
      numVertices: 2,
      directed: true,
      edges: [{ from: 0, to: 1 }],
    });
    expect(g.edges[0]!.weight).toBe(1);
  });

  it("preserves explicit weights", () => {
    const g = createGraph({
      numVertices: 2,
      directed: true,
      edges: [{ from: 0, to: 1, weight: 7 }],
    });
    expect(g.edges[0]!.weight).toBe(7);
    expect(g.adjacency[0]![0]!.weight).toBe(7);
  });

  it("keeps the canonical edge list at one entry per undirected edge", () => {
    const g = createGraph({
      numVertices: 2,
      directed: false,
      edges: [{ from: 0, to: 1 }],
    });
    expect(g.edges.length).toBe(1);
  });
});

describe("cloneGraph", () => {
  it("produces a deep copy that is structurally equal", () => {
    const g = sampleWeightedGraph();
    const clone = cloneGraph(g);
    expect(clone).toEqual(g);
    expect(clone).not.toBe(g);
    expect(clone.edges).not.toBe(g.edges);
    expect(clone.adjacency).not.toBe(g.adjacency);
  });
});

describe("sample graphs", () => {
  it("sampleUndirectedGraph: 6 vertices, undirected, unit weights", () => {
    const g = sampleUndirectedGraph();
    expect(g.numVertices).toBe(6);
    expect(g.directed).toBe(false);
    expect(g.edges.every((e) => e.weight === 1)).toBe(true);
  });

  it("sampleWeightedGraph: 6 vertices, undirected, mixed weights", () => {
    const g = sampleWeightedGraph();
    expect(g.numVertices).toBe(6);
    expect(g.directed).toBe(false);
    expect(g.edges.some((e) => e.weight !== 1)).toBe(true);
  });

  it("sampleDAG: 6 vertices, directed", () => {
    const g = sampleDAG();
    expect(g.numVertices).toBe(6);
    expect(g.directed).toBe(true);
  });
});

describe("defaultGraphFor", () => {
  it("maps each algorithm key to an appropriate graph", () => {
    expect(defaultGraphFor("dfs").directed).toBe(false);
    expect(defaultGraphFor("bfs").directed).toBe(false);
    expect(defaultGraphFor("topologicalSort").directed).toBe(true);
    expect(defaultGraphFor("dijkstra").edges.some((e) => e.weight !== 1)).toBe(
      true
    );
  });
});
