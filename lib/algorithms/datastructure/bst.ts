import type {
  AlgorithmVisualization,
  BinaryTreeNode,
  TreeStep,
} from "../../types";
import { createVisualization } from "../utils";

const PSEUDO = [
  "procedure bstInsert(root, value)",
  "  if root is null then",
  "    return new Node(value)",
  "  if value < root.value then",
  "    root.left := bstInsert(root.left, value)",
  "  else if value > root.value then",
  "    root.right := bstInsert(root.right, value)",
  "  return root",
  "end procedure",
];

interface BstState {
  nodes: BinaryTreeNode[];
  rootId: number | null;
  nextId: number;
}

function snapshot(
  state: BstState,
  partial: Omit<TreeStep, "nodes" | "rootId">
): TreeStep {
  return {
    nodes: state.nodes.map((n) => ({ ...n })),
    rootId: state.rootId,
    ...partial,
  };
}

function newNode(state: BstState, value: number): BinaryTreeNode {
  const node: BinaryTreeNode = {
    id: state.nextId++,
    value,
    left: null,
    right: null,
  };
  state.nodes.push(node);
  return node;
}

function findById(state: BstState, id: number): BinaryTreeNode | undefined {
  return state.nodes.find((n) => n.id === id);
}

interface AttachArgs {
  state: BstState;
  parent: BinaryTreeNode;
  side: "left" | "right";
  value: number;
  path: number[];
  steps: TreeStep[];
}

function attachChild(args: AttachArgs): void {
  const { state, parent, side, value, path, steps } = args;
  const child = newNode(state, value);
  parent[side] = child.id;
  steps.push(
    snapshot(state, {
      current: parent.id,
      highlighted: [...path, child.id],
      compared: [],
      inserted: child.id,
      message: `Inserting ${value} as ${side} child of ${parent.value}.`,
      lineNumber: side === "left" ? 4 : 6,
    })
  );
}

function insertAtRoot(state: BstState, value: number, steps: TreeStep[]): void {
  const root = newNode(state, value);
  state.rootId = root.id;
  steps.push(
    snapshot(state, {
      current: null,
      highlighted: [root.id],
      compared: [],
      inserted: root.id,
      message: `Inserting ${value} as the root.`,
      lineNumber: 2,
    })
  );
}

function descend(
  state: BstState,
  cursor: BinaryTreeNode,
  value: number,
  path: number[],
  steps: TreeStep[]
): { nextId: number | null; done: boolean } {
  if (value < cursor.value) {
    if (cursor.left === null) {
      attachChild({ state, parent: cursor, side: "left", value, path, steps });
      return { nextId: null, done: true };
    }
    return { nextId: cursor.left, done: false };
  }
  if (value > cursor.value) {
    if (cursor.right === null) {
      attachChild({ state, parent: cursor, side: "right", value, path, steps });
      return { nextId: null, done: true };
    }
    return { nextId: cursor.right, done: false };
  }
  steps.push(
    snapshot(state, {
      current: cursor.id,
      highlighted: [...path],
      compared: [cursor.id],
      inserted: null,
      message: `Value ${value} already in tree; skipping.`,
      lineNumber: 7,
    })
  );
  return { nextId: null, done: true };
}

function insertOne(state: BstState, value: number, steps: TreeStep[]): void {
  if (state.rootId === null) {
    insertAtRoot(state, value, steps);
    return;
  }
  const path: number[] = [];
  let cursorId: number | null = state.rootId;
  while (cursorId !== null) {
    const cursor = findById(state, cursorId)!;
    path.push(cursor.id);
    steps.push(
      snapshot(state, {
        current: cursor.id,
        highlighted: [...path],
        compared: [cursor.id],
        inserted: null,
        message: `Comparing ${value} with ${cursor.value}.`,
        lineNumber: value < cursor.value ? 3 : 5,
      })
    );
    const { nextId, done } = descend(state, cursor, value, path, steps);
    if (done) return;
    cursorId = nextId;
  }
}

export function bstInsert(values: number[]): AlgorithmVisualization {
  const state: BstState = { nodes: [], rootId: null, nextId: 0 };
  const steps: TreeStep[] = [];

  steps.push({
    nodes: [],
    rootId: null,
    current: null,
    highlighted: [],
    compared: [],
    inserted: null,
    message: "Starting with an empty BST.",
    lineNumber: 0,
  });

  for (const value of values) {
    insertOne(state, value, steps);
  }

  steps.push(
    snapshot(state, {
      current: null,
      highlighted: [],
      compared: [],
      inserted: null,
      message: `Built BST with ${state.nodes.length} node(s).`,
      lineNumber: 7,
    })
  );

  return createVisualization("bstInsert", "tree-shape", steps, {
    timeComplexity: "O(n log n) average / O(n²) worst",
    spaceComplexity: "O(n)",
    reference: "https://en.wikipedia.org/wiki/Binary_search_tree",
    pseudoCode: PSEUDO,
  });
}
