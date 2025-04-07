import { SortingStep } from "@/lib/types";

interface SortingVisualizationProps {
  step: SortingStep;
  maxValue: number;
}

export default function SortingVisualization({
  step,
  maxValue,
}: SortingVisualizationProps) {
  const { array, comparing, swapped, completed } = step;

  return (
    <div className="flex items-end justify-center w-full h-64 p-4 bg-white rounded-lg shadow">
      {array.map((value, index) => {
        const height = (value / maxValue) * 100;

        let backgroundColor = "bg-blue-500";
        if (completed.includes(index)) {
          backgroundColor = "bg-green-500";
        } else if (comparing.includes(index)) {
          backgroundColor = swapped ? "bg-red-500" : "bg-yellow-500";
        }

        return (
          <div
            key={index}
            className={`mx-1 ${backgroundColor} transition-all duration-300`}
            style={{
              height: `${height}%`,
              width: `${Math.max(100 / array.length - 2, 4)}%`,
            }}
          >
            <div className="text-xs text-center text-white">{value}</div>
          </div>
        );
      })}
    </div>
  );
}
