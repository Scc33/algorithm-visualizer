import type { AlgorithmVisualization, Graph, GraphStep } from "../../types";
import { cloneGraph } from "./sampleGraphs";
import { createVisualization } from "../utils";

interface DijkstraState {
  dist: number[];
  visited: number[];
  path: number[];
  queue: number[];
  steps: GraphStep[];
  graph: Graph;
}

function snapshot(state: DijkstraState, current: number): GraphStep {
  return {
    graph: cloneGraph(state.graph),
    current,
    visited: [...state.visited],
    stack: [...state.queue],
    path: [...state.path],
  };
}

function findMinVertex(dist: number[], visited: number[], V: number): number {
  let minDist = Infinity;
  let minIndex = -1;
  for (let v = 0; v < V; v++) {
    if (!visited.includes(v) && dist[v]! <= minDist) {
      minDist = dist[v]!;
      minIndex = v;
    }
  }
  return minIndex;
}

function relaxEdgesFrom(state: DijkstraState, minIndex: number): void {
  const distMin = state.dist[minIndex]!;
  for (const edge of state.graph.adjacency[minIndex]!) {
    const v = edge.to;
    if (state.visited.includes(v)) continue;
    const distV = state.dist[v]!;
    if (distMin !== Infinity && distMin + edge.weight < distV) {
      state.dist[v] = distMin + edge.weight;
      if (!state.queue.includes(v)) state.queue.push(v);
      state.steps.push(snapshot(state, minIndex));
    }
  }
}

function runDijkstra(state: DijkstraState): void {
  const V = state.graph.numVertices;
  for (let count = 0; count < V; count++) {
    const minIndex = findMinVertex(state.dist, state.visited, V);
    if (minIndex === -1) break;

    state.visited.push(minIndex);
    state.path.push(minIndex);

    state.steps.push(snapshot(state, minIndex));

    relaxEdgesFrom(state, minIndex);

    const currentIndex = state.queue.indexOf(minIndex);
    if (currentIndex !== -1) state.queue.splice(currentIndex, 1);
  }
}

export function dijkstra(
  graph: Graph,
  source: number = 0
): AlgorithmVisualization {
  const startVertex = source >= 0 && source < graph.numVertices ? source : 0;
  const V = graph.numVertices;

  const dist: number[] = Array(V).fill(Infinity);
  dist[startVertex] = 0;

  const state: DijkstraState = {
    dist,
    visited: [],
    path: [],
    queue: [startVertex],
    steps: [],
    graph,
  };

  state.steps.push({
    graph: cloneGraph(graph),
    current: -1,
    visited: [],
    stack: [startVertex],
    path: [],
  });

  runDijkstra(state);

  state.steps.push({
    graph: cloneGraph(graph),
    current: -1,
    visited: [...state.visited],
    stack: [],
    path: [...state.path],
  });

  return createVisualization("dijkstra", "graph-2d", state.steps, {
    timeComplexity: "O(V²)",
    spaceComplexity: "O(V)",
    reference: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm",
    pseudoCode: [
      "procedure Dijkstra(G, source)",
      "  for each vertex v in G:",
      "    dist[v] := Infinity",
      "    visited[v] := false",
      "  dist[source] := 0",
      "",
      "  for i from 0 to |V| - 1:",
      "    u := extract vertex with min dist from unvisited",
      "    visited[u] := true",
      "",
      "    for each neighbor v of u:",
      "      if !visited[v] and dist[u] + weight(u,v) < dist[v]:",
      "        dist[v] := dist[u] + weight(u,v)",
      "  return dist",
      "end procedure",
    ],
  });
}
