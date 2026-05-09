import type { AlgorithmVisualization, Graph, GraphStep } from "../../types";
import { cloneGraph } from "./sampleGraphs";
import { createVisualization } from "../utils";

interface BellmanFordState {
  dist: number[];
  visited: number[];
  path: number[];
  steps: GraphStep[];
  graph: Graph;
}

function snapshot(state: BellmanFordState, current: number): GraphStep {
  return {
    graph: cloneGraph(state.graph),
    current,
    visited: [...state.visited],
    stack: [],
    path: [...state.path],
  };
}

function relaxAllEdges(state: BellmanFordState): boolean {
  let updated = false;
  for (const edge of state.graph.edges) {
    const distFrom = state.dist[edge.from]!;
    if (distFrom === Infinity) continue;
    const candidate = distFrom + edge.weight;
    if (candidate < state.dist[edge.to]!) {
      state.dist[edge.to] = candidate;
      updated = true;
      if (!state.visited.includes(edge.to)) state.visited.push(edge.to);
      if (!state.path.includes(edge.to)) state.path.push(edge.to);
      state.steps.push(snapshot(state, edge.to));
    }
  }
  return updated;
}

export function bellmanFord(
  graph: Graph,
  source: number = 0
): AlgorithmVisualization {
  const startVertex = source >= 0 && source < graph.numVertices ? source : 0;
  const V = graph.numVertices;

  const dist: number[] = Array(V).fill(Infinity);
  dist[startVertex] = 0;

  const state: BellmanFordState = {
    dist,
    visited: [startVertex],
    path: [startVertex],
    steps: [],
    graph,
  };

  state.steps.push(snapshot(state, startVertex));

  for (let i = 0; i < V - 1; i++) {
    const changed = relaxAllEdges(state);
    if (!changed) break;
  }

  state.steps.push({
    graph: cloneGraph(graph),
    current: -1,
    visited: [...state.visited],
    stack: [],
    path: [...state.path],
  });

  return createVisualization("bellmanFord", state.steps, {
    timeComplexity: "O(V·E)",
    spaceComplexity: "O(V)",
    reference: "https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm",
    pseudoCode: [
      "procedure BellmanFord(G, source)",
      "  for each vertex v in G:",
      "    dist[v] := Infinity",
      "  dist[source] := 0",
      "",
      "  for i from 1 to |V| - 1:",
      "    for each edge (u, v, w) in G:",
      "      if dist[u] + w < dist[v]:",
      "        dist[v] := dist[u] + w",
      "",
      "  for each edge (u, v, w) in G:",
      "    if dist[u] + w < dist[v]:",
      "      report 'negative cycle'",
      "end procedure",
    ],
  });
}
