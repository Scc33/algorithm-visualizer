import { notFound } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import {
  getGlossaryTermBySlug,
  getRelatedTerms,
} from "@/lib/glossary/glossary";
import type { Metadata } from "next";

type TermPageProps = {
  params: {
    term: string;
  };
};

export async function generateMetadata({
  params,
}: TermPageProps): Promise<Metadata> {
  const term = getGlossaryTermBySlug(params.term);

  if (!term) {
    return {
      title: "Term Not Found | Algorithm Visualizer Glossary",
      description: "The requested glossary term could not be found.",
    };
  }

  return {
    title: `${term.term} - Algorithm Glossary`,
    description: term.shortDefinition,
    keywords: [
      term.term.toLowerCase(),
      "algorithm",
      term.category,
      "computer science",
      "programming",
      "algorithm terminology",
      ...(term.keywords || []),
    ],
  };
}

export default function GlossaryTermPage({ params }: TermPageProps) {
  const term = getGlossaryTermBySlug(params.term);

  if (!term) {
    notFound();
  }

  const relatedTerms = getRelatedTerms(term.slug);

  return (
    <PageLayout title={term.term} subtitle={term.shortDefinition}>
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link
                href="/glossary"
                className="text-gray-500 hover:text-gray-700"
              >
                Glossary
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="font-medium text-blue-600">{term.term}</li>
          </ol>
        </nav>

        <div className="card mb-8 p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <span className="badge badge-info capitalize">
                {term.category}
              </span>
              <h1 className="heading-xl mt-2">{term.term}</h1>
            </div>

            <Link
              href="/glossary"
              className="btn btn-secondary flex items-center"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Glossary
            </Link>
          </div>

          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: term.fullDefinition }}
              className="text-gray-700"
            />
          </div>

          {term.examples && (
            <div className="mt-8">
              <h2 className="heading-lg mb-4">Examples</h2>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <ul className="list-disc space-y-3 pl-6 text-gray-700">
                  {term.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {term.codeExample && (
            <div className="mt-8">
              <h2 className="heading-lg mb-4">Code Example</h2>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-6 text-white">
                <pre className="text-sm">
                  <code>{term.codeExample}</code>
                </pre>
              </div>
            </div>
          )}

          {term.visualAid && (
            <div className="mt-8">
              <h2 className="heading-lg mb-4">Visual Explanation</h2>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div dangerouslySetInnerHTML={{ __html: term.visualAid }} />
              </div>
            </div>
          )}
        </div>

        {relatedTerms.length > 0 && (
          <div className="card mb-8 p-6">
            <h2 className="heading-md mb-4">Related Terms</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedTerms.map((relatedTerm) => (
                <Link
                  key={relatedTerm.slug}
                  href={`/glossary/${relatedTerm.slug}`}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition duration-200 hover:border-gray-300 hover:bg-gray-100"
                >
                  <h3 className="heading-sm">{relatedTerm.term}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                    {relatedTerm.shortDefinition}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="card mb-8 p-6">
          <h2 className="heading-md mb-4">Further Learning</h2>
          <p className="mb-4 text-gray-600">
            Want to see these concepts in action?
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/sorting" className="btn btn-primary">
              Explore Sorting Algorithms
            </Link>
            <Link href="/searching" className="btn btn-primary">
              Explore Searching Algorithms
            </Link>
            <Link href="/graph" className="btn btn-primary">
              Explore Graph Algorithms
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
