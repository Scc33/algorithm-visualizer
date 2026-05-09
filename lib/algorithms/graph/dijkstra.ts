import type { AlgorithmVisualization, GraphStep } from "../../types";
import { createVisualization } from "../utils";

interface DijkstraState {
  dist: number[];
  visited: number[];
  path: number[];
  queue: number[];
  steps: GraphStep[];
  adjacencyList: number[][];
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

function relaxEdgesFrom(
  graph: number[][],
  minIndex: number,
  state: DijkstraState
): void {
  const V = graph.length;
  const graphRow = graph[minIndex]!;
  const distMin = state.dist[minIndex]!;

  for (let v = 0; v < V; v++) {
    const edgeWeight = graphRow[v]!;
    const distV = state.dist[v]!;
    if (
      !state.visited.includes(v) &&
      edgeWeight !== 0 &&
      edgeWeight !== Infinity &&
      distMin !== Infinity &&
      distMin + edgeWeight < distV
    ) {
      state.dist[v] = distMin + edgeWeight;
      if (!state.queue.includes(v)) state.queue.push(v);
      state.steps.push({
        adjacencyList: state.adjacencyList.map((row) => [...row]),
        current: minIndex,
        visited: [...state.visited],
        stack: [...state.queue],
        path: [...state.path],
      });
    }
  }
}

function runDijkstra(graph: number[][], state: DijkstraState): void {
  const V = graph.length;
  for (let count = 0; count < V; count++) {
    const minIndex = findMinVertex(state.dist, state.visited, V);
    if (minIndex === -1) break;

    state.visited.push(minIndex);
    state.path.push(minIndex);

    state.steps.push({
      adjacencyList: state.adjacencyList.map((row) => [...row]),
      current: minIndex,
      visited: [...state.visited],
      stack: [...state.queue],
      path: [...state.path],
    });

    relaxEdgesFrom(graph, minIndex, state);

    const currentIndex = state.queue.indexOf(minIndex);
    if (currentIndex !== -1) state.queue.splice(currentIndex, 1);
  }
}

export function dijkstra(
  array: number[],
  source: number = 0
): AlgorithmVisualization {
  const graph: number[][] = [
    [0, 4, 2, Infinity, Infinity, Infinity],
    [4, 0, 1, 5, 2, Infinity],
    [2, 1, 0, Infinity, 3, 6],
    [Infinity, 5, Infinity, 0, 2, Infinity],
    [Infinity, 2, 3, 2, 0, 1],
    [Infinity, Infinity, 6, Infinity, 1, 0],
  ];

  const startVertex = source >= 0 && source < graph.length ? source : 0;
  const V = graph.length;

  const adjacencyList: number[][] = graph.map((row) =>
    row.reduce((neighbors, weight, j) => {
      if (weight !== Infinity && weight !== 0) neighbors.push(j);
      return neighbors;
    }, [] as number[])
  );

  const dist: number[] = Array(V).fill(Infinity);
  dist[startVertex] = 0;

  const state: DijkstraState = {
    dist,
    visited: [],
    path: [],
    queue: [startVertex],
    steps: [],
    adjacencyList,
  };

  state.steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [],
    stack: [startVertex],
    path: [],
  });

  runDijkstra(graph, state);

  state.steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [...state.visited],
    stack: [],
    path: [...state.path],
  });

  return createVisualization("dijkstra", state.steps, {
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
