import { SearchStep } from "@/lib/types";
import { useAlgorithm } from "@/context/AlgorithmContext";
import { getAlgorithmByName } from "@/lib/algorithms";
import { useState, useEffect } from "react";

interface SearchVisualizationProps {
  step: SearchStep;
  maxValue: number;
}

export default function SearchVisualization({
  step,
}: SearchVisualizationProps) {
  const { array, current, target, found, visited } = step;
  const { state, dispatch } = useAlgorithm();
  const [inputTarget, setInputTarget] = useState(target.toString());

  // Update the input field when the target changes externally
  useEffect(() => {
    setInputTarget(target.toString());
  }, [target]);

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputTarget(newValue);

    // Only process valid numbers
    const newTarget = parseInt(newValue);
    if (!isNaN(newTarget) && newTarget !== target) {
      updateTarget(newTarget);
    }
  };

  const updateTarget = (newTarget: number) => {
    // Update the target value
    dispatch({ type: "SET_TARGET", payload: newTarget });

    // Regenerate visualization with the new target
    const algorithmFunction = getAlgorithmByName(state.algorithm);
    if (algorithmFunction) {
      try {
        const viz = algorithmFunction(state.data, newTarget);
        dispatch({ type: "GENERATE_VISUALIZATION", payload: viz });
      } catch (error) {
        console.error("Error generating visualization:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full p-6 bg-white">
      <div className="flex flex-wrap items-center gap-4 mb-4 w-full">
        <div className="flex items-center gap-2">
          <label htmlFor="target-input" className="font-medium text-gray-600">
            Target Value:
          </label>
          <input
            id="target-input"
            type="number"
            value={inputTarget}
            onChange={handleTargetChange}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-gray-600"
          />
        </div>

        <div className="font-medium ml-auto text-gray-600">
          Status:
          <span
            className={`ml-2 font-bold ${
              found
                ? "text-green-600"
                : current === -1 && visited.length > 0
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {found
              ? "Found!"
              : current === -1 && visited.length > 0
              ? "Not found"
              : "Searching..."}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        {array.map((value, index) => {
          // Determine the element's state for styling
          let stateClass = "bg-blue-400"; // Default state

          if (found && index === current) {
            stateClass = "bg-green-500"; // Found state
          } else if (index === current && !found) {
            stateClass = "bg-yellow-400"; // Current examining state
          } else if (visited.includes(index) && !found) {
            stateClass = "bg-gray-400"; // Already visited state
          }

          return (
            <div key={index} className="relative flex flex-col items-center">
              <div
                className={`mx-1 rounded ${stateClass} px-4 py-6 shadow-md flex flex-col justify-center items-center transition-all duration-300`}
                style={{
                  width: `${Math.max(100 / array.length - 4, 25)}px`,
                  height: `${Math.max(100 / array.length - 4, 25)}px`,
                }}
              >
                <div className="text-lg font-medium text-white">{value}</div>
              </div>
              <div className="mt-2 text-xs font-medium text-gray-500">
                Index: {index}
              </div>
              {index === current && (
                <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-900">
                  Current
                </div>
              )}
              {value === target && (
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded-full bg-green-100 border border-green-300 text-green-900">
                  Target
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="w-full mt-6 max-w-2xl">
        <div className="text-sm font-medium mb-2">Progress:</div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${
                (Math.min(visited.length, array.length) / array.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
