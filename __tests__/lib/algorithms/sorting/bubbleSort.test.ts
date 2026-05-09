import { describe, it, expect } from "vitest";
import { bubbleSort } from "@/lib/algorithms/sorting/bubbleSort";
import type { SortingStep } from "@/lib/types";

function lastStep(steps: SortingStep[]): SortingStep {
  return steps[steps.length - 1]!;
}

describe("bubbleSort", () => {
  it("returns metadata fields", () => {
    const viz = bubbleSort([3, 1, 2]);
    expect(viz.name).toBeTruthy();
    expect(viz.category).toBe("sorting");
    expect(viz.key).toBe("bubbleSort");
    expect(viz.timeComplexity).toBe("O(n²)");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("sorts an unsorted array", () => {
    const input = [5, 2, 8, 1, 9, 3];
    const viz = bubbleSort(input);
    const final = lastStep(viz.steps as SortingStep[]);
    expect(final.array).toEqual([1, 2, 3, 5, 8, 9]);
  });

  it("handles already sorted input", () => {
    const viz = bubbleSort([1, 2, 3, 4]);
    const final = lastStep(viz.steps as SortingStep[]);
    expect(final.array).toEqual([1, 2, 3, 4]);
  });

  it("handles reverse-sorted input", () => {
    const viz = bubbleSort([5, 4, 3, 2, 1]);
    const final = lastStep(viz.steps as SortingStep[]);
    expect(final.array).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles single-element and empty arrays", () => {
    const single = bubbleSort([42]);
    expect((lastStep(single.steps as SortingStep[])).array).toEqual([42]);

    const empty = bubbleSort([]);
    expect(empty.steps.length).toBeGreaterThan(0);
  });

  it("does not mutate the input array", () => {
    const input = [3, 1, 2];
    bubbleSort(input);
    expect(input).toEqual([3, 1, 2]);
  });
});
