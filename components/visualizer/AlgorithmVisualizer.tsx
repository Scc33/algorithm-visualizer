"use client";

import React from "react";
import SortingVisualization from "./SortingVisualization";
import VisualizerControls from "./VisualizerControls";
import AlgorithmInfo from "./AlgorithmInfo";
import AlgorithmPseudocode from "./AlgorithmPseudocode";
import ColorLegend from "./ColorLegend";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";

export default function AlgorithmVisualizer() {
  const { state, dispatch } = useAlgorithm();
  const { currentStep, algorithm, data, visualizationData } = state;

  // Generate a new random array
  const handleGenerateNewArray = () => {
    dispatch({
      type: "GENERATE_RANDOM_DATA",
      payload: { min: 5, max: 95, length: 15 },
    });

    const algorithmFunction = getAlgorithmByName(algorithm);
    if (algorithmFunction) {
      const viz = algorithmFunction(data);
      dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
    }
  };

  // Find the maximum value in the array for scaling
  const maxValue = data.length > 0 ? Math.max(...data) : 100;

  if (!visualizationData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading visualization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AlgorithmInfo algorithm={visualizationData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <SortingVisualization
              step={visualizationData.steps[currentStep]}
              maxValue={maxValue}
            />
          </div>

          <VisualizerControls
            currentStep={currentStep}
            totalSteps={visualizationData.steps.length}
            onGenerateNewArray={handleGenerateNewArray}
          />

          <ColorLegend />
        </div>

        <div className="lg:col-span-1">
          <AlgorithmPseudocode code={visualizationData.pseudoCode} />
        </div>
      </div>
    </div>
  );
}
