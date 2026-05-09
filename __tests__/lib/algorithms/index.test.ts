import { describe, it, expect } from "vitest";
import { getAlgorithmByName, isAlgorithmName } from "@/lib/algorithms";

describe("getAlgorithmByName", () => {
  it("returns the function for a known algorithm name", () => {
    const fn = getAlgorithmByName("bubbleSort");
    expect(fn).toBeTypeOf("function");
    const viz = fn!([3, 1, 2]);
    expect(viz.key).toBe("bubbleSort");
  });

  it("returns null for an unknown name", () => {
    expect(getAlgorithmByName("madeUpAlgorithm")).toBeNull();
  });
});

describe("isAlgorithmName", () => {
  it("recognizes known algorithm names", () => {
    expect(isAlgorithmName("dijkstra")).toBe(true);
    expect(isAlgorithmName("topologicalSort")).toBe(true);
  });

  it("rejects unknown names", () => {
    expect(isAlgorithmName("nope")).toBe(false);
    expect(isAlgorithmName("")).toBe(false);
  });
});
