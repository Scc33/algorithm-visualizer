interface CodeViewProps {
  code: string[];
  currentLine?: number;
}

export default function CodeView({ code, currentLine }: CodeViewProps) {
  return (
    <div className="card">
      <div className="border-b bg-gray-100 px-4 py-3">
        <h3 className="heading-sm">Pseudocode</h3>
      </div>

      <div className="overflow-auto bg-white p-4">
        <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800">
          {code.map((line, index) => {
            const indentMatch = line.match(/^\s*/);
            const indentLevel = indentMatch ? indentMatch[0].length / 4 : 0;
            const paddingLeft = `${indentLevel * 1.5}rem`;
            const isActive = currentLine === index;
            const lineClasses = isActive
              ? "border-yellow-400 bg-yellow-100"
              : "border-transparent hover:border-blue-400 hover:bg-blue-50";

            return (
              <div
                key={index}
                className={`border-l-2 py-1 transition-colors ${lineClasses}`}
                style={{ paddingLeft }}
              >
                {line}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
