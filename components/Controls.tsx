interface ControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onStepChange: (step: number) => void;
  onGenerateNewArray: () => void;
}

export default function Controls({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
  onStepChange,
  onGenerateNewArray,
}: ControlsProps) {
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={currentStep <= 0 || isPlaying}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Prev
        </button>

        {isPlaying ? (
          <button
            onClick={onPause}
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={currentStep >= totalSteps - 1}
            className="px-4 py-2 font-bold text-white bg-green-500 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
          >
            Play
          </button>
        )}

        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1 || isPlaying}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Next
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onReset}
          className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
        >
          Reset
        </button>

        <div className="flex items-center space-x-2">
          <span>Speed:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <button
          onClick={onGenerateNewArray}
          className="px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700"
        >
          New Array
        </button>
      </div>

      <div className="w-full">
        <input
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => onStepChange(parseInt(e.target.value))}
          className="w-full"
          disabled={isPlaying}
        />
        <div className="flex justify-between">
          <span>Step: {currentStep + 1}</span>
          <span>Total: {totalSteps}</span>
        </div>
      </div>
    </div>
  );
}
