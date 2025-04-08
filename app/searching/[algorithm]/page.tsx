"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";
import { getRandomValueFromArray } from "@/lib/utils";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

export default function SearchingAlgorithmPage() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch, state } = useAlgorithm();

  const algorithmInfo = availableAlgorithms[algorithmKey];

  // Set the current algorithm and generate visualization
  useEffect(() => {
    if (algorithmKey) {
      dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });

      // Generate a new target value if none exists or when algorithm changes
      const target =
        state.target ||
        (state.data.length > 0 ? getRandomValueFromArray(state.data) : 42);

      dispatch({ type: "SET_TARGET", payload: target });

      // For binary search, ensure the array is sorted and the target exists
      const data = [...state.data];

      // Generate visualization if not already generated OR if algorithm changed
      if (!state.visualizationData || algorithmKey !== state.algorithm) {
        const algorithmFunction = getAlgorithmByName(algorithmKey);
        if (algorithmFunction) {
          try {
            const viz = algorithmFunction(data, target);
            dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
          } catch (error) {
            console.error("Error generating visualization:", error);
          }
        }
      }
    }
  }, [
    algorithmKey,
    dispatch,
    state.algorithm,
    state.data,
    state.visualizationData,
    state.target,
  ]);

  if (!algorithmInfo) {
    return notFound();
  }

  return (
    <PageLayout
      title={algorithmInfo.name}
      subtitle={algorithmInfo.subtitle}
      algorithmData={state.visualizationData || undefined}
    >
      <AlgorithmVisualizer />
    </PageLayout>
  );
}
