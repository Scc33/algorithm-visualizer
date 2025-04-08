"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName, availableAlgorithms } from "@/lib/algorithms";
import { getAlgorithmLabel, getRandomValueFromArray } from "@/lib/utils";

export default function SearchingAlgorithmPage() {
  const params = useParams();
  const algorithmKey = params.algorithm as string;
  const { dispatch, state } = useAlgorithm();

  // Find algorithm info
  const algorithmInfo = availableAlgorithms.find(
    (algo) => algo.key === algorithmKey
  );

  // Set the current algorithm and generate visualization
  useEffect(() => {
    if (algorithmKey) {
      dispatch({ type: "SET_ALGORITHM", payload: algorithmKey });

      // Generate a new target value if none exists or when algorithm changes
      const target =
        state.target !== undefined
          ? state.target
          : state.data.length > 0
          ? getRandomValueFromArray(state.data)
          : 42;

      dispatch({ type: "SET_TARGET", payload: target });

      // Generate visualization if not already generated OR if algorithm changed
      if (!state.visualizationData || algorithmKey !== state.algorithm) {
        const algorithmFunction = getAlgorithmByName(algorithmKey);
        if (algorithmFunction) {
          try {
            const viz = algorithmFunction(state.data, target);
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
