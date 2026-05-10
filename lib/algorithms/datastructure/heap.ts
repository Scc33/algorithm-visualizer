import type {
  AlgorithmVisualization,
  BinaryTreeNode,
  TreeStep,
} from "../../types";
import { createVisualization } from "../utils";

const PSEUDO = [
  "procedure heapInsert(heap, value)",
  "  heap.append(value)",
  "  i := length(heap) - 1",
  "  while i > 0 do",
  "    parent := (i - 1) / 2",
  "    if heap[i] >= heap[parent] then",
  "      break",
  "    swap heap[i] and heap[parent]",
  "    i := parent",
  "  end while",
  "end procedure",
];

function buildNodes(heap: number[]): BinaryTreeNode[] {
  return heap.map((value, i) => ({
    id: i,
    value,
    left: 2 * i + 1 < heap.length ? 2 * i + 1 : null,
    right: 2 * i + 2 < heap.length ? 2 * i + 2 : null,
  }));
}

function pushStep(
  steps: TreeStep[],
  heap: number[],
  partial: Omit<TreeStep, "nodes" | "rootId">
): void {
  steps.push({
    nodes: buildNodes(heap),
    rootId: heap.length === 0 ? null : 0,
    ...partial,
  });
}

function siftUp(heap: number[], steps: TreeStep[], startIndex: number): void {
  let i = startIndex;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    pushStep(steps, heap, {
      current: i,
      highlighted: [],
      compared: [i, parent],
      inserted: null,
      message: `Comparing child ${heap[i]} with parent ${heap[parent]}.`,
      lineNumber: 5,
    });

    if (heap[i]! >= heap[parent]!) {
      pushStep(steps, heap, {
        current: i,
        highlighted: [i],
        compared: [],
        inserted: null,
        message: `${heap[i]} ≥ ${heap[parent]}; heap property holds.`,
        lineNumber: 6,
      });
      return;
    }

    [heap[i], heap[parent]] = [heap[parent]!, heap[i]!];
    pushStep(steps, heap, {
      current: parent,
      highlighted: [parent],
      compared: [],
      inserted: null,
      message: `Swapped; new value at index ${parent} is ${heap[parent]}.`,
      lineNumber: 7,
    });
    i = parent;
  }
}

function insertOne(heap: number[], steps: TreeStep[], value: number): void {
  heap.push(value);
  const lastIndex = heap.length - 1;
  pushStep(steps, heap, {
    current: lastIndex,
    highlighted: [lastIndex],
    compared: [],
    inserted: lastIndex,
    message: `Appending ${value} at index ${lastIndex}.`,
    lineNumber: 1,
  });
  siftUp(heap, steps, lastIndex);
}

export function minHeapInsert(values: number[]): AlgorithmVisualization {
  const heap: number[] = [];
  const steps: TreeStep[] = [];

  pushStep(steps, heap, {
    current: null,
    highlighted: [],
    compared: [],
    inserted: null,
    message: "Starting with an empty min-heap.",
    lineNumber: 0,
  });

  for (const value of values) {
    insertOne(heap, steps, value);
  }

  pushStep(steps, heap, {
    current: null,
    highlighted: [],
    compared: [],
    inserted: null,
    message: `Built min-heap with ${heap.length} node(s); root is ${heap[0]}.`,
    lineNumber: 10,
  });

  return createVisualization("minHeapInsert", "tree-shape", steps, {
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    reference: "https://en.wikipedia.org/wiki/Binary_heap",
    pseudoCode: PSEUDO,
  });
}
