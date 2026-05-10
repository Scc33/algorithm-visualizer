import { describe, it, expect } from "vitest";
import { editDistance } from "@/lib/algorithms/dp/editDistance";
import { lcs } from "@/lib/algorithms/dp/lcs";
import type { GridStep } from "@/lib/types";

function lastCell(viz: ReturnType<typeof editDistance>): number {
  const last = viz.steps[viz.steps.length - 1] as GridStep;
  return last.cells[last.rows - 1]![last.cols - 1] as number;
}

describe("editDistance", () => {
  it("returns metadata", () => {
    const viz = editDistance("a", "b");
    expect(viz.key).toBe("editDistance");
    expect(viz.category).toBe("dp");
    expect(viz.primitive).toBe("grid-2d");
    expect(viz.steps.length).toBeGreaterThan(0);
  });

  it("computes the canonical kitten/sitting distance of 3", () => {
    expect(lastCell(editDistance("kitten", "sitting"))).toBe(3);
  });

  it("returns 0 for identical strings", () => {
    expect(lastCell(editDistance("abc", "abc"))).toBe(0);
  });

  it("returns the length of the other string when one is empty", () => {
    expect(lastCell(editDistance("", "hello"))).toBe(5);
    expect(lastCell(editDistance("hello", ""))).toBe(5);
  });

  it("counts a single substitution", () => {
    expect(lastCell(editDistance("cat", "bat"))).toBe(1);
  });

  it("emits a final step that includes a traceback path", () => {
    const viz = editDistance("ab", "ba");
    const last = viz.steps[viz.steps.length - 1] as GridStep;
    expect(last.path.length).toBeGreaterThan(0);
  });

  it("annotates steps with lineNumber", () => {
    const viz = editDistance("a", "b");
    for (const step of viz.steps) {
      expect("lineNumber" in step).toBe(true);
    }
  });
});

describe("lcs", () => {
  it("returns metadata", () => {
    const viz = lcs("a", "b");
    expect(viz.key).toBe("lcs");
    expect(viz.category).toBe("dp");
    expect(viz.primitive).toBe("grid-2d");
  });

  it("computes the canonical AGCAT/GAC LCS length of 2", () => {
    expect(lastCell(lcs("AGCAT", "GAC"))).toBe(2);
  });

  it("returns the full length when one string is a subsequence of the other", () => {
    expect(lastCell(lcs("abc", "aXbYc"))).toBe(3);
  });

  it("returns 0 for disjoint strings", () => {
    expect(lastCell(lcs("abc", "xyz"))).toBe(0);
  });

  it("returns the string length for identical strings", () => {
    expect(lastCell(lcs("hello", "hello"))).toBe(5);
  });

  it("handles empty inputs", () => {
    expect(lastCell(lcs("", "anything"))).toBe(0);
    expect(lastCell(lcs("anything", ""))).toBe(0);
  });

  it("annotates steps with lineNumber", () => {
    const viz = lcs("a", "b");
    for (const step of viz.steps) {
      expect("lineNumber" in step).toBe(true);
    }
  });
});
