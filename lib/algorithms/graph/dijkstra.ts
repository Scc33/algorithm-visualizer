import { AlgorithmVisualization, GraphStep } from "../../types";
import { createVisualization } from "../utils";

export function dijkstra(
  array: number[],
  source: number = 0
): AlgorithmVisualization {
  // Create a weighted graph using an adjacency matrix where [i][j] is the weight of edge from i to j
  // Using Infinity to represent no connection between vertices
  const graph: number[][] = [
    [0, 4, 2, Infinity, Infinity, Infinity],
    [4, 0, 1, 5, 2, Infinity],
    [2, 1, 0, Infinity, 3, 6],
    [Infinity, 5, Infinity, 0, 2, Infinity],
    [Infinity, 2, 3, 2, 0, 1],
    [Infinity, Infinity, 6, Infinity, 1, 0],
  ];

  // Ensure source vertex is valid (0 to 5)
  const startVertex = source >= 0 && source < graph.length ? source : 0;

  // Number of vertices
  const V = graph.length;

  // Create adjacency list representation for visualization
  const adjacencyList: number[][] = graph.map((row) =>
    row.reduce((neighbors, weight, j) => {
      if (weight !== Infinity && weight !== 0) {
        neighbors.push(j);
      }
      return neighbors;
    }, [] as number[])
  );

  const steps: GraphStep[] = [];

  // Distance array to store shortest distance from source to i
  const dist: number[] = Array(V).fill(Infinity);
  dist[startVertex] = 0;

  // Visited array to keep track of vertices included in the shortest path tree
  const visited: number[] = [];

  // Path to store the actual path taken
  const path: number[] = [];

  // Queue to visualize the current frontier (for visual purposes)
  const queue: number[] = [startVertex];

  // Initial state
  steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [...visited],
    stack: [...queue], // Use stack to represent the priority queue visually
    path: [...path],
  });

  // Find shortest path for all vertices
  for (let count = 0; count < V; count++) {
    // Find the minimum distance vertex from the set of vertices not yet visited
    let minDist = Infinity;
    let minIndex = -1;

    for (let v = 0; v < V; v++) {
      if (!visited.includes(v) && dist[v] <= minDist) {
        minDist = dist[v];
        minIndex = v;
      }
    }

    // If no valid vertex is found, break
    if (minIndex === -1) break;

    // Add the selected vertex to the visited set
    visited.push(minIndex);

    // Add to path
    path.push(minIndex);

    // Add a step showing the current vertex being visited
    steps.push({
      adjacencyList: adjacencyList.map((row) => [...row]),
      current: minIndex,
      visited: [...visited],
      stack: [...queue],
      path: [...path],
    });

    // Update the distance value of adjacent vertices of the picked vertex
    for (let v = 0; v < V; v++) {
      // Update dist[v] only if:
      // 1. There's an edge from minIndex to v
      // 2. v is not in visited
      // 3. The total path distance is smaller than the current dist[v]
      if (
        !visited.includes(v) &&
        graph[minIndex][v] !== 0 &&
        graph[minIndex][v] !== Infinity &&
        dist[minIndex] !== Infinity &&
        dist[minIndex] + graph[minIndex][v] < dist[v]
      ) {
        dist[v] = dist[minIndex] + graph[minIndex][v];

        // Add unvisited neighbor to queue for visualization
        if (!queue.includes(v)) {
          queue.push(v);
        }

        // Add a step showing the distance update
        steps.push({
          adjacencyList: adjacencyList.map((row) => [...row]),
          current: minIndex,
          visited: [...visited],
          stack: [...queue],
          path: [...path],
        });
      }
    }

    // Remove current vertex from queue for visualization
    const currentIndex = queue.indexOf(minIndex);
    if (currentIndex !== -1) {
      queue.splice(currentIndex, 1);
    }
  }

  // Final state
  steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [...visited],
    stack: [],
    path: [...path],
  });

  return createVisualization("dijkstra", steps, {
    timeComplexity: "O(V²)", // For simple implementation, can be O(E + V log V) with a priority queue
    spaceComplexity: "O(V)", // For distance array and visited set
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
