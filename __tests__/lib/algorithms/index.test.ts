import { describe, it, expect } from "vitest";
import {
  getGraphAlgorithm,
  getPathfindingAlgorithm,
  getSearchAlgorithm,
  getSortingAlgorithm,
  isAlgorithmName,
  isGraphAlgorithm,
  isPathfindingAlgorithm,
  isSearchAlgorithm,
  isSortingAlgorithm,
} from "@/lib/algorithms";
import { sampleUndirectedGraph } from "@/lib/algorithms/graph/sampleGraphs";

describe("getSortingAlgorithm", () => {
  it("returns the function for a known sorting algorithm", () => {
    const fn = getSortingAlgorithm("bubbleSort");
    expect(fn).toBeTypeOf("function");
    const viz = fn!([3, 1, 2]);
    expect(viz.key).toBe("bubbleSort");
  });

  it("returns null for non-sorting names", () => {
    expect(getSortingAlgorithm("dfs")).toBeNull();
    expect(getSortingAlgorithm("madeUp")).toBeNull();
  });
});

describe("getSearchAlgorithm", () => {
  it("returns the function for a known search algorithm", () => {
    const fn = getSearchAlgorithm("linearSearch");
    expect(fn).toBeTypeOf("function");
    const viz = fn!([1, 2, 3], 2);
    expect(viz.key).toBe("linearSearch");
  });

  it("returns null for non-search names", () => {
    expect(getSearchAlgorithm("bubbleSort")).toBeNull();
  });
});

describe("getGraphAlgorithm", () => {
  it("returns the function for a known graph algorithm", () => {
    const fn = getGraphAlgorithm("dfs");
    expect(fn).toBeTypeOf("function");
    const viz = fn!(sampleUndirectedGraph(), 0);
    expect(viz.key).toBe("dfs");
  });

  it("returns null for non-graph names", () => {
    expect(getGraphAlgorithm("bubbleSort")).toBeNull();
  });
});

describe("getPathfindingAlgorithm", () => {
  it("returns the function for a known pathfinding algorithm", () => {
    const fn = getPathfindingAlgorithm("aStar");
    expect(fn).toBeTypeOf("function");
    const viz = fn!({
      rows: 4,
      cols: 4,
      start: { row: 0, col: 0 },
      goal: { row: 3, col: 3 },
      walls: [],
    });
    expect(viz.key).toBe("aStar");
  });

  it("returns null for non-pathfinding names", () => {
    expect(getPathfindingAlgorithm("bubbleSort")).toBeNull();
    expect(getPathfindingAlgorithm("madeUp")).toBeNull();
  });
});

describe("category guards", () => {
  it("classify known algorithm keys correctly", () => {
    expect(isSortingAlgorithm("bubbleSort")).toBe(true);
    expect(isSortingAlgorithm("dfs")).toBe(false);
    expect(isSearchAlgorithm("binarySearch")).toBe(true);
    expect(isSearchAlgorithm("dfs")).toBe(false);
    expect(isGraphAlgorithm("dijkstra")).toBe(true);
    expect(isGraphAlgorithm("bellmanFord")).toBe(true);
    expect(isGraphAlgorithm("prim")).toBe(true);
    expect(isGraphAlgorithm("kruskal")).toBe(true);
    expect(isGraphAlgorithm("bubbleSort")).toBe(false);
    expect(isPathfindingAlgorithm("aStar")).toBe(true);
    expect(isPathfindingAlgorithm("dijkstraGrid")).toBe(true);
    expect(isPathfindingAlgorithm("mazeRecursiveBacktracker")).toBe(true);
    expect(isPathfindingAlgorithm("dfs")).toBe(false);
  });

  it("isAlgorithmName accepts all categories and rejects unknown", () => {
    expect(isAlgorithmName("dfs")).toBe(true);
    expect(isAlgorithmName("bubbleSort")).toBe(true);
    expect(isAlgorithmName("linearSearch")).toBe(true);
    expect(isAlgorithmName("aStar")).toBe(true);
    expect(isAlgorithmName("nope")).toBe(false);
    expect(isAlgorithmName("")).toBe(false);
  });
});
