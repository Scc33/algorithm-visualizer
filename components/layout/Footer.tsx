export default function Footer() {
  return (
    <footer className="bg-white border-t py-6">
      <div className="container-content">
        <div className="flex flex-col items-center justify-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Algorithm Visualizer</p>
          <p className="mt-1">
            Made with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
