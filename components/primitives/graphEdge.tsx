import type { Edge } from "@/lib/types";

export const VERTEX_RADIUS = 20;
export const EDGE_COLOR = "#CBD5E1";
export const PATH_EDGE_COLOR = "#F87171";
export const TREE_EDGE_COLOR = "#10B981";

export function edgeKey(from: number, to: number, directed: boolean): string {
  if (directed) return `${from}->${to}`;
  return from < to ? `${from}-${to}` : `${to}-${from}`;
}

function getMarkerEnd(
  showArrows: boolean,
  onPath: boolean,
  inTree: boolean
): string | undefined {
  if (!showArrows) return undefined;
  if (inTree) return "url(#arrowhead-tree)";
  return onPath ? "url(#arrowhead-path)" : "url(#arrowhead)";
}

function pickEdgeStroke(onPath: boolean, inTree: boolean): string {
  if (inTree) return TREE_EDGE_COLOR;
  if (onPath) return PATH_EDGE_COLOR;
  return EDGE_COLOR;
}

export function ArrowDefs() {
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
      <marker
        id="arrowhead-tree"
        viewBox="0 0 10 10"
        refX="10"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={TREE_EDGE_COLOR} />
      </marker>
    </defs>
  );
}

interface EdgeShapeProps {
  edge: Edge;
  from: { x: number; y: number };
  to: { x: number; y: number };
  onPath: boolean;
  inTree: boolean;
  showArrows: boolean;
  showWeights: boolean;
}

export function EdgeShape({
  edge,
  from,
  to,
  onPath,
  inTree,
  showArrows,
  showWeights,
}: EdgeShapeProps) {
  const stroke = pickEdgeStroke(onPath, inTree);
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
        markerEnd={getMarkerEnd(showArrows, onPath, inTree)}
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
