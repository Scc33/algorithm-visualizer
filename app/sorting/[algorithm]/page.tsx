"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName, availableAlgorithms } from "@/lib/algorithms";
import { getAlgorithmLabel } from "@/lib/utils";

export default function AlgorithmPage() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch, state } = useAlgorithm();

  // Find algorithm info
  const algorithmInfo = availableAlgorithms.find(
    (algo) => algo.key === algorithmKey
  );

  // Set the current algorithm and generate visualization
  useEffect(() => {
    if (algorithmKey && algorithmKey !== state.algorithm) {
      dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });

      const algorithmFunction = getAlgorithmByName(algorithmKey);
      if (algorithmFunction) {
        const viz = algorithmFunction(state.data);
        dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
      }
    }
  }, [algorithmKey, dispatch, state.algorithm, state.data]);

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
      title={getAlgorithmLabel(algorithmKey)}
      subtitle={algorithmInfo.description}
      algorithmData={state.visualizationData || undefined}
    >
      <AlgorithmVisualizer />
    </PageLayout>
  );
}
