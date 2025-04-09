import React from "react";
import Link from "next/link";

interface GlossaryItemProps {
  term: string;
  definition: string | React.ReactNode;
  examples?: string[] | React.ReactNode;
  relatedTerms?: Array<{
    term: string;
    link?: string;
  }>;
}

export default function GlossaryItem({
  term,
  definition,
  examples,
  relatedTerms,
}: GlossaryItemProps) {
  // Create an ID from the term for anchor linking
  const termId = term.toLowerCase().replace(/\s+/g, "-");

  return (
    <div id={termId} className="card p-6 scroll-mt-24">
      <h2 className="heading-lg mb-4 flex items-center group">
        <span className="text-gray-900">{term}</span>
        <a
          href={`#${termId}`}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"
          aria-label={`Link to ${term} definition`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </a>
      </h2>

      <div className="text-gray-700 mb-6 text-lg">{definition}</div>

      {examples && (
        <div className="mb-6">
          <h3 className="heading-sm mb-2 text-gray-800">Examples</h3>
          {Array.isArray(examples) ? (
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          ) : (
            examples
          )}
        </div>
      )}

      {relatedTerms && relatedTerms.length > 0 && (
        <div>
          <h3 className="heading-sm mb-2 text-gray-800">Related Terms</h3>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((relatedTerm, index) => (
              <Link
                key={index}
                href={
                  relatedTerm.link ||
                  `#${relatedTerm.term.toLowerCase().replace(/\s+/g, "-")}`
                }
                className="badge badge-info"
              >
                {relatedTerm.term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
