import type { AlgorithmInfo } from "../types";

export const availableAlgorithms: Record<string, AlgorithmInfo> = {
  bubbleSort: {
    name: "Bubble Sort",
    key: "bubbleSort",
    category: "sorting",
    subtitle: "Simple but inefficient comparison sort",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. With a time complexity of O(n²), it's inefficient for large datasets but is easy to implement and understand. The algorithm gets its name because smaller elements 'bubble' to the top of the list with each iteration.",
    difficulty: "easy",
  },
  selectionSort: {
    name: "Selection Sort",
    key: "selectionSort",
    category: "sorting",
    subtitle: "In-place comparison sort with O(n²) complexity",
    description:
      "The selection sort algorithm sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning. Unlike bubble sort, it makes only O(n) swaps, making it useful when write/swap operations are expensive. However, its O(n²) time complexity makes it inefficient for large datasets. Selection sort is not stable, meaning equal elements might not maintain their relative positions.",
    difficulty: "easy",
  },
  insertionSort: {
    name: "Insertion Sort",
    key: "insertionSort",
    category: "sorting",
    subtitle: "Efficient for small data sets and nearly sorted arrays",
    description:
      "Insertion sort iterates through an array and at each iteration it removes one element, finds the location where it belongs and inserts it there. While it has an average time complexity of O(n²), it performs exceptionally well on small or nearly-sorted arrays with best-case O(n) performance. Insertion sort is an adaptive, stable, in-place algorithm that works similarly to how people sort playing cards in their hands.",
    difficulty: "easy",
  },
  mergeSort: {
    name: "Merge Sort",
    key: "mergeSort",
    category: "sorting",
    subtitle: "Stable, divide-and-conquer algorithm with O(n log n) complexity",
    description:
      "Merge sort is a divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves. With a consistent O(n log n) time complexity regardless of input data, it outperforms simpler algorithms on large datasets. While requiring O(n) auxiliary space for the merging process, it guarantees stability and is particularly efficient for linked lists. Merge sort is often used in external sorting when data doesn't fit in memory.",
    difficulty: "medium",
  },
  quickSort: {
    name: "Quick Sort",
    key: "quickSort",
    category: "sorting",
    subtitle: "Fast, in-place sorting with average O(n log n) performance",
    description:
      "Quick sort is a divide and conquer algorithm that picks an element as a pivot and partitions the array around the pivot. With an average time complexity of O(n log n) and minimal space requirements, it's typically faster in practice than other O(n log n) algorithms like merge sort. However, it has a worst-case time complexity of O(n²) with poor pivot selection and is not stable. Quick sort is widely used and serves as the foundation for many programming language sorting implementations.",
    difficulty: "medium",
  },
  heapSort: {
    name: "Heap Sort",
    key: "heapSort",
    category: "sorting",
    subtitle: "Comparison-based sort using binary heap structure",
    description:
      "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and then repeatedly extracts the maximum element. With a guaranteed O(n log n) time complexity regardless of input data and O(1) auxiliary space, it combines many advantages of insertion sort and merge sort. While not stable and slightly slower than quick sort in practice, heap sort provides reliable performance without the risk of worst-case scenarios, making it valuable for systems requiring consistent performance.",
    difficulty: "hard",
  },
  linearSearch: {
    name: "Linear Search",
    key: "linearSearch",
    category: "searching",
    subtitle: "Simple O(n) search through unsorted collections",
    description:
      "Linear search sequentially checks each element of the list until it finds an element that matches the target value. With a time complexity of O(n), it's the simplest searching algorithm but becomes inefficient for large datasets. One advantage is that it works on unsorted arrays and doesn't require any preprocessing. Linear search is practical for small arrays or when the target is likely to be found early in the sequence. It's also useful when searching rarely happens or when elements are frequently added and removed.",
    difficulty: "easy",
  },
  binarySearch: {
    name: "Binary Search",
    key: "binarySearch",
    category: "searching",
    subtitle: "Efficient O(log n) search for sorted collections",
    description:
      "Binary search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half. With a logarithmic time complexity of O(log n), it's dramatically more efficient than linear search for large datasets. Binary search requires the array to be sorted beforehand, making it ideal for situations where searching occurs frequently on relatively static data. This algorithm is the foundation for many efficient data structures like binary search trees and is widely used in database systems, dictionaries, and numerous programming applications.",
    difficulty: "medium",
  },
  dfs: {
    name: "Depth-First Search",
    key: "dfs",
    category: "graph",
    subtitle:
      "Graph traversal algorithm that explores as far as possible along each branch before backtracking",
    description:
      "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack data structure (often implemented using recursion) to keep track of vertices to visit next. DFS has applications in topological sorting, finding connected components, solving mazes, and detecting cycles in graphs.",
    difficulty: "medium",
  },
  bfs: {
    name: "Breadth-First Search",
    key: "bfs",
    category: "graph",
    subtitle:
      "Graph traversal algorithm that explores all neighbors at the current depth before moving deeper",
    description:
      "Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the present depth level before moving on to vertices at the next depth level. It uses a queue to keep track of the next vertices to visit, ensuring that vertices are visited in order of their distance from the source vertex. BFS is commonly used for finding the shortest path in unweighted graphs, connected components, and solving puzzles with the fewest possible moves.",
    difficulty: "medium",
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    key: "dijkstra",
    category: "graph",
    subtitle:
      "Shortest path algorithm for weighted graphs with non-negative edge weights",
    description:
      "Dijkstra's Algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights. It works by maintaining a set of vertices whose shortest distance from the source is already known and repeatedly selecting the vertex with the minimum distance value, updating the distance values of its adjacent vertices. Dijkstra's algorithm is widely used in network routing protocols and as a subroutine in other graph algorithms.",
    difficulty: "hard",
  },
  topologicalSort: {
    name: "Topological Sort",
    key: "topologicalSort",
    category: "graph",
    subtitle:
      "Linear ordering of vertices in a directed acyclic graph where directed edges are respected",
    description:
      "Topological Sort is an algorithm for ordering the vertices of a directed acyclic graph (DAG) such that for every directed edge (u,v), vertex u comes before vertex v in the ordering. This algorithm is essential for scheduling tasks with dependencies, course prerequisites planning, and compilation sequence determination. A graph must have no directed cycles to have a valid topological ordering, making this algorithm a useful tool for cycle detection as well.",
    difficulty: "medium",
  },
  bellmanFord: {
    name: "Bellman-Ford",
    key: "bellmanFord",
    category: "graph",
    subtitle:
      "Single-source shortest paths that tolerates negative edge weights",
    description:
      "Bellman-Ford computes shortest paths from a single source to every other vertex in a weighted graph, even when some edge weights are negative. It works by relaxing all edges repeatedly: after V-1 passes the distances are guaranteed correct if no negative cycle is reachable from the source. Slower than Dijkstra at O(V·E) but more general — and a single extra pass detects negative cycles. Used in distance-vector routing protocols and as the inner loop of Johnson's algorithm.",
    difficulty: "hard",
  },
  prim: {
    name: "Prim's Algorithm",
    key: "prim",
    category: "graph",
    subtitle: "Minimum spanning tree by greedy vertex growth",
    description:
      "Prim's algorithm builds a minimum spanning tree (MST) by starting at an arbitrary vertex and repeatedly adding the cheapest edge that connects the existing tree to a vertex outside it. Each step strictly grows the tree by one vertex until every vertex is included. The greedy choice is provably optimal because of the cut property of MSTs. Common applications include network design, clustering, and approximation algorithms for the traveling salesman problem.",
    difficulty: "medium",
  },
  kruskal: {
    name: "Kruskal's Algorithm",
    key: "kruskal",
    category: "graph",
    subtitle: "Minimum spanning tree by sorting edges and union-find",
    description:
      "Kruskal's algorithm builds a minimum spanning tree (MST) by sorting all edges by weight and adding them one at a time, skipping any edge that would form a cycle. A disjoint-set (union-find) data structure makes the cycle check efficient. Unlike Prim's, Kruskal's grows the tree as a forest of components that gradually merge, making it well-suited to sparse graphs. It's used in network design, image segmentation, and as a building block for clustering algorithms.",
    difficulty: "medium",
  },
  bstInsert: {
    name: "Binary Search Tree (Insert)",
    key: "bstInsert",
    category: "datastructure",
    subtitle: "Build a BST by inserting values one at a time",
    description:
      "A binary search tree (BST) maintains the invariant that every node's left subtree contains only smaller values and its right subtree only larger values. Inserting a value walks the tree from the root, branching left or right at each node by comparison, until it reaches a missing child where the new node is attached. Average insertion is O(log n) when the tree is balanced; the worst case degrades to O(n) when input order produces a skewed tree, motivating self-balancing variants like AVL and red-black trees.",
    difficulty: "medium",
  },
  minHeapInsert: {
    name: "Min-Heap (Insert)",
    key: "minHeapInsert",
    category: "datastructure",
    subtitle: "Build a min-heap by inserting and sifting up",
    description:
      "A binary min-heap is a complete binary tree where every parent is less than or equal to its children. Stored as an array, the children of index i live at 2i+1 and 2i+2, so the structure stays compact without explicit pointers. Each insertion appends the new value at the end and 'sifts up' — repeatedly swapping it with its parent while the parent is larger — restoring the heap property in O(log n). Heaps are the backbone of priority queues, heap sort, and shortest-path algorithms like Dijkstra's.",
    difficulty: "medium",
  },
};
