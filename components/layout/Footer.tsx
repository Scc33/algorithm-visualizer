import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 flex items-center justify-between lg:px-8">
        <a href="https://seancoughlin.me">
          <span className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Sean Coughlin
          </span>
        </a>
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/about" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">About</span>
            <span className="text-sm text-gray-500 hover:text-gray-900">
              About
            </span>
          </Link>
          <a
            href="https://portfolio.seancoughlin.me"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Portfolio</span>
            <span className="text-sm text-gray-500 hover:text-gray-900">
              Portfolio
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
