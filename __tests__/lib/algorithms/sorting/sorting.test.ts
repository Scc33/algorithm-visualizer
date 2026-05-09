import { describe, it, expect } from "vitest";
import { selectionSort } from "@/lib/algorithms/sorting/selectionSort";
import { insertionSort } from "@/lib/algorithms/sorting/insertionSort";
import { mergeSort } from "@/lib/algorithms/sorting/mergeSort";
import { quickSort } from "@/lib/algorithms/sorting/quickSort";
import { heapSort } from "@/lib/algorithms/sorting/heapSort";
import type { AlgorithmVisualization, SortingStep } from "@/lib/types";

type SortFn = (arr: number[]) => AlgorithmVisualization;

const sorts: Array<{ name: string; key: string; fn: SortFn }> = [
  { name: "selectionSort", key: "selectionSort", fn: selectionSort },
  { name: "insertionSort", key: "insertionSort", fn: insertionSort },
  { name: "mergeSort", key: "mergeSort", fn: mergeSort },
  { name: "quickSort", key: "quickSort", fn: quickSort },
  { name: "heapSort", key: "heapSort", fn: heapSort },
];

function lastArray(viz: AlgorithmVisualization): number[] {
  const steps = viz.steps as SortingStep[];
  return steps[steps.length - 1]!.array;
}

describe.each(sorts)("$name", ({ key, fn }) => {
  it("returns metadata", () => {
    const viz = fn([3, 1, 2]);
    expect(viz.key).toBe(key);
    expect(viz.category).toBe("sorting");
    expect(viz.steps.length).toBeGreaterThan(0);
    expect(viz.timeComplexity).toBeTruthy();
    expect(viz.spaceComplexity).toBeTruthy();
  });

  it("sorts an unsorted array", () => {
    expect(lastArray(fn([5, 2, 8, 1, 9, 3]))).toEqual([1, 2, 3, 5, 8, 9]);
  });

  it("handles already-sorted input", () => {
    expect(lastArray(fn([1, 2, 3, 4]))).toEqual([1, 2, 3, 4]);
  });

  it("handles reverse-sorted input", () => {
    expect(lastArray(fn([5, 4, 3, 2, 1]))).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles duplicates", () => {
    expect(lastArray(fn([3, 1, 3, 2, 1]))).toEqual([1, 1, 2, 3, 3]);
  });

  it("handles a single element", () => {
    expect(lastArray(fn([42]))).toEqual([42]);
  });

  it("does not mutate the input array", () => {
    const input = [3, 1, 2];
    fn(input);
    expect(input).toEqual([3, 1, 2]);
  });
});
