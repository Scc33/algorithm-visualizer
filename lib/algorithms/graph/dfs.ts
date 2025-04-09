import { AlgorithmVisualization, GraphStep } from "../../types";
import { createVisualization } from "../utils";

export function dfs(
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

  // We've already defined the adjacencyList above

  const steps: GraphStep[] = [];
  const visited: number[] = [];
  const stack: number[] = [startVertex];
  const path: number[] = [];

  // Initial state
  steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]), // Deep copy
    current: -1,
    visited: [...visited],
    stack: [...stack],
    path: [...path],
  });

  while (stack.length > 0) {
    // Get the next vertex from the stack
    const current = stack.pop()!;

    // Skip if already visited
    if (visited.includes(current)) continue;

    // Make sure current vertex is valid
    if (current < 0 || current >= adjacencyList.length) continue;

    // Mark as visited
    visited.push(current);
    path.push(current);

    // Add step for current vertex visit
    steps.push({
      adjacencyList: adjacencyList.map((row) => [...row]),
      current,
      visited: [...visited],
      stack: [...stack],
      path: [...path],
    });

    // Get all adjacent vertices in reverse order (so they come off the stack in correct order)
    // Ensure the current index is valid in the adjacency list
    const neighbors = [...adjacencyList[current]].reverse();

    // For each neighbor
    for (const neighbor of neighbors) {
      // If not visited, add to stack
      if (!visited.includes(neighbor)) {
        stack.push(neighbor);

        // Add step showing stack update
        steps.push({
          adjacencyList: adjacencyList.map((row) => [...row]),
          current,
          visited: [...visited],
          stack: [...stack],
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
    stack: [],
    path: [...path],
  });

  return createVisualization("dfs", steps, {
    timeComplexity: "O(V + E)", // Vertices + Edges
    spaceComplexity: "O(V)", // Vertices for stack and visited set
    reference: "https://en.wikipedia.org/wiki/Depth-first_search",
    pseudoCode: [
      "procedure DFS(G, start_v)",
      "  let S be a stack",
      "  S.push(start_v)",
      "  while S is not empty do",
      "    v = S.pop()",
      "    if v is not visited then",
      "      mark v as visited",
      "      for all neighbors w of v do",
      "        S.push(w)",
      "      end for",
      "    end if",
      "  end while",
      "end procedure",
    ],
  });
}
