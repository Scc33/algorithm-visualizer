import type { Edge, Graph } from "../../types";

export function createGraph(params: {
  numVertices: number;
  edges: Array<{ from: number; to: number; weight?: number }>;
  directed: boolean;
}): Graph {
  const { numVertices, directed } = params;
  const edges: Edge[] = params.edges.map((e) => ({
    from: e.from,
    to: e.to,
    weight: e.weight ?? 1,
  }));
  const adjacency: Edge[][] = Array.from({ length: numVertices }, () => []);
  for (const edge of edges) {
    adjacency[edge.from]!.push(edge);
    if (!directed) {
      adjacency[edge.to]!.push({
        from: edge.to,
        to: edge.from,
        weight: edge.weight,
      });
    }
  }
  return { numVertices, edges, adjacency, directed };
}

export function cloneGraph(graph: Graph): Graph {
  return createGraph({
    numVertices: graph.numVertices,
    edges: graph.edges.map((e) => ({
      from: e.from,
      to: e.to,
      weight: e.weight,
    })),
    directed: graph.directed,
  });
}

export function sampleUndirectedGraph(): Graph {
  return createGraph({
    numVertices: 6,
    directed: false,
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 4, to: 5 },
    ],
  });
}

export function sampleWeightedGraph(): Graph {
  return createGraph({
    numVertices: 6,
    directed: false,
    edges: [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 2, weight: 2 },
      { from: 1, to: 2, weight: 1 },
      { from: 1, to: 3, weight: 5 },
      { from: 1, to: 4, weight: 2 },
      { from: 2, to: 4, weight: 3 },
      { from: 2, to: 5, weight: 6 },
      { from: 3, to: 4, weight: 2 },
      { from: 4, to: 5, weight: 1 },
    ],
  });
}

export function sampleDAG(): Graph {
  return createGraph({
    numVertices: 6,
    directed: true,
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 },
    ],
  });
}

export type GraphAlgorithmKey = "dfs" | "bfs" | "dijkstra" | "topologicalSort";

export function defaultGraphFor(key: GraphAlgorithmKey): Graph {
  switch (key) {
    case "dijkstra":
      return sampleWeightedGraph();
    case "topologicalSort":
      return sampleDAG();
    case "dfs":
    case "bfs":
      return sampleUndirectedGraph();
  }
}
