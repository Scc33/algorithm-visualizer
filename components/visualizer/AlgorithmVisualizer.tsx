"use client";

import SortingVisualization from "./SortingVisualization";
import SearchVisualization from "./SearchVisualization";
import VisualizerControls from "./VisualizerControls";
import AlgorithmInfo from "./AlgorithmInfo";
import AlgorithmPseudocode from "./AlgorithmPseudocode";
import ColorLegend from "./ColorLegend";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";
import { SearchStep, SortingStep } from "@/lib/types";
import { getRandomValueFromArray } from "@/lib/utils";

export default function AlgorithmVisualizer() {
  const { state, dispatch } = useAlgorithm();
  const { currentStep, algorithm, data, target, visualizationData } = state;

  // Generate a new random array
  const handleGenerateNewArray = () => {
    dispatch({
      type: "GENERATE_RANDOM_DATA",
      payload: { min: 5, max: 95, length: 15 },
    });

    // Set a new random target for search algorithms
    if (algorithm.includes("search")) {
      const newData = data.slice();
      const newTarget = getRandomValueFromArray(newData);
      dispatch({ type: "SET_TARGET", payload: newTarget });
    }

    // Regenerate visualization with the new data/target
    const algorithmFunction = getAlgorithmByName(algorithm);
    if (algorithmFunction) {
      try {
        const viz = algorithm.includes("search")
          ? algorithmFunction(data, target)
          : algorithmFunction(data);
        dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
      } catch (error) {
        console.error("Error generating visualization:", error);
      }
    }
  };

  // Set a new target value for search algorithms
  const handleSetTarget = () => {
    // Only show for search algorithms
    if (!algorithm.includes("search")) return;

    const newTarget = prompt(
      "Enter a target value to search for:",
      target?.toString()
    );
    if (newTarget === null) return; // User canceled

    const parsedTarget = parseInt(newTarget);
    if (isNaN(parsedTarget)) {
      alert("Please enter a valid number");
      return;
    }

    dispatch({ type: "SET_TARGET", payload: parsedTarget });

    // Regenerate visualization with the new target
    const algorithmFunction = getAlgorithmByName(algorithm);
    if (algorithmFunction) {
      const viz = algorithmFunction(data, parsedTarget);
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

  const isSearchAlgorithm = algorithm.toLowerCase().includes("search");
  console.log(algorithm, isSearchAlgorithm);

  return (
    <div className="space-y-8">
      <AlgorithmInfo algorithm={visualizationData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            {isSearchAlgorithm ? (
              <SearchVisualization
                step={visualizationData.steps[currentStep] as SearchStep}
                maxValue={maxValue}
              />
            ) : (
              <SortingVisualization
                step={visualizationData.steps[currentStep] as SortingStep}
                maxValue={maxValue}
              />
            )}
          </div>

          <VisualizerControls
            currentStep={currentStep}
            totalSteps={visualizationData.steps.length}
            onGenerateNewArray={handleGenerateNewArray}
            onSetTarget={isSearchAlgorithm ? handleSetTarget : undefined}
          />

          <ColorLegend isSearchAlgorithm={isSearchAlgorithm} />
        </div>

        <div className="lg:col-span-1">
          <AlgorithmPseudocode code={visualizationData.pseudoCode} />
        </div>
      </div>
    </div>
  );
}
