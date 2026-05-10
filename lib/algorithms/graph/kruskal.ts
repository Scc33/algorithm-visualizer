import type {
  AlgorithmVisualization,
  Edge,
  Graph,
  GraphStep,
} from "../../types";
import { cloneGraph } from "./sampleGraphs";
import { createVisualization } from "../utils";

class DisjointSet {
  private parent: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]!);
    return this.parent[x]!;
  }

  union(a: number, b: number): boolean {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return false;
    this.parent[rootA] = rootB;
    return true;
  }
}

function uniqueUndirectedEdges(graph: Graph): Edge[] {
  if (graph.directed) return [...graph.edges];
  const seen = new Set<string>();
  const result: Edge[] = [];
  for (const edge of graph.edges) {
    const key =
      edge.from < edge.to
        ? `${edge.from}-${edge.to}`
        : `${edge.to}-${edge.from}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(edge);
  }
  return result;
}

interface KruskalState {
  treeEdges: Edge[];
  visited: number[];
  steps: GraphStep[];
  graph: Graph;
}

function snapshot(
  state: KruskalState,
  current: number,
  considering: Edge | null
): GraphStep {
  const visited = considering !== null ? [...state.visited] : state.visited;
  if (considering !== null) {
    if (!visited.includes(considering.from)) visited.push(considering.from);
    if (!visited.includes(considering.to)) visited.push(considering.to);
  }
  return {
    graph: cloneGraph(state.graph),
    current,
    visited,
    stack: [],
    path: [...state.visited],
    treeEdges: state.treeEdges.map((e) => ({ ...e })),
  };
}

export function kruskal(graph: Graph): AlgorithmVisualization {
  const sorted = uniqueUndirectedEdges(graph).sort(
    (a, b) => a.weight - b.weight
  );
  const dsu = new DisjointSet(graph.numVertices);
  const state: KruskalState = {
    treeEdges: [],
    visited: [],
    steps: [],
    graph,
  };

  state.steps.push(snapshot(state, -1, null));

  for (const edge of sorted) {
    if (state.treeEdges.length === graph.numVertices - 1) break;
    state.steps.push(snapshot(state, edge.to, edge));
    if (!dsu.union(edge.from, edge.to)) continue;
    state.treeEdges.push({ ...edge });
    if (!state.visited.includes(edge.from)) state.visited.push(edge.from);
    if (!state.visited.includes(edge.to)) state.visited.push(edge.to);
    state.steps.push(snapshot(state, edge.to, null));
  }

  state.steps.push(snapshot(state, -1, null));

  return createVisualization("kruskal", "graph-2d", state.steps, {
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(V + E)",
    reference: "https://en.wikipedia.org/wiki/Kruskal%27s_algorithm",
    pseudoCode: [
      "procedure Kruskal(G)",
      "  treeEdges := { }",
      "  sort edges of G by weight ascending",
      "  initialize disjoint-set with each vertex its own set",
      "",
      "  for each edge (u, v) in sorted order:",
      "    if find(u) ≠ find(v):",
      "      union(u, v)",
      "      add (u, v) to treeEdges",
      "    if |treeEdges| = |V| - 1: break",
      "",
      "  return treeEdges",
      "end procedure",
    ],
  });
}
