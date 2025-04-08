"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 flex items-center justify-between lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
          <span className="text-xl font-bold text-blue-600">
            Algorithm Visualizer
          </span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/sorting" active={pathname.includes("/sorting")}>
            Sorting
          </NavLink>
          <NavLink href="/searching" active={pathname.includes("/searching")}>
            Searching
          </NavLink>
          <NavLink href="/graph" active={pathname.includes("/graph")}>
            Graph
          </NavLink>
          <NavLink href="/difficulty" active={pathname.includes("/difficulty")}>
            Difficulty
          </NavLink>
        </nav>

        <div className="md:hidden">
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
        active ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}
