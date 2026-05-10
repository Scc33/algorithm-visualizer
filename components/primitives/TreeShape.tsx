"use client";

import { useEffect, useState } from "react";
import type { BinaryTreeNode, TreeStep } from "@/lib/types";

interface PositionedNode {
  node: BinaryTreeNode;
  x: number;
  y: number;
}

const NODE_RADIUS = 22;
const VERTICAL_GAP = 70;
const HORIZONTAL_PADDING = 40;
const MIN_HEIGHT = 220;
const MIN_WIDTH = 360;

function findDepth(nodes: BinaryTreeNode[], rootId: number | null): number {
  if (rootId === null) return 0;
  const map = new Map(nodes.map((n) => [n.id, n]));
  const walk = (id: number | null): number => {
    if (id === null) return 0;
    const n = map.get(id);
    if (!n) return 0;
    return 1 + Math.max(walk(n.left), walk(n.right));
  };
  return walk(rootId);
}

function layoutTree(
  nodes: BinaryTreeNode[],
  rootId: number | null,
  width: number
): PositionedNode[] {
  if (rootId === null || nodes.length === 0) return [];
  const map = new Map(nodes.map((n) => [n.id, n]));
  const out: PositionedNode[] = [];

  const place = (
    id: number | null,
    depth: number,
    minX: number,
    maxX: number
  ) => {
    if (id === null) return;
    const n = map.get(id);
    if (!n) return;
    const x = (minX + maxX) / 2;
    const y = HORIZONTAL_PADDING + depth * VERTICAL_GAP;
    out.push({ node: n, x, y });
    place(n.left, depth + 1, minX, x);
    place(n.right, depth + 1, x, maxX);
  };

  place(rootId, 0, HORIZONTAL_PADDING, width - HORIZONTAL_PADDING);
  return out;
}

function nodeFill(id: number, step: TreeStep): string {
  if (step.inserted === id) return "#34D399";
  if (step.current === id) return "#FCD34D";
  if (step.compared.includes(id)) return "#FCA5A5";
  if (step.highlighted.includes(id)) return "#93C5FD";
  return "#E5E7EB";
}

interface TreeShapeProps {
  step: TreeStep;
}

export default function TreeShape({ step }: TreeShapeProps) {
  const [size, setSize] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });

  useEffect(() => {
    const update = () => {
      const width = Math.max(MIN_WIDTH, Math.min(640, window.innerWidth - 60));
      setSize({ width, height: MIN_HEIGHT });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const depth = findDepth(step.nodes, step.rootId);
  const height = Math.max(
    MIN_HEIGHT,
    HORIZONTAL_PADDING * 2 + depth * VERTICAL_GAP
  );
  const positions = layoutTree(step.nodes, step.rootId, size.width);
  const positionMap = new Map(positions.map((p) => [p.node.id, p]));

  return (
    <div className="flex w-full flex-col items-center bg-white p-6">
      <div
        className="relative rounded-lg border bg-gray-50"
        style={{ width: size.width, height }}
      >
        <svg width={size.width} height={height}>
          {positions.map(({ node, x, y }) => {
            const left = node.left !== null ? positionMap.get(node.left) : null;
            const right =
              node.right !== null ? positionMap.get(node.right) : null;
            return (
              <g key={`edges-${node.id}`}>
                {left && (
                  <line
                    x1={x}
                    y1={y}
                    x2={left.x}
                    y2={left.y}
                    stroke="#9CA3AF"
                    strokeWidth={2}
                  />
                )}
                {right && (
                  <line
                    x1={x}
                    y1={y}
                    x2={right.x}
                    y2={right.y}
                    stroke="#9CA3AF"
                    strokeWidth={2}
                  />
                )}
              </g>
            );
          })}
          {positions.map(({ node, x, y }) => (
            <g key={`node-${node.id}`}>
              <circle
                cx={x}
                cy={y}
                r={NODE_RADIUS}
                fill={nodeFill(node.id, step)}
                stroke="#1F2937"
                strokeWidth={1.5}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize={13}
                fontWeight={600}
                fill="#111827"
              >
                {node.value}
              </text>
            </g>
          ))}
          {positions.length === 0 && (
            <text
              x={size.width / 2}
              y={height / 2}
              textAnchor="middle"
              fontSize={14}
              fill="#6B7280"
            >
              (empty tree)
            </text>
          )}
        </svg>
      </div>
      {step.message && (
        <div className="mt-4 w-full rounded-md bg-gray-50 p-3 text-sm text-gray-700">
          {step.message}
        </div>
      )}
    </div>
  );
}
