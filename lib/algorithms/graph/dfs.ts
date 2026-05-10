import type { AlgorithmVisualization, Graph, GraphStep } from "../../types";
import { cloneGraph } from "./sampleGraphs";
import { createVisualization } from "../utils";

export function dfs(
  graph: Graph,
  startVertex: number = 0
): AlgorithmVisualization {
  const start =
    startVertex >= 0 && startVertex < graph.numVertices ? startVertex : 0;

  const steps: GraphStep[] = [];
  const visited: number[] = [];
  const stack: number[] = [start];
  const path: number[] = [];

  const snapshot = (current: number, lineNumber: number): GraphStep => ({
    graph: cloneGraph(graph),
    current,
    visited: [...visited],
    stack: [...stack],
    path: [...path],
    lineNumber,
  });

  steps.push(snapshot(-1, 2));

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (visited.includes(current)) continue;
    if (current < 0 || current >= graph.numVertices) continue;

    visited.push(current);
    path.push(current);

    steps.push(snapshot(current, 6));

    const neighbors = [...graph.adjacency[current]!]
      .map((edge) => edge.to)
      .reverse();

    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        stack.push(neighbor);
        steps.push(snapshot(current, 8));
      }
    }
  }

  steps.push({
    graph: cloneGraph(graph),
    current: -1,
    visited: [...visited],
    stack: [],
    path: [...path],
    lineNumber: 12,
  });

  return createVisualization("dfs", "graph-2d", steps, {
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
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
