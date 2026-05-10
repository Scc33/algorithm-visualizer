"use client";

import { Suspense, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getGraphAlgorithm, isGraphAlgorithm } from "@/lib/algorithms";
import { defaultGraphFor } from "@/lib/algorithms/graph/sampleGraphs";
import { availableAlgorithms } from "@/lib/algorithms/metadata";
import { decodeUrlParams, encodeUrlParams } from "@/lib/urlState";

function computeGraphViz(algorithmKey: string, target: number | undefined) {
  if (!isGraphAlgorithm(algorithmKey)) return { startVertex: 0, viz: null };
  const graph = defaultGraphFor(algorithmKey);
  const startVertex =
    target !== undefined && target >= 0 && target < graph.numVertices
      ? target
      : 0;
  const algoFn = getGraphAlgorithm(algorithmKey);
  if (!algoFn) return { startVertex, viz: null };
  try {
    return { startVertex, viz: algoFn(graph, startVertex) };
  } catch (error) {
    console.error("Error generating visualization:", error);
    return { startVertex, viz: null };
  }
}

function GraphPageInner() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch, state } = useAlgorithm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initializedFromUrl = useRef(false);

  const algorithmInfo = availableAlgorithms[algorithmKey];

  // Initialize state from URL on first load
  useEffect(() => {
    if (initializedFromUrl.current) return;
    initializedFromUrl.current = true;
    const decoded = decodeUrlParams(searchParams);
    if (decoded.start !== undefined)
      dispatch({ type: "SET_TARGET", payload: decoded.start });
    if (decoded.speed) dispatch({ type: "SET_SPEED", payload: decoded.speed });
  }, [searchParams, dispatch]);

  // Set algorithm and generate visualization when algorithm or start vertex changes
  useEffect(() => {
    if (!algorithmKey) return;
    dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });
    if (state.visualizationData && algorithmKey === state.algorithm) return;
    const { startVertex, viz } = computeGraphViz(algorithmKey, state.target);
    dispatch({ type: "SET_TARGET", payload: startVertex });
    if (viz) dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
  }, [algorithmKey, dispatch, state.algorithm, state.data, state.visualizationData, state.target]);

  // Keep URL in sync with current start vertex and speed
  useEffect(() => {
    const urlParams = encodeUrlParams({
      ...(state.target !== undefined ? { start: state.target } : {}),
      speed: state.speed,
    });
    router.replace(`?${urlParams.toString()}`, { scroll: false });
  }, [state.target, state.speed, router]);

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

  return (
    <PageLayout
      title={algorithmInfo.name}
      subtitle={algorithmInfo.subtitle}
      {...(state.visualizationData !== null
        ? { algorithmData: state.visualizationData }
        : {})}
    >
      <AlgorithmVisualizer />
    </PageLayout>
  );
}

export default function GraphPage() {
  return (
    <Suspense>
      <GraphPageInner />
    </Suspense>
  );
}
