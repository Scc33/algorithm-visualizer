"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

function computeGraphViz(algorithmKey: string, target: number | undefined) {
  let startVertex = 0;
  if (target !== undefined && target >= 0 && target < 6) {
    startVertex = target;
  }
  const algoFn = getAlgorithmByName(algorithmKey);
  if (!algoFn) return { startVertex, viz: null };
  try {
    return { startVertex, viz: algoFn([], startVertex) };
  } catch (error) {
    console.error("Error generating visualization:", error);
    return { startVertex, viz: null };
  }
}

export default function GraphPage() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch, state } = useAlgorithm();

  const algorithmInfo = availableAlgorithms[algorithmKey];

  useEffect(() => {
    if (!algorithmKey) return;
    dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });
    if (state.visualizationData && algorithmKey === state.algorithm) return;
    const { startVertex, viz } = computeGraphViz(algorithmKey, state.target);
    dispatch({ type: "SET_TARGET", payload: startVertex });
    if (viz) dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
  }, [
    algorithmKey,
    dispatch,
    state.algorithm,
    state.data,
    state.visualizationData,
    state.target,
  ]);

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
