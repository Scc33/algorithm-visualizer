import type { AlgorithmVisualization, Graph, GraphStep } from "../../types";
import { cloneGraph } from "./sampleGraphs";
import { createVisualization } from "../utils";

export function bfs(
  graph: Graph,
  startVertex: number = 0
): AlgorithmVisualization {
  const start =
    startVertex >= 0 && startVertex < graph.numVertices ? startVertex : 0;

  const steps: GraphStep[] = [];
  const visited: number[] = [];
  const queue: number[] = [start];
  const path: number[] = [];

  const snapshot = (current: number): GraphStep => ({
    graph: cloneGraph(graph),
    current,
    visited: [...visited],
    stack: [...queue],
    path: [...path],
  });

  steps.push(snapshot(-1));

  visited.push(start);

  while (queue.length > 0) {
    const current = queue.shift()!;
    path.push(current);

    steps.push(snapshot(current));

    for (const edge of graph.adjacency[current]!) {
      const neighbor = edge.to;
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
        steps.push(snapshot(current));
      }
    }
  }

  steps.push({
    graph: cloneGraph(graph),
    current: -1,
    visited: [...visited],
    stack: [],
    path: [...path],
  });

  return createVisualization("bfs", "graph-2d", steps, {
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
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
