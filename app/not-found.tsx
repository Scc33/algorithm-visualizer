import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

export default function NotFound() {
  return (
    <PageLayout title="Page Not Found">
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-4xl font-bold text-red-500 mb-4">404</h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/"
            className="btn btn-primary px-6 py-3 rounded-lg shadow-md"
          >
            Return Home
          </Link>
          <Link
            href="/sorting"
            className="btn btn-secondary px-6 py-3 rounded-lg shadow-md"
          >
            Explore Sorting Algorithms
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
