"use client";

import { useState, useEffect } from "react";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { parseArrayInput } from "@/lib/urlState";

interface ArrayInputPanelProps {
  category: string;
  numVertices?: number;
  onSetArray: (data: number[]) => void;
  onSetTarget: (target: number) => void;
  onSetStart: (start: number) => void;
  onRandomize: () => void;
}

function FieldError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="text-sm text-red-600" role="alert">
      {message}
    </p>
  );
}

export default function ArrayInputPanel({
  category,
  numVertices = 6,
  onSetArray,
  onSetTarget,
  onSetStart,
  onRandomize,
}: ArrayInputPanelProps) {
  const { state } = useAlgorithm();
  const { data, target } = state;

  const [arrayDraft, setArrayDraft] = useState(data.join(", "));
  const [arrayError, setArrayError] = useState<string | null>(null);
  const [targetDraft, setTargetDraft] = useState(target !== undefined ? String(target) : "");
  const [targetError, setTargetError] = useState<string | null>(null);
  const [startDraft, setStartDraft] = useState(target !== undefined ? String(target) : "0");
  const [startError, setStartError] = useState<string | null>(null);

  useEffect(() => {
    setArrayDraft(data.join(", "));
    setArrayError(null);
  }, [data]);

  useEffect(() => {
    if (target !== undefined) {
      setTargetDraft(String(target));
      setTargetError(null);
      setStartDraft(String(target));
      setStartError(null);
    }
  }, [target]);

  const handleSetArray = () => {
    const result = parseArrayInput(arrayDraft);
    if (result.error) return setArrayError(result.error);
    setArrayError(null);
    onSetArray(result.data);
  };

  const handleSetTarget = () => {
    const n = Number(targetDraft.trim());
    if (!Number.isInteger(n) || isNaN(n) || n < 1 || n > 999)
      return setTargetError("Enter a whole number between 1 and 999.");
    setTargetError(null);
    onSetTarget(n);
  };

  const handleSetStart = () => {
    const n = Number(startDraft.trim());
    if (!Number.isInteger(n) || isNaN(n) || n < 0 || n >= numVertices)
      return setStartError(`Enter a vertex index between 0 and ${numVertices - 1}.`);
    setStartError(null);
    onSetStart(n);
  };

  if (category === "graph") {
    return (
      <div className="card space-y-4 p-6">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Graph Options
        </h3>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Start Vertex (0–{numVertices - 1})
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              max={numVertices - 1}
              value={startDraft}
              onChange={(e) => { setStartDraft(e.target.value); setStartError(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleSetStart()}
              className="w-24 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              aria-label="Start vertex"
            />
            <button onClick={handleSetStart} className="btn btn-primary">Set</button>
            <button onClick={onRandomize} className="btn btn-secondary">Randomize</button>
          </div>
          <FieldError message={startError} />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-4 p-6">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Input Data
      </h3>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Array (3–25 integers, 1–999, comma-separated)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={arrayDraft}
            onChange={(e) => { setArrayDraft(e.target.value); setArrayError(null); }}
            onKeyDown={(e) => e.key === "Enter" && handleSetArray()}
            placeholder="e.g. 5, 10, 23, 8, 42"
            className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            aria-label="Array input"
          />
          <button onClick={handleSetArray} className="btn btn-primary">Set</button>
          <button onClick={onRandomize} className="btn btn-secondary">Randomize</button>
        </div>
        <FieldError message={arrayError} />
      </div>
      {category === "searching" && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Search Target (1–999)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={999}
              value={targetDraft}
              onChange={(e) => { setTargetDraft(e.target.value); setTargetError(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleSetTarget()}
              className="w-28 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              aria-label="Search target"
            />
            <button onClick={handleSetTarget} className="btn btn-primary">Set</button>
          </div>
          <FieldError message={targetError} />
        </div>
      )}
    </div>
  );
}
