export default function ColorLegend() {
  const legendItems = [
    { color: "bg-blue-500", label: "Unsorted" },
    { color: "bg-yellow-500", label: "Comparing" },
    { color: "bg-red-500", label: "Swapping" },
    { color: "bg-green-500", label: "Sorted" },
  ];

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
