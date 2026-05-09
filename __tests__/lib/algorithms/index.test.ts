import { describe, it, expect } from "vitest";
import {
  getGraphAlgorithm,
  getSearchAlgorithm,
  getSortingAlgorithm,
  isAlgorithmName,
  isGraphAlgorithm,
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

describe("category guards", () => {
  it("classify known algorithm keys correctly", () => {
    expect(isSortingAlgorithm("bubbleSort")).toBe(true);
    expect(isSortingAlgorithm("dfs")).toBe(false);
    expect(isSearchAlgorithm("binarySearch")).toBe(true);
    expect(isSearchAlgorithm("dfs")).toBe(false);
    expect(isGraphAlgorithm("dijkstra")).toBe(true);
    expect(isGraphAlgorithm("bubbleSort")).toBe(false);
  });

  it("isAlgorithmName accepts all categories and rejects unknown", () => {
    expect(isAlgorithmName("dfs")).toBe(true);
    expect(isAlgorithmName("bubbleSort")).toBe(true);
    expect(isAlgorithmName("linearSearch")).toBe(true);
    expect(isAlgorithmName("nope")).toBe(false);
    expect(isAlgorithmName("")).toBe(false);
  });
});
