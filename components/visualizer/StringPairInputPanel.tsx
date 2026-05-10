"use client";

import { useEffect, useState } from "react";

const MIN_LEN = 1;
const MAX_LEN = 12;

function validate(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length < MIN_LEN) return `Enter at least ${MIN_LEN} character.`;
  if (trimmed.length > MAX_LEN) return `Enter at most ${MAX_LEN} characters.`;
  return null;
}

interface StringPairInputPanelProps {
  initialA: string;
  initialB: string;
  onSet: (a: string, b: string) => void;
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

export default function StringPairInputPanel({
  initialA,
  initialB,
  onSet,
  onRandomize,
}: StringPairInputPanelProps) {
  const [aDraft, setADraft] = useState(initialA);
  const [bDraft, setBDraft] = useState(initialB);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setADraft(initialA);
    setBDraft(initialB);
    setError(null);
  }, [initialA, initialB]);

  const handleApply = () => {
    const aError = validate(aDraft);
    const bError = validate(bDraft);
    if (aError || bError) {
      setError(aError ?? bError);
      return;
    }
    setError(null);
    onSet(aDraft.trim(), bDraft.trim());
  };

  return (
    <div className="card space-y-4 p-6">
      <h3 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
        Input Strings
      </h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          String A (1–12 chars)
          <input
            type="text"
            value={aDraft}
            onChange={(e) => setADraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            aria-label="String A"
            maxLength={MAX_LEN}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          String B (1–12 chars)
          <input
            type="text"
            value={bDraft}
            onChange={(e) => setBDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            aria-label="String B"
            maxLength={MAX_LEN}
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={handleApply} className="btn btn-primary">
          Set
        </button>
        <button onClick={onRandomize} className="btn btn-secondary">
          Randomize
        </button>
      </div>
      <FieldError message={error} />
    </div>
  );
}
