import type { Edge, GraphStep } from "@/lib/types";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const VERTEX_RADIUS = 20;
const EDGE_COLOR = "#CBD5E1";
const PATH_EDGE_COLOR = "#F87171";

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
    return <p>Traversal complete. Path: {path.join(" → ")}</p>;
  return <p>Traversal will start from a selected vertex.</p>;
}

function getMarkerEnd(
  showArrows: boolean,
  onPath: boolean
): string | undefined {
  if (!showArrows) return undefined;
  return onPath ? "url(#arrowhead-path)" : "url(#arrowhead)";
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        viewBox="0 0 10 10"
        refX="10"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={EDGE_COLOR} />
      </marker>
      <marker
        id="arrowhead-path"
        viewBox="0 0 10 10"
        refX="10"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={PATH_EDGE_COLOR} />
      </marker>
    </defs>
  );
}

interface EdgeShapeProps {
  edge: Edge;
  from: { x: number; y: number };
  to: { x: number; y: number };
  onPath: boolean;
  showArrows: boolean;
  showWeights: boolean;
}

function EdgeShape({
  edge,
  from,
  to,
  onPath,
  showArrows,
  showWeights,
}: EdgeShapeProps) {
  const stroke = onPath ? PATH_EDGE_COLOR : EDGE_COLOR;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const x2 = to.x - ux * VERTEX_RADIUS;
  const y2 = to.y - uy * VERTEX_RADIUS;
  const x1 = showArrows ? from.x + ux * VERTEX_RADIUS : from.x;
  const y1 = showArrows ? from.y + uy * VERTEX_RADIUS : from.y;
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={2}
        markerEnd={getMarkerEnd(showArrows, onPath)}
      />
      {showWeights && (
        <g>
          <rect
            x={midX - 10}
            y={midY - 9}
            width={20}
            height={16}
            rx={3}
            fill="white"
            opacity={0.9}
          />
          <text
            x={midX}
            y={midY + 3}
            textAnchor="middle"
            fontSize={11}
            fill="#374151"
            fontWeight={600}
          >
            {edge.weight}
          </text>
        </g>
      )}
    </g>
  );
}

interface GraphVisualizationProps {
  step: GraphStep;
}

export default function GraphVisualization({ step }: GraphVisualizationProps) {
  const { graph, current, visited, stack, path } = step;
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });

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

  if (!graph || graph.numVertices === 0) {
    return (
      <div className="flex items-center justify-center bg-white p-6 text-red-500">
        Invalid graph data.
      </div>
    );
  }

  const vertexPositions = Array.from(
    { length: graph.numVertices },
    (_, index) => {
      const angle = (2 * Math.PI * index) / graph.numVertices;
      const radius = Math.min(graphSize.width, graphSize.height) * 0.35;
      return {
        x: graphSize.width / 2 + radius * Math.cos(angle),
        y: graphSize.height / 2 + radius * Math.sin(angle),
      };
    }
  );

  const getVertexColor = (index: number) => {
    if (index === current) return "#FCD34D";
    if (visited.includes(index)) return "#6EE7B7";
    return "#93C5FD";
  };

  const isEdgeOnPath = (from: number, to: number) => {
    const fromIdx = path.indexOf(from);
    const toIdx = path.indexOf(to);
    if (fromIdx === -1 || toIdx === -1) return false;
    return Math.abs(fromIdx - toIdx) === 1;
  };

  const showWeights = graph.edges.some((e) => e.weight !== 1);
  const showArrows = graph.directed;

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
        <svg width={graphSize.width} height={graphSize.height}>
          <ArrowDefs />
          {graph.edges.map((edge, i) => (
            <EdgeShape
              key={i}
              edge={edge}
              from={vertexPositions[edge.from]!}
              to={vertexPositions[edge.to]!}
              onPath={isEdgeOnPath(edge.from, edge.to)}
              showArrows={showArrows}
              showWeights={showWeights}
            />
          ))}
        </svg>

        {vertexPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center rounded-full font-bold text-white transition-all duration-300"
            style={{
              width: VERTEX_RADIUS * 2,
              height: VERTEX_RADIUS * 2,
              backgroundColor: getVertexColor(index),
              left: pos.x - VERTEX_RADIUS,
              top: pos.y - VERTEX_RADIUS,
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
