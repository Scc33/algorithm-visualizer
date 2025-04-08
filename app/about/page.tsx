import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PageLayout
      title="About Algorithm Visualizer"
      subtitle="Illuminating computational abstractions through dynamic visual representation"
    >
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="heading-lg mb-4 text-white">
            Our Philosophical Approach
          </h2>
          <p className="text-white mb-4">
            At its essence, Algorithm Visualizer serves as an intellectual
            bridge between abstract computational theory and tangible
            comprehension. We&apos;ve architected this platform upon the
            fundamental principle that algorithmic reasoning—a cornerstone of
            computational thinking—becomes profoundly more accessible when
            cognitive processing is augmented through visual perception and
            interactive engagement.
          </p>
          <p className="text-white mb-4">
            Much like how the Rosetta Stone unlocked ancient linguistic
            mysteries by providing parallel representations of the same content,
            our visualizations decode the cryptic language of algorithms by
            rendering their sequential operations in a visually coherent
            narrative. This multiplicity of representation transforms algorithms
            from abstract procedures into observable phenomena, making their
            inner mechanisms discernible to both novice learners and seasoned
            practitioners.
          </p>
          <p className="text-white mb-4">
            Whether you&apos;re a student navigating the labyrinthine pathways
            of computer science fundamentals, an educator curating pedagogical
            resources, or a professional developer refining your algorithmic
            toolkit, our platform offers a sophisticated lens through which the
            elegance and efficiency of computational methods become
            self-evident.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-lg mb-4 text-white">
            Architectural Cornerstones
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="heading-sm mb-2">Dynamic Visual Orchestration</h3>
              <p className="text-gray-700">
                Observe computational processes unfold with precision—much like
                watching a master chess player&apos;s strategy develop across a
                board. Our interactive controls allow you to calibrate temporal
                flow, facilitating both comprehensive overviews and meticulous
                analysis of individual transformations.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="heading-sm mb-2">Taxonomic Comprehensiveness</h3>
              <p className="text-gray-700">
                Our curated repository spans the algorithmic spectrum—from
                foundational sorting methodologies to sophisticated graph
                traversal techniques—organized with a graduated complexity
                framework that accommodates intellectual progression from
                elementary to advanced concepts.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="heading-sm mb-2">
                Intellectual Contextualization
              </h3>
              <p className="text-gray-700">
                Each algorithm is presented within its theoretical framework,
                accompanied by pseudocode abstractions and asymptotic complexity
                analyses—ensuring that practical visualizations are anchored in
                rigorous computer science principles and mathematical
                foundations.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="heading-sm mb-2">Cognitive Continuity</h3>
              <p className="text-gray-700">
                Your intellectual journey remains uninterrupted across sessions
                through persistent state management—like a well-placed bookmark
                in an engrossing novel—allowing you to construct knowledge
                incrementally while maintaining contextual awareness of
                previously explored concepts.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="heading-lg mb-4 text-white">Engagement Methodology</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li className="text-white">
              <span className="font-medium text-white">
                Algorithm Selection:
              </span>{" "}
              Navigate our taxonomical hierarchy—organized by both functional
              category and cognitive complexity—to identify an algorithm that
              aligns with your intellectual objectives.
            </li>
            <li className="text-white">
              <span className="font-medium text-white">
                Observational Analysis:
              </span>{" "}
              Witness the algorithm&apos;s procedural logic manifest through
              data transformations, with each operational stage delineated
              through chromatic encoding to elucidate its functional
              significance.
            </li>
            <li className="text-white">
              <span className="font-medium text-white">
                Temporal Modulation:
              </span>{" "}
              Exercise precise control over the visualization&apos;s
              chronological progression—initiate, suspend, incrementally advance
              or regress, and calibrate kinetic velocity to synchronize with
              your cognitive processing rate.
            </li>
            <li className="text-white">
              <span className="font-medium text-white">
                Permutational Exploration:
              </span>{" "}
              Generate diverse datasets to examine how algorithmic behavior
              adapts across variable input configurations—revealing both
              consistent patterns and edge-case behaviors that illuminate the
              algorithm&apos;s robust properties and potential vulnerabilities.
            </li>
            <li className="text-white">
              <span className="font-medium text-white">
                Theoretical Integration:
              </span>{" "}
              Complement empirical observation with analytical understanding by
              consulting the algorithm&apos;s formal specification (pseudocode)
              and efficiency metrics (complexity analysis)—establishing
              connections between practical implementation and theoretical
              foundations.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="heading-lg mb-4 text-white">Algorithmic Taxonomy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="heading-sm mb-2 text-white">
                Ordering Methodologies
              </h3>
              <p className="text-white">
                These algorithms—the linguistic syntax arrangers of the
                computational world—transform chaotic data collections into
                structured sequences through systematic element comparisons and
                permutations. Our repertoire encompasses both elementary
                approaches (Bubble, Selection, Insertion) that provide intuitive
                entry points, and sophisticated methodologies (Merge, Quick,
                Heap) that demonstrate advanced divide-and-conquer and
                tree-based strategies.
              </p>
            </div>
            <div>
              <h3 className="heading-sm mb-2 text-white">
                Retrieval Mechanisms
              </h3>
              <p className="text-white">
                Much like how skilled librarians employ different strategies to
                locate specific volumes—from sequential shelf scanning to
                indexed catalog consultation—these algorithms demonstrate the
                evolution from brute-force linear examination to
                logarithmically-efficient structured approaches that leverage
                data organization principles.
              </p>
            </div>
            <div>
              <h3 className="heading-sm mb-2 text-white">
                Network Traversal Frameworks
              </h3>
              <p className="text-white">
                These sophisticated mechanisms navigate the complex relational
                landscapes represented by graph structures—analogous to how
                different exploration strategies might be employed to traverse a
                city&apos;s transportation network, discover optimal pathways
                between destinations, or identify critical connection points
                within interconnected systems.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="heading-lg mb-4 text-white">
            Technological Infrastructure
          </h2>
          <p className="text-white mb-4">
            Our platform orchestrates a symphony of contemporary web
            technologies, meticulously integrated to deliver an immersive
            educational experience that balances computational robustness with
            interface elegance:
          </p>
          <ul className="list-disc pl-6 text-white">
            <li>
              React.js for declarative component architecture and state
              management
            </li>
            <li>
              Next.js for enhanced rendering strategies and navigation
              optimization
            </li>
            <li>
              TypeScript for compile-time type safety and enhanced development
              integrity
            </li>
            <li>
              Tailwind CSS for utility-first styling with consistent design
              language
            </li>
            <li>
              Client-side persistence via localStorage for maintaining session
              continuity
            </li>
          </ul>
        </section>

        <div className="mt-12 text-center">
          <Link href="/" className="btn btn-primary px-6 py-3">
            Commence Algorithmic Exploration
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
