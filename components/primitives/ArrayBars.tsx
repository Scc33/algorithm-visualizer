import type { SortingStep } from "@/lib/types";

interface ArrayBarsProps {
  step: SortingStep;
  maxValue: number;
}

export default function ArrayBars({ step, maxValue }: ArrayBarsProps) {
  const { array, comparing, swapped, completed } = step;

  return (
    <div className="flex h-64 w-full items-end justify-center bg-white p-6">
      {array.map((value, index) => {
        const height = (value / maxValue) * 100;

        let barColor = "bg-blue-400";
        if (completed.includes(index)) {
          barColor = "bg-green-400";
        } else if (comparing.includes(index)) {
          barColor = swapped ? "bg-red-400" : "bg-yellow-400";
        }

        return (
          <div
            key={index}
            className={`mx-1 rounded-t-sm ${barColor} bar-chart flex flex-col items-center justify-end`}
            style={{
              height: `${height}%`,
              width: `${Math.max(100 / array.length - 4, 6)}%`,
            }}
          >
            <div className="mb-1 text-xs font-medium text-white">{value}</div>
          </div>
        );
      })}
    </div>
  );
}
