"use client";

import { useAlgorithm } from "@/context/AlgorithmContext";

interface VisualizerControlsProps {
  currentStep: number;
  totalSteps: number;
  onGenerateNewArray: () => void;
  algorithmCategory?: string;
}

export default function VisualizerControls({
  currentStep,
  totalSteps,
  onGenerateNewArray,
  algorithmCategory = "sorting",
}: VisualizerControlsProps) {
  const { state, dispatch } = useAlgorithm();
  const { isPlaying, speed } = state;

  // Control handlers
  const handlePlay = () => dispatch({ type: "SET_IS_PLAYING", payload: true });
  const handlePause = () =>
    dispatch({ type: "SET_IS_PLAYING", payload: false });
  const handleNext = () => dispatch({ type: "NEXT_STEP" });
  const handlePrev = () => dispatch({ type: "PREV_STEP" });
  const handleReset = () => dispatch({ type: "RESET" });
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_SPEED", payload: parseInt(e.target.value) });
  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_CURRENT_STEP", payload: parseInt(e.target.value) });

  // Determine button text based on algorithm category
  const newDataButtonText =
    algorithmCategory === "graph" ? "New Graph" : "New Array";

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep <= 0 || isPlaying}
          className="btn btn-primary disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {isPlaying ? (
          <button
            onClick={handlePause}
            className="btn btn-danger flex items-center space-x-2 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={handlePlay}
            disabled={currentStep >= totalSteps - 1}
            className="btn btn-success flex items-center space-x-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Play</span>
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={currentStep >= totalSteps - 1 || isPlaying}
          className="btn btn-primary disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-gray-500">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={handleStepChange}
          className="slider-control w-full"
          disabled={isPlaying}
          aria-label="Progress"
        />
      </div>

      <div className="flex flex-col">
        <label
          className="text-sm font-medium text-gray-700 mb-1"
          id="speed-label"
        >
          Animation Speed
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={handleSpeedChange}
          className="slider-control"
          aria-labelledby="speed-label"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleReset}
            className="btn btn-secondary w-full flex items-center justify-center space-x-2 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Reset</span>
          </button>
        </div>

        <div>
          <button
            onClick={onGenerateNewArray}
            className="btn btn-primary bg-purple-500 hover:bg-purple-600 w-full flex items-center justify-center space-x-2 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{newDataButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
