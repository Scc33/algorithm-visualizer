"use client";

import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { glossaryTerms } from "@/lib/glossary/glossary";
import { groupTermsByFirstLetter } from "@/lib/utils";

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTerms, setFilteredTerms] = useState(glossaryTerms);
  const [activeCategory, setActiveCategory] = useState("all");

  // Group terms alphabetically
  const groupedTerms = groupTermsByFirstLetter(filteredTerms);

  // Get all unique categories from glossary terms
  const categories = Array.from(
    new Set(glossaryTerms.map((term) => term.category))
  );

  // Effect for filtering terms based on search and category
  useEffect(() => {
    let results = glossaryTerms;

    // Filter by category if not "all"
    if (activeCategory !== "all") {
      results = results.filter((term) => term.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      results = results.filter(
        (term) =>
          term.term.toLowerCase().includes(lowercaseSearch) ||
          term.shortDefinition.toLowerCase().includes(lowercaseSearch)
      );
    }

    setFilteredTerms(results);
  }, [searchTerm, activeCategory]);

  return (
    <PageLayout
      title="Algorithm Glossary"
      subtitle="Comprehensive explanations of key algorithm concepts and terminology"
    >
      <div className="max-w-4xl mx-auto">
        {/* Search and filter section */}
        <div className="card p-6 mb-8">
          <div className="mb-6">
            <label
              htmlFor="term-search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Terms
            </label>
            <div className="relative">
              <input
                type="text"
                id="term-search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 pl-10"
                placeholder="Search for terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer capitalize ${
                    activeCategory === category
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alphabetical navigation */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {Object.keys(groupedTerms)
            .sort()
            .map((letter) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 font-medium hover:bg-blue-100"
              >
                {letter}
              </a>
            ))}
        </div>

        {/* Results count */}
        <div className="text-gray-200 mb-8 text-center">
          {filteredTerms.length === 0 ? (
            <p>No terms found matching your search.</p>
          ) : (
            <p>
              {filteredTerms.length}{" "}
              {filteredTerms.length === 1 ? "term" : "terms"} found
            </p>
          )}
        </div>

        {/* Glossary terms by alphabet */}
        {Object.keys(groupedTerms)
          .sort()
          .map((letter) => (
            <div key={letter} id={`section-${letter}`} className="mb-8">
              <h2 className="heading-lg mb-4 text-white bg-blue-600 px-4 py-2 rounded-lg">
                {letter}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {groupedTerms[letter].map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="card p-4 hover:shadow-md transition duration-200"
                  >
                    <h3 className="heading-md mb-2">{term.term}</h3>
                    <p className="text-gray-600 line-clamp-2">
                      {term.shortDefinition}
                    </p>
                    <div className="flex mt-2">
                      <span className="badge badge-info capitalize">
                        {term.category}
                      </span>
                      <span className="text-blue-600 ml-auto flex items-center text-sm">
                        Learn more
                        <svg
                          className="ml-1 w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </PageLayout>
  );
}
