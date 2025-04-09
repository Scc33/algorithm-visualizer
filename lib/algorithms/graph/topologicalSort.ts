import { AlgorithmVisualization, GraphStep } from "../../types";
import { createVisualization } from "../utils";

export function topologicalSort(
  array: number[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _target: number = 0
): AlgorithmVisualization {
  // Create a directed acyclic graph (DAG) for topological sorting
  // For visualization purposes, we'll create a specific DAG example
  // where vertices might represent tasks and edges represent dependencies

  // Adjacency list representation of a directed graph
  const adjacencyList: number[][] = [
    [1, 2], // Vertex 0 has edges to 1, 2
    [3], // Vertex 1 has edge to 3
    [3, 4], // Vertex 2 has edges to 3, 4
    [5], // Vertex 3 has edge to 5
    [5], // Vertex 4 has edge to 5
    [], // Vertex 5 has no outgoing edges
  ];

  const steps: GraphStep[] = [];
  const visited: number[] = [];
  const stack: number[] = []; // For topological sort result
  const path: number[] = []; // Track the DFS path
  const tempVisited: number[] = []; // For cycle detection

  // Initial state
  steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [...visited],
    stack: [...stack],
    path: [...path],
  });

  // Helper function to perform DFS with visualization
  function dfsVisit(vertex: number) {
    // Mark as temporarily visited for cycle detection
    tempVisited.push(vertex);

    // Add to current path
    path.push(vertex);

    // Add step to show current vertex being visited
    steps.push({
      adjacencyList: adjacencyList.map((row) => [...row]),
      current: vertex,
      visited: [...visited],
      stack: [...stack],
      path: [...path],
    });

    // Visit all unvisited neighbors
    for (const neighbor of adjacencyList[vertex]) {
      // Skip if already completely visited
      if (visited.includes(neighbor)) continue;

      // If temporarily visited, we have a cycle (which breaks topological sort)
      // For this visualization, we'll just skip it
      if (tempVisited.includes(neighbor)) continue;

      // Recursively visit the neighbor
      dfsVisit(neighbor);
    }

    // Remove from temporary visited set
    const tempIndex = tempVisited.indexOf(vertex);
    if (tempIndex !== -1) {
      tempVisited.splice(tempIndex, 1);
    }

    // Mark as completely visited
    visited.push(vertex);

    // Add to the result stack (pre-pending to get correct order)
    stack.unshift(vertex);

    // Add step to show vertex being added to result
    steps.push({
      adjacencyList: adjacencyList.map((row) => [...row]),
      current: vertex,
      visited: [...visited],
      stack: [...stack],
      path: [...path],
    });
  }

  // Perform topological sort using DFS
  for (let i = 0; i < adjacencyList.length; i++) {
    if (!visited.includes(i) && !tempVisited.includes(i)) {
      dfsVisit(i);
    }
  }

  // Final state - show the topological ordering
  steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [...visited],
    stack: [...stack], // This now contains the topological ordering
    path: [...path],
  });

  return createVisualization("topologicalSort", steps, {
    timeComplexity: "O(V + E)", // V = vertices, E = edges
    spaceComplexity: "O(V)", // For the visited and stack arrays
    reference: "https://en.wikipedia.org/wiki/Topological_sorting",
    pseudoCode: [
      "procedure TopologicalSort(G):",
      "  L := Empty list that will contain the sorted elements",
      "  S := Set of all nodes with no incoming edge",
      "",
      "  while S is not empty do",
      "    remove a node n from S",
      "    add n to L",
      "    for each node m with an edge e from n to m do",
      "      remove edge e from the graph",
      "      if m has no other incoming edges then",
      "        insert m into S",
      "    end for",
      "  end while",
      "",
      "  if graph has edges then",
      "    return error (graph has at least one cycle)",
      "  else",
      "    return L (a topologically sorted order)",
      "end procedure",
    ],
  });
}
