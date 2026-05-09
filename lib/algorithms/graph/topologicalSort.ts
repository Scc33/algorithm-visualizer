import type { AlgorithmVisualization, GraphStep } from "../../types";
import { createVisualization } from "../utils";

interface TopoSortState {
  adjacencyList: number[][];
  steps: GraphStep[];
  visited: number[];
  stack: number[];
  path: number[];
  tempVisited: number[];
}

function dfsVisit(vertex: number, state: TopoSortState): void {
  state.tempVisited.push(vertex);
  state.path.push(vertex);

  state.steps.push({
    adjacencyList: state.adjacencyList.map((row) => [...row]),
    current: vertex,
    visited: [...state.visited],
    stack: [...state.stack],
    path: [...state.path],
  });

  for (const neighbor of state.adjacencyList[vertex]!) {
    if (state.visited.includes(neighbor)) continue;
    if (state.tempVisited.includes(neighbor)) continue;
    dfsVisit(neighbor, state);
  }

  const tempIndex = state.tempVisited.indexOf(vertex);
  if (tempIndex !== -1) state.tempVisited.splice(tempIndex, 1);

  state.visited.push(vertex);
  state.stack.unshift(vertex);

  state.steps.push({
    adjacencyList: state.adjacencyList.map((row) => [...row]),
    current: vertex,
    visited: [...state.visited],
    stack: [...state.stack],
    path: [...state.path],
  });
}

export function topologicalSort(
  array: number[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _target: number = 0
): AlgorithmVisualization {
  const adjacencyList: number[][] = [
    [1, 2],
    [3],
    [3, 4],
    [5],
    [5],
    [],
  ];

  const state: TopoSortState = {
    adjacencyList,
    steps: [],
    visited: [],
    stack: [],
    path: [],
    tempVisited: [],
  };

  state.steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [],
    stack: [],
    path: [],
  });

  for (let i = 0; i < adjacencyList.length; i++) {
    if (!state.visited.includes(i) && !state.tempVisited.includes(i)) {
      dfsVisit(i, state);
    }
  }

  state.steps.push({
    adjacencyList: adjacencyList.map((row) => [...row]),
    current: -1,
    visited: [...state.visited],
    stack: [...state.stack],
    path: [...state.path],
  });

  return createVisualization("topologicalSort", state.steps, {
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
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
