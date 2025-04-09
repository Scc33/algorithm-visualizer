import React from "react";

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string | React.ReactNode;
  examples?: string[] | React.ReactNode;
  relatedTerms?: Array<{
    term: string;
    link?: string;
  }>;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "algorithm",
    term: "Algorithm",
    definition:
      "A step-by-step procedure or set of rules designed to solve a specific problem or perform a particular task. Algorithms are fundamental to computing and mathematics, providing clear instructions for processing inputs into desired outputs.",
    examples: [
      "Sorting algorithms (like Bubble Sort or Quick Sort) arrange items in a specific order",
      "Search algorithms (like Binary Search) locate items within a data structure",
      "Path-finding algorithms (like Dijkstra's) find optimal routes between points",
    ],
    relatedTerms: [
      { term: "Time Complexity" },
      { term: "Space Complexity" },
      { term: "Big O Notation" },
    ],
  },
  {
    id: "big-o-notation",
    term: "Big O Notation",
    definition:
      "A mathematical notation used to describe the limiting behavior of a function when the argument approaches infinity. In computer science, Big O notation is used to classify algorithms according to how their running time or space requirements grow as the input size grows.",
    examples: [
      "O(1) - Constant time: The operation takes the same amount of time regardless of input size",
      "O(log n) - Logarithmic time: Time grows logarithmically with input size (e.g., Binary Search)",
      "O(n) - Linear time: Time grows linearly with input size (e.g., Linear Search)",
      "O(n log n) - Linearithmic time: Common in efficient sorting algorithms (e.g., Merge Sort)",
      "O(n²) - Quadratic time: Often seen in nested loops (e.g., Bubble Sort)",
      "O(2^n) - Exponential time: Time doubles with each addition to the input (e.g., recursive Fibonacci)",
    ],
    relatedTerms: [
      { term: "Time Complexity" },
      { term: "Space Complexity" },
      { term: "Asymptotic Analysis" },
    ],
  },
  {
    id: "time-complexity",
    term: "Time Complexity",
    definition:
      "A measure of the amount of time an algorithm takes to complete as a function of the length of the input. It describes how the runtime of an algorithm increases as the size of the input increases.",
    examples: [
      "Constant time O(1): Array access, Stack push/pop",
      "Logarithmic time O(log n): Binary search",
      "Linear time O(n): Traversing an array",
      "Quadratic time O(n²): Simple sorting algorithms like Bubble Sort",
      "Exponential time O(2^n): Solving the traveling salesman problem using dynamic programming",
    ],
    relatedTerms: [
      { term: "Big O Notation" },
      { term: "Space Complexity" },
      { term: "Computational Efficiency" },
    ],
  },
  {
    id: "space-complexity",
    term: "Space Complexity",
    definition:
      "A measure of the amount of memory an algorithm uses as a function of the length of the input. It quantifies the total amount of memory space required by an algorithm to solve a computational problem.",
    examples: [
      "Constant space O(1): Algorithms that use fixed amount of memory regardless of input size (e.g., finding the maximum in an array)",
      "Linear space O(n): Algorithms that use memory proportional to input size (e.g., creating a copy of an array)",
      "Quadratic space O(n²): Creating a 2D array where each dimension is proportional to the input size",
    ],
    relatedTerms: [
      { term: "Big O Notation" },
      { term: "Time Complexity" },
      { term: "In-place Algorithm" },
    ],
  },
  {
    id: "asymptotic-analysis",
    term: "Asymptotic Analysis",
    definition:
      "The study of how algorithms perform as their input sizes approach infinity. Asymptotic analysis focuses on the behavior of algorithms for large inputs, ignoring constant factors and lower-order terms.",
    examples: [
      "When analyzing the performance of Merge Sort (O(n log n)), we don't focus on small input sizes but rather how it scales with large datasets",
      "An algorithm with complexity O(2n) is asymptotically equivalent to O(n) as the constant factor becomes irrelevant for large inputs",
    ],
    relatedTerms: [
      { term: "Big O Notation" },
      { term: "Big Omega Notation" },
      { term: "Big Theta Notation" },
    ],
  },
  {
    id: "sorting-algorithm",
    term: "Sorting Algorithm",
    definition:
      "An algorithm that arranges elements of a list in a specific order (usually ascending or descending). Sorting is a fundamental operation in computer science with many different approaches, each with different time and space complexity characteristics.",
    examples: [
      "Simple sorts: Bubble Sort, Insertion Sort, Selection Sort",
      "Efficient sorts: Merge Sort, Quick Sort, Heap Sort",
      "Specialized sorts: Radix Sort, Bucket Sort, Counting Sort",
    ],
    relatedTerms: [
      { term: "Bubble Sort", link: "/sorting/bubbleSort" },
      { term: "Quick Sort", link: "/sorting/quickSort" },
      { term: "Merge Sort", link: "/sorting/mergeSort" },
      { term: "Comparative Sorting" },
    ],
  },
  {
    id: "searching-algorithm",
    term: "Searching Algorithm",
    definition:
      "An algorithm designed to find an item with specified properties within a collection of items. Searching is a fundamental operation in computer science and has many applications, from finding records in databases to locating elements in arrays.",
    examples: [
      "Linear Search: Sequentially checks each element (O(n))",
      "Binary Search: Efficiently searches sorted arrays by repeatedly dividing the search space in half (O(log n))",
      "Hash-based Search: Uses hash functions to provide O(1) average-case lookup time",
    ],
    relatedTerms: [
      { term: "Linear Search", link: "/searching/linearSearch" },
      { term: "Binary Search", link: "/searching/binarySearch" },
      { term: "Hash Table" },
    ],
  },
  {
    id: "in-place-algorithm",
    term: "In-place Algorithm",
    definition:
      "An algorithm that transforms input using no auxiliary data structure or using a small, constant extra space. In-place algorithms modify the input directly, without requiring significant additional memory proportional to the input size.",
    examples: [
      "Bubble Sort is an in-place sorting algorithm requiring only O(1) extra space",
      "Quick Sort can be implemented as an in-place algorithm",
      "Many array reversal and rotation operations can be done in-place",
    ],
    relatedTerms: [{ term: "Space Complexity" }, { term: "Auxiliary Space" }],
  },
  {
    id: "divide-and-conquer",
    term: "Divide and Conquer",
    definition:
      "A algorithmic paradigm where a problem is broken down into smaller, similar subproblems which are solved independently. The solutions to these subproblems are then combined to solve the original problem.",
    examples: [
      "Merge Sort divides the array into halves, sorts each half, then merges them",
      "Quick Sort partitions the array around a pivot, then recursively sorts each partition",
      "Binary Search divides the search space in half with each comparison",
    ],
    relatedTerms: [
      { term: "Recursion" },
      { term: "Merge Sort", link: "/sorting/mergeSort" },
      { term: "Quick Sort", link: "/sorting/quickSort" },
    ],
  },
  {
    id: "greedy-algorithm",
    term: "Greedy Algorithm",
    definition:
      "An algorithmic approach that makes the locally optimal choice at each step with the hope of finding a global optimum. Greedy algorithms make decisions based on the information available at the current moment without worrying about future consequences.",
    examples: [
      "Dijkstra's algorithm for finding the shortest path in a graph",
      "Huffman coding for data compression",
      "Kruskal's algorithm for finding a minimum spanning tree",
    ],
    relatedTerms: [
      { term: "Dynamic Programming" },
      { term: "Optimal Substructure" },
    ],
  },
];
