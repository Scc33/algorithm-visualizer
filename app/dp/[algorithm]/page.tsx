"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import StringPairInputPanel from "@/components/visualizer/StringPairInputPanel";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getDpAlgorithm } from "@/lib/algorithms";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

const DEFAULT_PAIRS: Array<[string, string]> = [
  ["kitten", "sitting"],
  ["intention", "execution"],
  ["GACGTAC", "GTGTACG"],
  ["AGCAT", "GAC"],
  ["sunday", "saturday"],
];

function randomPair(): [string, string] {
  const idx = Math.floor(Math.random() * DEFAULT_PAIRS.length);
  return DEFAULT_PAIRS[idx]!;
}

function readStringParam(
  params: URLSearchParams,
  key: string,
  fallback: string
): string {
  const raw = params.get(key);
  if (raw === null) return fallback;
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.length > 12) return fallback;
  return trimmed;
}

function DpPageInner() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch } = useAlgorithm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initializedFromUrl = useRef(false);

  const algorithmInfo = availableAlgorithms[algorithmKey];

  const [stringA, setStringA] = useState("kitten");
  const [stringB, setStringB] = useState("sitting");

  useEffect(() => {
    if (initializedFromUrl.current) return;
    initializedFromUrl.current = true;
    const a = readStringParam(searchParams, "a", "kitten");
    const b = readStringParam(searchParams, "b", "sitting");
    setStringA(a);
    setStringB(b);
  }, [searchParams]);

  useEffect(() => {
    if (!algorithmKey) return;
    dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });
    const fn = getDpAlgorithm(algorithmKey);
    if (!fn) return;
    try {
      const viz = fn(stringA, stringB);
      dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
    } catch (error) {
      console.error("Error generating visualization:", error);
    }
  }, [algorithmKey, stringA, stringB, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("a", stringA);
    params.set("b", stringB);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [stringA, stringB, router]);

  if (!algorithmInfo) {
    return (
      <PageLayout title="Algorithm Not Found">
        <div className="py-12 text-center">
          <h2 className="heading-lg text-red-600">Algorithm Not Found</h2>
          <p className="mt-4 text-gray-600">
            The algorithm you are looking for does not exist or is not
            available.
          </p>
        </div>
      </PageLayout>
    );
  }

  const handleSet = (a: string, b: string) => {
    setStringA(a);
    setStringB(b);
  };

  const handleRandomize = () => {
    const [a, b] = randomPair();
    setStringA(a);
    setStringB(b);
  };

  return (
    <PageLayout title={algorithmInfo.name} subtitle={algorithmInfo.subtitle}>
      <div className="mb-6">
        <StringPairInputPanel
          initialA={stringA}
          initialB={stringB}
          onSet={handleSet}
          onRandomize={handleRandomize}
        />
      </div>
      <AlgorithmVisualizer />
    </PageLayout>
  );
}

export default function DpAlgorithmPage() {
  return (
    <Suspense>
      <DpPageInner />
    </Suspense>
  );
}
