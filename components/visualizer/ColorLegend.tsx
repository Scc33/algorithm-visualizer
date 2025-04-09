interface ColorLegendProps {
  isSearchAlgorithm?: boolean;
  isGraphAlgorithm?: boolean;
}

export default function ColorLegend({
  isSearchAlgorithm = false,
  isGraphAlgorithm = false,
}: ColorLegendProps) {
  const sortingLegendItems = [
    { color: "bg-blue-400", label: "Unsorted" },
    { color: "bg-yellow-400", label: "Comparing" },
    { color: "bg-red-400", label: "Swapping" },
    { color: "bg-green-400", label: "Sorted" },
  ];

  const searchLegendItems = [
    { color: "bg-blue-400", label: "Unvisited" },
    { color: "bg-yellow-400", label: "Current" },
    { color: "bg-gray-400", label: "Visited" },
    { color: "bg-green-500", label: "Found" },
  ];

  const graphLegendItems = [
    { color: "bg-blue-300", label: "Unvisited Vertex" },
    { color: "bg-yellow-300", label: "Current Vertex" },
    { color: "bg-green-300", label: "Visited Vertex" },
    { color: "bg-red-400", label: "Path Edge" },
  ];

  let legendItems = sortingLegendItems;

  if (isSearchAlgorithm) {
    legendItems = searchLegendItems;
  } else if (isGraphAlgorithm) {
    legendItems = graphLegendItems;
  }

  return (
    <div className="card p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Color Legend</h3>

      <div className="flex flex-wrap gap-4">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center">
            <div
              className={`w-4 h-4 rounded mr-2 ${item.color}`}
              aria-hidden="true"
            ></div>
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
