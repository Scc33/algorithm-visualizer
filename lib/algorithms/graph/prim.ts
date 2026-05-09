import type {
  AlgorithmVisualization,
  Edge,
  Graph,
  GraphStep,
} from "../../types";
import { cloneGraph } from "./sampleGraphs";
import { createVisualization } from "../utils";

interface PrimState {
  inTree: Set<number>;
  treeEdges: Edge[];
  steps: GraphStep[];
  graph: Graph;
}

function snapshot(state: PrimState, current: number): GraphStep {
  return {
    graph: cloneGraph(state.graph),
    current,
    visited: [...state.inTree],
    stack: [],
    path: [...state.inTree],
    treeEdges: state.treeEdges.map((e) => ({ ...e })),
  };
}

function findCheapestEdge(state: PrimState): Edge | null {
  let best: Edge | null = null;
  for (const v of state.inTree) {
    for (const edge of state.graph.adjacency[v]!) {
      if (state.inTree.has(edge.to)) continue;
      if (best === null || edge.weight < best.weight) best = edge;
    }
  }
  return best;
}

export function prim(
  graph: Graph,
  startVertex: number = 0
): AlgorithmVisualization {
  const start =
    startVertex >= 0 && startVertex < graph.numVertices ? startVertex : 0;

  const state: PrimState = {
    inTree: new Set<number>([start]),
    treeEdges: [],
    steps: [],
    graph,
  };

  state.steps.push(snapshot(state, start));

  while (state.inTree.size < graph.numVertices) {
    const edge = findCheapestEdge(state);
    if (edge === null) break;
    state.inTree.add(edge.to);
    state.treeEdges.push({ from: edge.from, to: edge.to, weight: edge.weight });
    state.steps.push(snapshot(state, edge.to));
  }

  state.steps.push({
    graph: cloneGraph(graph),
    current: -1,
    visited: [...state.inTree],
    stack: [],
    path: [...state.inTree],
    treeEdges: state.treeEdges.map((e) => ({ ...e })),
  });

  return createVisualization("prim", state.steps, {
    timeComplexity: "O(V²)",
    spaceComplexity: "O(V + E)",
    reference: "https://en.wikipedia.org/wiki/Prim%27s_algorithm",
    pseudoCode: [
      "procedure Prim(G, start)",
      "  T := { start }",
      "  treeEdges := { }",
      "",
      "  while T does not span G:",
      "    pick edge (u, v) of minimum weight",
      "      where u ∈ T and v ∉ T",
      "    add v to T",
      "    add (u, v) to treeEdges",
      "",
      "  return treeEdges",
      "end procedure",
    ],
  });
}
