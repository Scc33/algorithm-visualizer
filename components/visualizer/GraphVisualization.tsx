import type { GraphStep } from "@/lib/types";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

function getStatusMessage(
  current: number,
  stack: number[],
  path: number[]
): ReactNode {
  if (current >= 0)
    return <p>Exploring vertex {current} and its unvisited neighbors.</p>;
  if (stack.length > 0)
    return <p>Starting exploration from vertex {stack[0] ?? 0}.</p>;
  if (path.length > 0)
    return <p>DFS traversal complete. Path: {path.join(" → ")}</p>;
  return <p>DFS traversal will start from a selected vertex.</p>;
}

interface GraphVisualizationProps {
  step: GraphStep;
}

export default function GraphVisualization({ step }: GraphVisualizationProps) {
  const { adjacencyList, current, visited, stack, path } = step;
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });

  // Calculate layout dimensions based on window size
  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(600, window.innerWidth - 40);
      const height = Math.min(400, width * 0.8);
      setGraphSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Check if adjacencyList is valid
  if (
    !adjacencyList ||
    !Array.isArray(adjacencyList) ||
    adjacencyList.length === 0
  ) {
    return (
      <div className="flex items-center justify-center bg-white p-6 text-red-500">
        Invalid graph data. Please check the adjacency list.
      </div>
    );
  }

  // Calculate coordinates for each vertex in a circular layout
  const vertexPositions = adjacencyList.map((_, index) => {
    const angle = (2 * Math.PI * index) / adjacencyList.length;
    const radius = Math.min(graphSize.width, graphSize.height) * 0.35;
    return {
      x: graphSize.width / 2 + radius * Math.cos(angle),
      y: graphSize.height / 2 + radius * Math.sin(angle),
    };
  });

  // Function to determine vertex color based on its state
  const getVertexColor = (index: number) => {
    if (index === current) return "#FCD34D"; // yellow-300
    if (visited.includes(index)) return "#6EE7B7"; // green-300
    return "#93C5FD"; // blue-300
  };

  // Function to determine edge color based on whether it's in the path
  const getEdgeColor = (source: number, target: number) => {
    // Check if this edge is part of the current path
    const sourceInPath = path.includes(source);
    const targetInPath = path.includes(target);
    const adjacentInPath =
      sourceInPath &&
      targetInPath &&
      Math.abs(path.indexOf(source) - path.indexOf(target)) === 1;

    return adjacentInPath ? "#F87171" : "#CBD5E1"; // red-400 : gray-300
  };

  return (
    <div className="flex w-full flex-col items-center bg-white p-6">
      <div className="mb-6 flex w-full flex-wrap items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          Visited: {visited.map((v) => v).join(" → ")}
        </div>
        <div className="text-sm font-medium text-gray-700">
          Stack: [{stack.join(", ")}]
        </div>
      </div>

      <div
        className="relative rounded-lg border bg-gray-50"
        style={{ width: graphSize.width, height: graphSize.height }}
      >
        {/* Draw edges */}
        <svg width={graphSize.width} height={graphSize.height}>
          {adjacencyList.map((neighbors, vertex) =>
            neighbors.map(
              (neighbor) =>
                // Only draw each edge once
                vertex < neighbor && (
                  <line
                    key={`${vertex}-${neighbor}`}
                    x1={vertexPositions[vertex]!.x}
                    y1={vertexPositions[vertex]!.y}
                    x2={vertexPositions[neighbor]!.x}
                    y2={vertexPositions[neighbor]!.y}
                    stroke={getEdgeColor(vertex, neighbor)}
                    strokeWidth={2}
                  />
                )
            )
          )}
        </svg>

        {/* Draw vertices */}
        {vertexPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center rounded-full font-bold text-white transition-all duration-300"
            style={{
              width: 40,
              height: 40,
              backgroundColor: getVertexColor(index),
              left: pos.x - 20,
              top: pos.y - 20,
              border: index === current ? "3px solid #EF4444" : "none",
            }}
          >
            {index}
          </div>
        ))}
      </div>

      <div className="mt-6 w-full">
        <div className="mb-2 text-sm font-medium text-gray-700">
          Current State:
        </div>
        <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
          {getStatusMessage(current, stack, path)}
        </div>
      </div>
    </div>
  );
}
