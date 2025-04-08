interface AlgorithmPseudocodeProps {
  code: string[];
}

export default function AlgorithmPseudocode({
  code,
}: AlgorithmPseudocodeProps) {
  return (
    <div className="card">
      <div className="px-4 py-3 bg-gray-100 border-b">
        <h3 className="heading-sm">Pseudocode</h3>
      </div>

      <div className="p-4 bg-white overflow-auto">
        <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
          {code.map((line, index) => {
            // Calculate indentation to display nested blocks properly
            const indentMatch = line.match(/^\s*/);
            const indentLevel = indentMatch ? indentMatch[0].length / 4 : 0;
            const paddingLeft = `${indentLevel * 1.5}rem`;

            return (
              <div
                key={index}
                className="py-1 border-l-2 border-transparent hover:border-blue-400 hover:bg-blue-50"
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
