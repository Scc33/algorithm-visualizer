import { describe, it, expect } from "vitest";
import { bstInsert } from "@/lib/algorithms/datastructure/bst";
import type { BinaryTreeNode, TreeStep } from "@/lib/types";

function lastStep(values: number[]): TreeStep {
  const viz = bstInsert(values);
  return viz.steps[viz.steps.length - 1] as TreeStep;
}

function inOrder(nodes: BinaryTreeNode[], rootId: number | null): number[] {
  if (rootId === null) return [];
  const map = new Map(nodes.map((n) => [n.id, n]));
  const out: number[] = [];
  const walk = (id: number | null): void => {
    if (id === null) return;
    const n = map.get(id);
    if (!n) return;
    walk(n.left);
    out.push(n.value);
    walk(n.right);
  };
  walk(rootId);
  return out;
}

describe("bstInsert", () => {
  it("returns metadata", () => {
    const viz = bstInsert([5, 3, 8]);
    expect(viz.key).toBe("bstInsert");
    expect(viz.category).toBe("datastructure");
    expect(viz.primitive).toBe("tree-shape");
    expect(viz.steps.length).toBeGreaterThan(0);
    expect(viz.timeComplexity).toBeTruthy();
  });

  it("produces an empty tree for empty input", () => {
    const step = lastStep([]);
    expect(step.nodes).toEqual([]);
    expect(step.rootId).toBeNull();
  });

  it("places the first value at the root", () => {
    const step = lastStep([42]);
    expect(step.rootId).not.toBeNull();
    expect(step.nodes).toHaveLength(1);
    expect(step.nodes[0]!.value).toBe(42);
  });

  it("yields sorted in-order traversal", () => {
    const step = lastStep([5, 3, 8, 1, 4, 7, 9]);
    expect(inOrder(step.nodes, step.rootId)).toEqual([1, 3, 4, 5, 7, 8, 9]);
  });

  it("places smaller values to the left and larger to the right", () => {
    const step = lastStep([5, 3, 8]);
    const root = step.nodes.find((n) => n.id === step.rootId)!;
    const left = step.nodes.find((n) => n.id === root.left)!;
    const right = step.nodes.find((n) => n.id === root.right)!;
    expect(root.value).toBe(5);
    expect(left.value).toBe(3);
    expect(right.value).toBe(8);
  });

  it("skips duplicates", () => {
    const step = lastStep([5, 5, 5]);
    expect(step.nodes).toHaveLength(1);
  });

  it("annotates each step with a lineNumber", () => {
    const viz = bstInsert([5, 3]);
    for (const step of viz.steps) {
      expect("lineNumber" in step).toBe(true);
    }
  });
});
