import Footer from "./Footer";
import Navbar from "./Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function PageLayout({
  children,
  title,
  subtitle,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {(title || subtitle) && (
          <div className="bg-gray-50 border-b">
            <div className="container-content py-8">
              {title && <h1 className="heading-xl">{title}</h1>}
              {subtitle && (
                <p className="mt-2 text-gray-600 max-w-3xl">{subtitle}</p>
              )}
            </div>
          </div>
        )}

        <div className="container-content py-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
