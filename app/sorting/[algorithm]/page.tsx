"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";
import { availableAlgorithms } from "@/lib/algorithms/metadata";

export default function AlgorithmPage() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch, state } = useAlgorithm();

  const algorithmInfo = availableAlgorithms[algorithmKey];

  // Set the current algorithm and generate visualization
  useEffect(() => {
    if (algorithmKey) {
      dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });

      // Generate visualization if not already generated OR if algorithm changed
      if (!state.visualizationData || algorithmKey !== state.algorithm) {
        const algorithmFunction = getAlgorithmByName(algorithmKey);
        if (algorithmFunction) {
          const viz = algorithmFunction(state.data);
          dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
        }
      }
    }
  }, [
    algorithmKey,
    dispatch,
    state.algorithm,
    state.data,
    state.visualizationData,
  ]);

  if (!algorithmInfo) {
    return (
      <PageLayout title="Algorithm Not Found">
        <div className="text-center py-12">
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
      algorithmData={state.visualizationData || undefined}
    >
      <AlgorithmVisualizer />
    </PageLayout>
  );
}
