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
    <div className="flex items-end justify-center w-full h-64 p-6 bg-white">
      {array.map((value, index) => {
        const height = (value / maxValue) * 100;

        // Determine the bar color based on its state
        let barColor = "bg-blue-400";
        if (completed.includes(index)) {
          barColor = "bg-green-400";
        } else if (comparing.includes(index)) {
          barColor = swapped ? "bg-red-400" : "bg-yellow-400";
        }

        return (
          <div
            key={index}
            className={`mx-1 rounded-t-sm ${barColor} bar-chart flex flex-col justify-end items-center`}
            style={{
              height: `${height}%`,
              width: `${Math.max(100 / array.length - 4, 6)}%`,
            }}
          >
            <div className="text-xs font-medium text-white mb-1">{value}</div>
          </div>
        );
      })}
    </div>
  );
}
