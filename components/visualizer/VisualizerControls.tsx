"use client";

import { useState } from "react";
import { useAlgorithm } from "@/context/AlgorithmContext";

interface VisualizerControlsProps {
  currentStep: number;
  totalSteps: number;
}

const PrevIcon = (
  <svg
    className="h-5 w-5"
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
);

const NextIcon = (
  <svg
    className="h-5 w-5"
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
);

const PauseIcon = (
  <svg
    className="h-5 w-5"
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
);

const PlayIcon = (
  <svg
    className="h-5 w-5"
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
);

const ResetIcon = (
  <svg
    className="h-5 w-5"
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
);

export default function VisualizerControls({
  currentStep,
  totalSteps,
}: VisualizerControlsProps) {
  const { state, dispatch } = useAlgorithm();
  const { isPlaying, speed } = state;
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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

  return (
    <div className="card space-y-6 p-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep <= 0 || isPlaying}
          className="btn btn-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous"
        >
          {PrevIcon}
        </button>

        {isPlaying ? (
          <button
            onClick={handlePause}
            className="btn btn-danger flex cursor-pointer items-center space-x-2"
          >
            {PauseIcon}
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={handlePlay}
            disabled={currentStep >= totalSteps - 1}
            className="btn btn-success flex cursor-pointer items-center space-x-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {PlayIcon}
            <span>Play</span>
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={currentStep >= totalSteps - 1 || isPlaying}
          className="btn btn-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next"
        >
          {NextIcon}
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-1 flex justify-between text-sm">
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
          className="mb-1 text-sm font-medium text-gray-700"
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
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onClick={handleReset}
          className="btn btn-secondary flex w-full cursor-pointer items-center justify-center space-x-2"
        >
          {ResetIcon}
          <span>Reset</span>
        </button>

        <button
          onClick={handleShare}
          className="btn btn-primary flex w-full cursor-pointer items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600"
        >
          <span>{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>
    </div>
  );
}
