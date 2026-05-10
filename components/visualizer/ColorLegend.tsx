interface ColorLegendProps {
  isSearchAlgorithm?: boolean;
  isGraphAlgorithm?: boolean;
  isTreeAlgorithm?: boolean;
  isGridAlgorithm?: boolean;
}

interface LegendItem {
  color: string;
  label: string;
}

const sortingItems: LegendItem[] = [
  { color: "bg-blue-400", label: "Unsorted" },
  { color: "bg-yellow-400", label: "Comparing" },
  { color: "bg-red-400", label: "Swapping" },
  { color: "bg-green-400", label: "Sorted" },
];

const searchItems: LegendItem[] = [
  { color: "bg-blue-400", label: "Unvisited" },
  { color: "bg-yellow-400", label: "Current" },
  { color: "bg-gray-400", label: "Visited" },
  { color: "bg-green-500", label: "Found" },
];

const graphItems: LegendItem[] = [
  { color: "bg-blue-300", label: "Unvisited Vertex" },
  { color: "bg-yellow-300", label: "Current Vertex" },
  { color: "bg-green-300", label: "Visited Vertex" },
  { color: "bg-red-400", label: "Path Edge" },
];

const treeItems: LegendItem[] = [
  { color: "bg-gray-200", label: "Existing Node" },
  { color: "bg-blue-300", label: "Path / Visited" },
  { color: "bg-yellow-300", label: "Current Node" },
  { color: "bg-red-300", label: "Compared" },
  { color: "bg-emerald-400", label: "Just Inserted" },
];

const gridItems: LegendItem[] = [
  { color: "bg-white border border-gray-300", label: "Empty / Filled" },
  { color: "bg-blue-100", label: "Dependency" },
  { color: "bg-yellow-300", label: "Current Cell" },
  { color: "bg-emerald-200", label: "Solution Path" },
];

function pickItems(props: ColorLegendProps): LegendItem[] {
  if (props.isSearchAlgorithm) return searchItems;
  if (props.isGraphAlgorithm) return graphItems;
  if (props.isTreeAlgorithm) return treeItems;
  if (props.isGridAlgorithm) return gridItems;
  return sortingItems;
}

export default function ColorLegend(props: ColorLegendProps) {
  const legendItems = pickItems(props);

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
