import type { SearchStep } from "@/lib/types";

interface ArrayCellsProps {
  step: SearchStep;
}

export default function ArrayCells({ step }: ArrayCellsProps) {
  const { array, current, target, found, visited } = step;

  const isNotFound = current === -1 && visited.length > 0;
  let statusClass = "text-gray-600";
  let statusText = "Searching...";
  if (found) {
    statusClass = "text-green-600";
    statusText = "Found!";
  } else if (isNotFound) {
    statusClass = "text-red-600";
    statusText = "Not found";
  }

  return (
    <div className="flex w-full flex-col items-center space-y-8 bg-white p-6">
      <div className="mb-4 flex w-full items-center justify-end">
        <div className="font-medium text-gray-600">
          Status:
          <span className={`ml-2 font-bold ${statusClass}`}>{statusText}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        {array.map((value, index) => {
          let stateClass = "bg-blue-400";
          if (found && index === current) {
            stateClass = "bg-green-500";
          } else if (index === current && !found) {
            stateClass = "bg-yellow-400";
          } else if (visited.includes(index) && !found) {
            stateClass = "bg-gray-400";
          }

          return (
            <div key={index} className="relative flex flex-col items-center">
              <div
                className={`mx-1 rounded ${stateClass} flex flex-col items-center justify-center px-4 py-6 shadow-md transition-all duration-300`}
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
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 transform rounded-full border border-yellow-300 bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-900">
                  Current
                </div>
              )}
              {value === target && (
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 transform rounded-full border border-green-300 bg-green-100 px-2 py-1 text-xs font-medium text-green-900">
                  Target
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 w-full max-w-2xl">
        <div className="mb-2 text-sm font-medium">Progress:</div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
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
