import { describe, it, expect } from "vitest";
import { linearSearch } from "@/lib/algorithms/searching/linearSearch";
import { binarySearch } from "@/lib/algorithms/searching/binarySearch";
import type { AlgorithmVisualization, SearchStep } from "@/lib/types";

function lastStep(viz: AlgorithmVisualization): SearchStep {
  const steps = viz.steps as SearchStep[];
  return steps[steps.length - 1]!;
}

describe("linearSearch", () => {
  it("returns metadata", () => {
    const viz = linearSearch([1, 2, 3], 2);
    expect(viz.key).toBe("linearSearch");
    expect(viz.category).toBe("searching");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("finds an element that exists", () => {
    const viz = linearSearch([5, 2, 8, 1, 9, 3], 8);
    const final = lastStep(viz);
    expect(final.found).toBe(true);
    expect(final.array[final.current]).toBe(8);
  });

  it("reports not found when missing", () => {
    const viz = linearSearch([5, 2, 8, 1, 9, 3], 7);
    expect(lastStep(viz).found).toBe(false);
  });

  it("finds first occurrence with duplicates", () => {
    const viz = linearSearch([1, 3, 3, 5], 3);
    const final = lastStep(viz);
    expect(final.found).toBe(true);
    expect(final.current).toBe(1);
  });
});

describe("binarySearch", () => {
  it("returns metadata", () => {
    const viz = binarySearch([1, 2, 3], 2);
    expect(viz.key).toBe("binarySearch");
    expect(viz.category).toBe("searching");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("finds an element that exists", () => {
    const viz = binarySearch([1, 3, 5, 7, 9, 11, 13], 7);
    const final = lastStep(viz);
    expect(final.found).toBe(true);
    expect(final.array[final.current]).toBe(7);
  });

  it("finds the first element", () => {
    const viz = binarySearch([1, 3, 5, 7, 9], 1);
    const final = lastStep(viz);
    expect(final.found).toBe(true);
    expect(final.current).toBe(0);
  });

  it("finds the last element", () => {
    const viz = binarySearch([1, 3, 5, 7, 9], 9);
    const final = lastStep(viz);
    expect(final.found).toBe(true);
    expect(final.current).toBe(4);
  });

  it("reports not found when missing", () => {
    const viz = binarySearch([1, 3, 5, 7, 9], 4);
    expect(lastStep(viz).found).toBe(false);
  });
});
