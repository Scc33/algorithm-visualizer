import GlossaryItem from "@/components/glossary/GlossaryItem";
import PageLayout from "@/components/layout/PageLayout";
import { glossaryTerms } from "@/lib/glossary/glossary";
import Link from "next/link";

export default function GlossaryPage() {
  return (
    <PageLayout
      title="Algorithm Glossary"
      subtitle="Key concepts and terminology to help you understand algorithms and their analysis."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          <div className="card p-6">
            <p className="text-gray-600 mb-6">
              This glossary provides definitions for common algorithm concepts
              and notation used throughout this site. Understanding these terms
              will help you better grasp how algorithms work and how we evaluate
              their performance.
            </p>

            <Link
              href="/about"
              className="btn btn-primary inline-flex items-center"
            >
              <span>Learn more about our educational approach</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Glossary terms */}
          {glossaryTerms.map((term) => (
            <GlossaryItem
              key={term.id}
              term={term.term}
              definition={term.definition}
              examples={term.examples}
              relatedTerms={term.relatedTerms}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
