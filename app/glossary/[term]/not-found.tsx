import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

export default function TermNotFound() {
  return (
    <PageLayout title="Glossary Term Not Found">
      <div className="flex flex-col items-center justify-center py-12 max-w-4xl mx-auto">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-4xl font-bold text-red-500 mb-4">
            Term Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The glossary term you are looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link
              href="/glossary"
              className="btn btn-primary px-6 py-3 rounded-lg shadow-md"
            >
              Browse Glossary
            </Link>
            <Link
              href="/"
              className="btn btn-secondary px-6 py-3 rounded-lg shadow-md"
            >
              Return Home
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg max-w-2xl">
          <h3 className="heading-md mb-4 text-blue-800">
            Looking for algorithm concepts?
          </h3>
          <p className="text-blue-700 mb-4">
            Our glossary covers key algorithmic concepts like Big O notation,
            time complexity, space complexity, and more.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              href="/glossary/algorithm"
              className="badge badge-info text-center py-2"
            >
              Algorithm
            </Link>
            <Link
              href="/glossary/big-o-notation"
              className="badge badge-info text-center py-2"
            >
              Big O Notation
            </Link>
            <Link
              href="/glossary/time-complexity"
              className="badge badge-info text-center py-2"
            >
              Time Complexity
            </Link>
            <Link
              href="/glossary/space-complexity"
              className="badge badge-info text-center py-2"
            >
              Space Complexity
            </Link>
            <Link
              href="/glossary/sorting-algorithm"
              className="badge badge-info text-center py-2"
            >
              Sorting
            </Link>
            <Link
              href="/glossary/searching-algorithm"
              className="badge badge-info text-center py-2"
            >
              Searching
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
