"use client";

import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { glossaryTerms } from "@/lib/glossary/glossary";
import { groupTermsByFirstLetter } from "@/lib/utils";
import type { GlossaryTerm } from "@/lib/glossary/glossary";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
}

function SearchFilter({
  searchTerm,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categories,
}: SearchFilterProps) {
  return (
    <div className="card mb-8 p-6">
      <div className="mb-6">
        <label
          htmlFor="term-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search Terms
        </label>
        <div className="relative">
          <input
            type="text"
            id="term-search"
            className="block w-full rounded-md border-gray-300 px-4 py-3 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search for terms..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
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
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">
          Filter by Category
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium ${activeCategory === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium capitalize ${activeCategory === category ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TermsByLetter({
  groupedTerms,
}: {
  groupedTerms: Record<string, GlossaryTerm[]>;
}) {
  return (
    <>
      {Object.keys(groupedTerms)
        .sort()
        .map((letter) => (
          <div key={letter} id={`section-${letter}`} className="mb-8">
            <h2 className="heading-lg mb-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
              {letter}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {groupedTerms[letter]!.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="card p-4 transition duration-200 hover:shadow-md"
                >
                  <h3 className="heading-md mb-2">{term.term}</h3>
                  <p className="line-clamp-2 text-gray-600">
                    {term.shortDefinition}
                  </p>
                  <div className="mt-2 flex">
                    <span className="badge badge-info capitalize">
                      {term.category}
                    </span>
                    <span className="ml-auto flex items-center text-sm text-blue-600">
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4"
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
    </>
  );
}

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTerms, setFilteredTerms] = useState(glossaryTerms);
  const [activeCategory, setActiveCategory] = useState("all");

  const groupedTerms = groupTermsByFirstLetter(filteredTerms);
  const categories = Array.from(
    new Set(glossaryTerms.map((term) => term.category))
  );

  useEffect(() => {
    let results = glossaryTerms;
    if (activeCategory !== "all") {
      results = results.filter((term) => term.category === activeCategory);
    }
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
      <div className="mx-auto max-w-4xl">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={categories}
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {Object.keys(groupedTerms)
            .sort()
            .map((letter) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 font-medium text-blue-700 hover:bg-blue-100"
              >
                {letter}
              </a>
            ))}
        </div>

        <div className="mb-8 text-center text-gray-200">
          {filteredTerms.length === 0 ? (
            <p>No terms found matching your search.</p>
          ) : (
            <p>
              {filteredTerms.length}{" "}
              {filteredTerms.length === 1 ? "term" : "terms"} found
            </p>
          )}
        </div>

        <TermsByLetter groupedTerms={groupedTerms} />
      </div>
    </PageLayout>
  );
}
