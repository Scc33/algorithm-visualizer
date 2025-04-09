export interface GlossaryTerm {
  slug: string;
  term: string;
  category: string;
  shortDefinition: string;
  fullDefinition: string;
  examples?: string[];
  codeExample?: string;
  visualAid?: string;
  relatedTerms?: string[]; // Array of term slugs
  keywords?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "algorithm",
    term: "Algorithm",
    category: "fundamental",
    shortDefinition:
      "A step-by-step procedure for solving a problem or accomplishing a task.",
    fullDefinition: `
      <p>An algorithm is a finite sequence of well-defined, computer-implementable instructions, typically used to solve a class of problems or to perform a computation.</p>
      
      <p>Algorithms are unambiguous specifications for performing calculations, data processing, automated reasoning, and other tasks. They form the foundation of everything we do in computer science and programming.</p>
      
      <p>A good algorithm generally has the following characteristics:</p>
      <ul>
        <li><strong>Correctness</strong>: It should solve the problem it was designed to solve</li>
        <li><strong>Efficiency</strong>: It should use computational resources optimally</li>
        <li><strong>Finiteness</strong>: It must terminate after a finite number of steps</li>
        <li><strong>Deterministic</strong>: Given the same input, it should always produce the same output</li>
      </ul>
      
      <p>Algorithms can be expressed in many ways, including natural language, pseudocode, flowcharts, and programming languages. The efficiency of algorithms is typically measured in terms of their time complexity (how long they take to run) and space complexity (how much memory they require).</p>
    `,
    examples: [
      "Sorting algorithms arrange items in a specific order (e.g., Bubble Sort, Quick Sort)",
      "Search algorithms locate items within a data structure (e.g., Binary Search)",
      "Graph algorithms find paths, connectivity, or properties of graphs (e.g., Dijkstra's algorithm)",
      "String matching algorithms find patterns in text (e.g., Boyer-Moore algorithm)",
    ],
    relatedTerms: [
      "big-o-notation",
      "time-complexity",
      "space-complexity",
      "pseudocode",
    ],
    keywords: ["computation", "procedure", "process", "method", "technique"],
  },
  {
    slug: "big-o-notation",
    term: "Big O Notation",
    category: "analysis",
    shortDefinition:
      "A mathematical notation that describes the limiting behavior of a function when the argument tends towards infinity.",
    fullDefinition: `
      <p>Big O Notation is a mathematical notation used in computer science to describe the performance or complexity of an algorithm. Specifically, it describes the worst-case scenario and can be used to describe the execution time or space requirements of an algorithm.</p>
      
      <p>The "O" in Big O notation stands for "Order of," which indicates the rate of growth of an algorithm. This notation characterizes functions according to their growth rates: different functions with the same growth rate may be represented using the same O notation.</p>
      
      <p>When analyzing algorithms, we're primarily concerned with how they scale - that is, how their performance changes as the input size grows. Big O notation allows us to express this relationship mathematically, ignoring constants and lower-order terms that become insignificant with large inputs.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">Common Big O Complexities (from fastest to slowest):</h3>
      <ul>
        <li><strong>O(1)</strong> - Constant time: The operation takes the same amount of time regardless of the input size</li>
        <li><strong>O(log n)</strong> - Logarithmic time: Time increases logarithmically with input size</li>
        <li><strong>O(n)</strong> - Linear time: Time increases linearly with input size</li>
        <li><strong>O(n log n)</strong> - Linearithmic time: Common for efficient sorting algorithms</li>
        <li><strong>O(n²)</strong> - Quadratic time: Often seen in algorithms with nested loops</li>
        <li><strong>O(n³)</strong> - Cubic time: Typically found in algorithms with three nested loops</li>
        <li><strong>O(2^n)</strong> - Exponential time: Each additional element doubles the processing time</li>
        <li><strong>O(n!)</strong> - Factorial time: Used in algorithms that generate all permutations</li>
      </ul>
    `,
    codeExample: `// O(1) - Constant time
function getFirstElement(array) {
  return array[0];
}

// O(n) - Linear time
function findMax(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

// O(n²) - Quadratic time
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}`,
    visualAid: `
      <div class="bg-white p-4">
        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2">Growth Rate Comparison</h4>
          <div class="h-64 relative">
            <div class="absolute inset-0 flex items-end">
              <div class="w-1/8 h-1 bg-blue-500" title="O(1)"></div>
              <div class="w-1/8 h-6 bg-green-500" title="O(log n)"></div>
              <div class="w-1/8 h-32 bg-yellow-500" title="O(n)"></div>
              <div class="w-1/8 h-40 bg-orange-400" title="O(n log n)"></div>
              <div class="w-1/8 h-56 bg-red-500" title="O(n²)"></div>
              <div class="w-1/8 h-60 bg-purple-500" title="O(2^n)"></div>
              <div class="w-1/8 h-64 bg-pink-500" title="O(n!)"></div>
            </div>
          </div>
          <div class="flex text-xs font-medium">
            <div class="w-1/8 text-blue-500">O(1)</div>
            <div class="w-1/8 text-green-500">O(log n)</div>
            <div class="w-1/8 text-yellow-500">O(n)</div>
            <div class="w-1/8 text-orange-400">O(n log n)</div>
            <div class="w-1/8 text-red-500">O(n²)</div>
            <div class="w-1/8 text-purple-500">O(2^n)</div>
            <div class="w-1/8 text-pink-500">O(n!)</div>
          </div>
        </div>
      </div>
    `,
    relatedTerms: [
      "time-complexity",
      "space-complexity",
      "asymptotic-analysis",
      "algorithm",
    ],
    keywords: [
      "complexity",
      "algorithm analysis",
      "efficiency",
      "performance",
      "computational complexity",
    ],
  },
  {
    slug: "time-complexity",
    term: "Time Complexity",
    category: "analysis",
    shortDefinition:
      "A measure of the amount of time an algorithm takes to complete as a function of the length of the input.",
    fullDefinition: `
      <p>Time complexity is a computational concept that measures the amount of time an algorithm takes to complete as a function of the length of the input. It provides a way to express how the runtime of an algorithm grows as the size of the input increases.</p>
      
      <p>When analyzing time complexity, we're usually concerned with the worst-case scenario—the maximum amount of time an algorithm could take given any valid input of size n. However, we sometimes also consider:</p>
      
      <ul>
        <li><strong>Best-case complexity</strong>: The minimum time required for an algorithm (often not very useful)</li>
        <li><strong>Average-case complexity</strong>: The expected time for a typical input</li>
        <li><strong>Amortized complexity</strong>: The time per operation, averaged over a sequence of operations</li>
      </ul>
      
      <p>Time complexity is commonly expressed using Big O notation, which gives us an asymptotic upper bound on the growth rate of the algorithm's runtime. This means we focus on how the algorithm scales with large inputs, rather than the exact number of operations for a specific input size.</p>
      
      <p>When calculating time complexity, we generally follow these principles:</p>
      <ul>
        <li>Ignore constants: O(2n) is simplified to O(n)</li>
        <li>Keep only the highest-order term: O(n² + n) is simplified to O(n²)</li>
        <li>Focus on the dominant operations (usually comparisons or iterations)</li>
      </ul>
    `,
    examples: [
      "O(1) - Constant time: Array access, basic arithmetic operations",
      "O(log n) - Logarithmic time: Binary search, operations in balanced binary search trees",
      "O(n) - Linear time: Linear search, traversing an array or linked list",
      "O(n log n) - Linearithmic time: Efficient sorting algorithms like Merge Sort and Quick Sort",
      "O(n²) - Quadratic time: Simple sorting algorithms like Bubble Sort, nested loops processing each element",
    ],
    relatedTerms: [
      "big-o-notation",
      "space-complexity",
      "algorithmic-efficiency",
    ],
    keywords: [
      "runtime",
      "performance",
      "efficiency",
      "computational complexity",
      "algorithmic analysis",
    ],
  },
  {
    slug: "space-complexity",
    term: "Space Complexity",
    category: "analysis",
    shortDefinition:
      "A measure of the amount of memory an algorithm uses as a function of the length of the input.",
    fullDefinition: `
      <p>Space complexity is a measure of the amount of memory or storage space that an algorithm requires as a function of the input size. It quantifies how much additional memory the algorithm needs to complete its execution beyond the space needed to store the input.</p>
      
      <p>When analyzing space complexity, we consider:</p>
      
      <ul>
        <li><strong>Auxiliary space</strong>: The extra space used by the algorithm (excluding input size)</li>
        <li><strong>Total space</strong>: The sum of auxiliary space and input size</li>
      </ul>
      
      <p>Like time complexity, space complexity is typically expressed using Big O notation, representing the worst-case space usage. This helps us understand how an algorithm's memory requirements scale with larger inputs.</p>
      
      <p>Space complexity considers various memory usages:</p>
      <ul>
        <li>Variables and constants</li>
        <li>Data structures (arrays, lists, stacks, etc.)</li>
        <li>Function call stack (especially important in recursive algorithms)</li>
        <li>Allocation of objects or structures during execution</li>
      </ul>
      
      <p>An important concept related to space complexity is the distinction between "in-place" algorithms (which use O(1) auxiliary space) and algorithms that require significant additional space proportional to the input size.</p>
    `,
    examples: [
      "O(1) - Constant space: Algorithms that use a fixed amount of extra space regardless of input size (like iterative implementations of many algorithms)",
      "O(log n) - Logarithmic space: Often seen in recursive implementations of divide and conquer algorithms (the call stack uses logarithmic space)",
      "O(n) - Linear space: Algorithms that use extra space directly proportional to input size (like creating a new array of the same size)",
      "O(n²) - Quadratic space: Algorithms that create data structures with size proportional to n² (like adjacency matrices for graphs)",
    ],
    relatedTerms: ["big-o-notation", "time-complexity", "in-place-algorithm"],
    keywords: [
      "memory usage",
      "storage requirements",
      "auxiliary space",
      "in-place",
      "memory complexity",
    ],
  },
  {
    slug: "sorting-algorithm",
    term: "Sorting Algorithm",
    category: "algorithms",
    shortDefinition:
      "Algorithms that arrange elements in a specific order, typically ascending or descending.",
    fullDefinition: `
      <p>Sorting algorithms are procedures that arrange elements in a specific order, typically in ascending or descending order based on a comparison operator. They are fundamental algorithms studied in computer science and are essential in many applications.</p>
      
      <p>Sorting algorithms can be categorized in several ways:</p>
      
      <ul>
        <li><strong>By stability</strong>: Stable sorts preserve the relative order of equal elements, while unstable sorts may reorder equal elements</li>
        <li><strong>By adaptivity</strong>: Adaptive sorts perform better on partially sorted data</li>
        <li><strong>By method</strong>: Comparison-based sorts (like Quick Sort) vs. non-comparison sorts (like Radix Sort)</li>
        <li><strong>By memory usage</strong>: In-place sorts (minimal extra memory) vs. out-of-place sorts (require significant extra memory)</li>
      </ul>
      
      <p>The efficiency of sorting algorithms is typically measured by their time complexity (how fast they run) and space complexity (how much memory they use). The best theoretical time complexity for comparison-based sorting is O(n log n), though specialized algorithms can perform better in specific scenarios.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">Popular sorting algorithms include:</h3>
      <ul>
        <li><strong>Simple sorts</strong>: Bubble Sort, Insertion Sort, Selection Sort</li>
        <li><strong>Efficient comparison sorts</strong>: Merge Sort, Quick Sort, Heap Sort</li>
        <li><strong>Distribution sorts</strong>: Counting Sort, Bucket Sort, Radix Sort</li>
      </ul>
    `,
    examples: [
      "Bubble Sort: Repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order (O(n²) time complexity)",
      "Merge Sort: Divides the array into halves, recursively sorts them, then merges them back together (O(n log n) time complexity)",
      "Quick Sort: Selects a 'pivot' element and partitions the array around it, then recursively sorts the sub-arrays (average O(n log n) time complexity)",
      "Heap Sort: Builds a max heap from the array and repeatedly extracts the maximum element (O(n log n) time complexity)",
    ],
    relatedTerms: [
      "bubble-sort",
      "quick-sort",
      "merge-sort",
      "heap-sort",
      "algorithm",
      "time-complexity",
    ],
    keywords: [
      "ordering",
      "arranging",
      "comparison sort",
      "sorting techniques",
      "data organization",
    ],
  },
  {
    slug: "searching-algorithm",
    term: "Searching Algorithm",
    category: "algorithms",
    shortDefinition:
      "Algorithms designed to retrieve specific information from a data structure.",
    fullDefinition: `
      <p>Searching algorithms are methods designed to find an item or items with specified properties within a collection of data. These algorithms are fundamental in computer science and have numerous applications, from finding records in databases to locating specific elements in arrays.</p>
      
      <p>Search algorithms can be broadly classified into two categories:</p>
      
      <ul>
        <li><strong>Sequential Search</strong>: Examines each element in the data structure one after another until the target is found or all elements have been checked</li>
        <li><strong>Interval Search</strong>: Designed for sorted data structures and are more efficient than sequential search by repeatedly targeting the center of the search space and eliminating half of the elements at each step</li>
      </ul>
      
      <p>The efficiency of searching algorithms is typically measured by their time complexity, which indicates how the search time increases with the size of the data. Some searches can be optimized by using specialized data structures like hash tables, which provide constant-time access on average.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">Popular searching algorithms include:</h3>
      <ul>
        <li><strong>Linear Search</strong>: Checks each element sequentially until the target is found</li>
        <li><strong>Binary Search</strong>: Efficiently searches sorted arrays by repeatedly dividing the search space in half</li>
        <li><strong>Depth-First Search (DFS)</strong>: Traverses a graph by exploring as far as possible along each branch before backtracking</li>
        <li><strong>Breadth-First Search (BFS)</strong>: Traverses a graph by exploring all neighbor nodes at the present depth before moving to nodes at the next depth level</li>
      </ul>
    `,
    examples: [
      "Linear Search: Sequentially checks each element in a collection until the target is found (O(n) time complexity)",
      "Binary Search: For sorted arrays, compares the target value to the middle element and eliminates half of the remaining elements (O(log n) time complexity)",
      "Depth-First Search: Often used for traversing trees and graphs, explores as deeply as possible before backtracking",
      "Breadth-First Search: Used for finding the shortest path in unweighted graphs, explores all neighbors at current depth before moving deeper",
    ],
    relatedTerms: [
      "linear-search",
      "binary-search",
      "algorithm",
      "time-complexity",
      "data-structure",
    ],
    keywords: [
      "retrieval",
      "lookup",
      "find",
      "locate",
      "query",
      "search techniques",
    ],
  },
  {
    slug: "in-place-algorithm",
    term: "In-place Algorithm",
    category: "analysis",
    shortDefinition:
      "Algorithms that transform input using minimal additional memory space.",
    fullDefinition: `
      <p>An in-place algorithm is an algorithm that transforms the input data structure without using extra data structures for storage. It operates directly on the input, modifying it as necessary, while using only a constant amount of extra space for variables.</p>
      
      <p>The key characteristic of in-place algorithms is their space efficiency. They typically have a space complexity of O(1) or constant space, meaning the amount of additional memory they use doesn't grow with the size of the input.</p>
      
      <p>In-place algorithms are particularly valuable in environments with limited memory resources, when working with very large datasets, or when memory allocation and deallocation operations are expensive.</p>
      
      <p>Some algorithms can be implemented in either in-place or out-of-place variants, with different trade-offs in terms of simplicity, speed, and memory usage. In-place versions generally save space but might be more complex or slightly slower in some cases.</p>
      
      <h3 class="text-lg font-semibold mt-4 mb-2">Characteristics of in-place algorithms:</h3>
      <ul>
        <li>Use minimal extra memory beyond the input itself</li>
        <li>Typically modify the input structure directly</li>
        <li>Often use techniques like swapping elements or overwriting values</li>
        <li>May use a small constant amount of extra space for temporary variables</li>
      </ul>
    `,
    examples: [
      "Bubble Sort: Sorts an array by repeatedly swapping adjacent elements if they're in the wrong order",
      "Quick Sort: Can be implemented in-place by using the original array to store the partitions",
      "Selection Sort: Finds the minimum element and swaps it into position without using extra arrays",
      "Array reversal: Swapping pairs of elements from both ends moving toward the center",
    ],
    relatedTerms: ["space-complexity", "algorithm", "sorting-algorithm"],
    keywords: [
      "memory efficient",
      "constant space",
      "auxiliary space",
      "space optimization",
    ],
  },
  {
    slug: "divide-and-conquer",
    term: "Divide and Conquer",
    category: "techniques",
    shortDefinition:
      "An algorithmic paradigm that solves problems by breaking them into smaller subproblems, solving each independently, and combining the results.",
    fullDefinition: `
      <p>Divide and Conquer is a problem-solving paradigm that breaks a problem into smaller, similar subproblems, solves each subproblem independently, and then combines these solutions to create a solution to the original problem.</p>
      
      <p>This algorithmic approach follows three main steps:</p>
      
      <ol>
        <li><strong>Divide</strong>: Break the original problem into smaller, similar subproblems</li>
        <li><strong>Conquer</strong>: Solve the subproblems recursively (or directly if they're simple enough)</li>
        <li><strong>Combine</strong>: Merge the solutions of the subproblems to form the solution to the original problem</li>
      </ol>
      
      <p>Divide and conquer algorithms are often implemented using recursion, though iterative implementations are also possible. They are particularly useful for problems that can be broken down into independent, similar subproblems.</p>
      
      <p>This approach has several advantages:</p>
      <ul>
        <li>Can lead to efficient algorithms, particularly for large problems</li>
        <li>Often results in algorithms with good asymptotic time complexity (commonly O(n log n))</li>
        <li>Can be parallelized in many cases, as subproblems can be solved independently</li>
        <li>Provides a clear and elegant approach to solving complex problems</li>
      </ul>
    `,
    examples: [
      "Merge Sort: Divides the array in half, recursively sorts both halves, then merges them",
      "Quick Sort: Chooses a pivot, partitions the array around it, then recursively sorts the partitions",
      "Binary Search: Divides the search space in half at each step",
      "Strassen's Matrix Multiplication: Divides matrices into submatrices and combines results using fewer multiplications than the naive approach",
    ],
    relatedTerms: ["recursion", "merge-sort", "quick-sort", "binary-search"],
    keywords: [
      "recursive algorithms",
      "problem decomposition",
      "algorithmic paradigm",
      "subproblems",
    ],
  },
  {
    slug: "asymptotic-analysis",
    term: "Asymptotic Analysis",
    category: "analysis",
    shortDefinition:
      "The study of how algorithms perform as their input sizes approach infinity, ignoring constant factors and lower-order terms.",
    fullDefinition: `
      <p>Asymptotic analysis is a method for describing the efficiency of algorithms by analyzing their performance as the input size grows towards infinity. Rather than focusing on the exact number of operations, it characterizes algorithm performance in terms of how the resource usage (time or space) scales with input size.</p>
      
      <p>Key principles of asymptotic analysis include:</p>
      
      <ul>
        <li><strong>Focus on growth rate</strong>: Examine how an algorithm's efficiency changes as input size increases</li>
        <li><strong>Ignore constants</strong>: Constant factors don't affect the overall growth rate (e.g., 2n and 100n both grow linearly)</li>
        <li><strong>Ignore lower-order terms</strong>: As input size increases, higher-order terms dominate (e.g., n² + n becomes approximately n² for large n)</li>
      </ul>
      
      <p>Asymptotic analysis typically uses three main notations:</p>
      
      <ul>
        <li><strong>Big O (O)</strong>: Upper bound - the function grows no faster than</li>
        <li><strong>Big Omega (Ω)</strong>: Lower bound - the function grows at least as fast as</li>
        <li><strong>Big Theta (Θ)</strong>: Tight bound - the function grows at exactly the same rate as</li>
      </ul>
      
      <p>This approach allows us to compare algorithms independently of implementation details, hardware, or specific inputs, focusing instead on their fundamental efficiency characteristics.</p>
    `,
    examples: [
      "An algorithm that performs n² + 3n + 1 operations has an asymptotic complexity of O(n²)",
      "Binary search has a time complexity of O(log n) because the number of operations is proportional to the logarithm of the input size",
      "The asymptotic space complexity of merge sort is O(n) because it requires additional storage proportional to the input size",
    ],
    relatedTerms: [
      "big-o-notation",
      "time-complexity",
      "space-complexity",
      "algorithm-analysis",
    ],
    keywords: [
      "growth rate",
      "computational complexity",
      "algorithm analysis",
      "efficiency",
    ],
  },
  {
    slug: "recursion",
    term: "Recursion",
    category: "techniques",
    shortDefinition:
      "A programming technique where a function calls itself to solve smaller instances of the same problem.",
    fullDefinition: `
      <p>Recursion is a programming technique in which a function calls itself directly or indirectly to solve a problem. Each recursive call addresses a smaller instance of the same problem, moving toward a base case that can be solved without further recursion.</p>
      
      <p>A recursive algorithm typically consists of two essential parts:</p>
      
      <ul>
        <li><strong>Base case(s)</strong>: Simple instances of the problem that can be solved directly without further recursion</li>
        <li><strong>Recursive case(s)</strong>: More complex instances that are solved by breaking them down and involving recursive calls</li>
      </ul>
      
      <p>Recursion naturally maps to problems that can be broken down into smaller, similar subproblems, particularly those with a hierarchical or nested structure. It often leads to elegant and concise solutions to complex problems.</p>
      
      <p>While recursion can be powerful and intuitive, it has some limitations:</p>
      <ul>
        <li>Each recursive call consumes stack space, which can lead to stack overflow errors for deep recursion</li>
        <li>Recursive solutions may have more overhead than iterative alternatives due to function call machinery</li>
        <li>Simple recursive implementations of some algorithms can lead to redundant calculations</li>
      </ul>
      
      <p>Techniques like tail recursion, memoization, and dynamic programming can help address these limitations in many cases.</p>
    `,
    codeExample: `// Recursive factorial function
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }
  // Recursive case
  return n * factorial(n - 1);
}

// Recursive fibonacci function
function fibonacci(n) {
  // Base cases
  if (n <= 0) return 0;
  if (n === 1) return 1;
  
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    examples: [
      "Factorial calculation: factorial(n) = n * factorial(n-1), with factorial(0) = 1",
      "Fibonacci sequence: fibonacci(n) = fibonacci(n-1) + fibonacci(n-2), with fibonacci(0) = 0 and fibonacci(1) = 1",
      "Binary tree traversal: Process the current node, then recursively process left and right subtrees",
      "Merge sort: Recursively sort the two halves of an array, then merge them",
    ],
    relatedTerms: ["divide-and-conquer", "dynamic-programming", "algorithm"],
    keywords: [
      "self-reference",
      "recursive functions",
      "call stack",
      "base case",
    ],
  },
  {
    slug: "dynamic-programming",
    term: "Dynamic Programming",
    category: "techniques",
    shortDefinition:
      "A method for solving complex problems by breaking them down into simpler subproblems and storing their solutions to avoid redundant computations.",
    fullDefinition: `
      <p>Dynamic Programming (DP) is a technique for solving complex problems by breaking them down into simpler overlapping subproblems and storing the solutions to these subproblems to avoid redundant calculation. It's particularly useful for optimization problems where the goal is to find the best solution among many possible options.</p>
      
      <p>Two key properties typically characterize problems suited for dynamic programming:</p>
      
      <ul>
        <li><strong>Optimal substructure</strong>: An optimal solution to the problem contains optimal solutions to its subproblems</li>
        <li><strong>Overlapping subproblems</strong>: The same subproblems are encountered multiple times when solving the problem</li>
      </ul>
      
      <p>Dynamic programming can be implemented using two main approaches:</p>
      
      <ul>
        <li><strong>Top-down (memoization)</strong>: Start with the original problem, break it into subproblems, and store their solutions as they're computed</li>
        <li><strong>Bottom-up (tabulation)</strong>: Start by solving the smallest subproblems first, then use their solutions to build up to larger problems</li>
      </ul>
      
      <p>The primary advantage of dynamic programming is that it can dramatically improve the efficiency of algorithms for problems with overlapping subproblems, often reducing exponential time complexity to polynomial time.</p>
    `,
    codeExample: `// Fibonacci using dynamic programming (memoization)
function fibonacciDP(n, memo = {}) {
  // Check if we've already computed this value
  if (n in memo) return memo[n];
  
  // Base cases
  if (n <= 0) return 0;
  if (n === 1) return 1;
  
  // Store and return the result
  memo[n] = fibonacciDP(n - 1, memo) + fibonacciDP(n - 2, memo);
  return memo[n];
}

// Fibonacci using dynamic programming (tabulation)
function fibonacciTabulation(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  
  // Create an array to store values
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  // Fill the array
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`,
    examples: [
      "Fibonacci sequence calculation with memoization",
      "Knapsack problem: Finding the most valuable combination of items that fit within a weight constraint",
      "Longest Common Subsequence: Finding the longest sequence common to two sequences",
      "Shortest path algorithms like Floyd-Warshall",
    ],
    relatedTerms: ["recursion", "memoization", "algorithm", "optimization"],
    keywords: [
      "subproblems",
      "optimization",
      "memoization",
      "tabulation",
      "optimal substructure",
    ],
  },
];

// Function to get a glossary term by its slug
export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((term) => term.slug === slug);
}

// Function to get related terms for a specific term
export function getRelatedTerms(slug: string): GlossaryTerm[] {
  const term = getGlossaryTermBySlug(slug);
  if (!term || !term.relatedTerms || term.relatedTerms.length === 0) {
    return [];
  }

  return term.relatedTerms
    .map((relatedSlug) => getGlossaryTermBySlug(relatedSlug))
    .filter((term): term is GlossaryTerm => term !== undefined);
}

// Function to search for glossary terms
export function searchGlossaryTerms(query: string): GlossaryTerm[] {
  const lowercaseQuery = query.toLowerCase();
  return glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowercaseQuery) ||
      term.shortDefinition.toLowerCase().includes(lowercaseQuery) ||
      term.category.toLowerCase().includes(lowercaseQuery) ||
      term.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(lowercaseQuery)
      )
  );
}
