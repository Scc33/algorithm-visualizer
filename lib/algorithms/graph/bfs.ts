import { AlgorithmVisualization, GraphStep } from "../../types";
import { createVisualization } from "../utils";

export function bfs(
  array: number[],
  target: number = 0
): AlgorithmVisualization {
  // Ignore the input array and use a predefined adjacency list for graph visualization
  // The target parameter will be used as the starting vertex, but ensure it's valid
  // Create a sample graph as an adjacency list first
  const adjacencyList: number[][] = [
    [1, 2], // Vertex 0 connected to 1, 2
    [0, 3, 4], // Vertex 1 connected to 0, 3, 4
    [0, 5], // Vertex 2 connected to 0, 5
    [1], // Vertex 3 connected to 1
    [1, 5], // Vertex 4 connected to 1, 5
    [2, 4], // Vertex 5 connected to 2, 4
  ];

  // Ensure startVertex is valid (0 to 5)
  const startVertex = target >= 0 && target < adjacencyList.length ? target : 0;

  const steps: GraphStep[] = [];
  const visited: number[] = [];
  const queue: number[] = [startVertex];
  const path: number[] = [];

  // Initial state
  steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]), // Deep copy
    current: -1,
    visited: [...visited],
    stack: [...queue], // Using stack field to represent queue in visualization
    path: [...path],
  });

  // Mark the start vertex as visited before starting the main loop
  visited.push(startVertex);

  while (queue.length > 0) {
    // Get the next vertex from the queue
    const current = queue.shift()!;

    // Add current to path
    path.push(current);

    // Add step for current vertex visit
    steps.push({
      adjacencyList: adjacencyList.map((row) => [...row]),
      current,
      visited: [...visited],
      stack: [...queue], // Using stack field to represent queue in visualization
      path: [...path],
    });

    // Get all adjacent vertices
    const neighbors = [...adjacencyList[current]];

    // For each unvisited neighbor
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        // Mark as visited and add to queue
        visited.push(neighbor);
        queue.push(neighbor);

        // Add step showing queue update
        steps.push({
          adjacencyList: adjacencyList.map((row) => [...row]),
          current,
          visited: [...visited],
          stack: [...queue], // Using stack field to represent queue in visualization
          path: [...path],
        });
      }
    }
  }

  // Final state
  steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [...visited],
    stack: [], // Queue is empty now
    path: [...path],
  });

  return createVisualization("bfs", steps, {
    timeComplexity: "O(V + E)", // Vertices + Edges
    spaceComplexity: "O(V)", // Vertices for queue and visited set
    reference: "https://en.wikipedia.org/wiki/Breadth-first_search",
    pseudoCode: [
      "procedure BFS(G, start_v)",
      "  let Q be a queue",
      "  Q.enqueue(start_v)",
      "  mark start_v as visited",
      "  while Q is not empty do",
      "    v = Q.dequeue()",
      "    for all neighbors w of v do",
      "      if w is not visited then",
      "        mark w as visited",
      "        Q.enqueue(w)",
      "      end if",
      "    end for",
      "  end while",
      "end procedure",
    ],
  });
}
