import { describe, it, expect } from "vitest";
import { minHeapInsert } from "@/lib/algorithms/datastructure/heap";
import type { TreeStep } from "@/lib/types";

function lastStep(values: number[]): TreeStep {
  const viz = minHeapInsert(values);
  return viz.steps[viz.steps.length - 1] as TreeStep;
}

function heapValues(step: TreeStep): number[] {
  return step.nodes.map((n) => n.value);
}

function isMinHeap(values: number[]): boolean {
  for (let i = 0; i < values.length; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < values.length && values[i]! > values[left]!) return false;
    if (right < values.length && values[i]! > values[right]!) return false;
  }
  return true;
}

describe("minHeapInsert", () => {
  it("returns metadata", () => {
    const viz = minHeapInsert([3, 1, 2]);
    expect(viz.key).toBe("minHeapInsert");
    expect(viz.category).toBe("datastructure");
    expect(viz.primitive).toBe("tree-shape");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("produces an empty heap for empty input", () => {
    const step = lastStep([]);
    expect(step.nodes).toEqual([]);
    expect(step.rootId).toBeNull();
  });

  it("maintains the min-heap invariant", () => {
    const step = lastStep([5, 2, 8, 1, 9, 3, 7]);
    expect(isMinHeap(heapValues(step))).toBe(true);
  });

  it("puts the minimum at the root", () => {
    const step = lastStep([10, 4, 7, 2, 8, 6]);
    expect(step.nodes[0]!.value).toBe(2);
  });

  it("preserves all input values", () => {
    const input = [5, 2, 8, 1, 9, 3, 7];
    const step = lastStep(input);
    expect([...heapValues(step)].sort((a, b) => a - b)).toEqual(
      [...input].sort((a, b) => a - b)
    );
  });

  it("does not mutate the input array", () => {
    const input = [3, 1, 2];
    minHeapInsert(input);
    expect(input).toEqual([3, 1, 2]);
  });

  it("annotates steps with lineNumber", () => {
    const viz = minHeapInsert([5, 1]);
    for (const step of viz.steps) {
      expect("lineNumber" in step).toBe(true);
    }
  });
});
