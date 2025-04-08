# Algorithm Visualizer

An interactive web application for learning algorithms through step-by-step visual explanations. This project helps make abstract computer science concepts concrete and intuitive.

## 🔍 Overview

Algorithm Visualizer is designed to help users understand how various algorithms work through interactive visualizations. The platform covers:

- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort
- **Searching Algorithms**: Linear Search, Binary Search
- **Future Expansion**: Graph algorithms and data structure operations

Each algorithm includes:
- Step-by-step visualization
- Color-coded states to show comparisons, swaps, and progress
- Detailed pseudocode explanation
- Time and space complexity information
- Interactive controls for playback

## ✨ Features

- **Interactive Controls**: Play, pause, step forward/back, and adjust animation speed
- **Color-coded Visualization**: See elements change as they're compared, swapped, and sorted
- **Algorithm Information**: Detailed explanations of how each algorithm works
- **Customizable Input**: Generate new arrays to see how algorithms handle different data
- **Responsive Design**: Works on desktop and mobile devices
- **Client-side Only**: Runs entirely in the browser with no server requirements

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Scc33/algorithm-visualizer.git
cd algorithm-visualizer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🧩 How It Works

The application is built using:

- **Next.js**: For the application framework and routing
- **React**: For building the user interface components
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling
- **React Context**: For state management

The visualization process works by:
1. Generating step-by-step snapshots of algorithm execution
2. Rendering the current state of the algorithm
3. Allowing users to navigate through these steps at their own pace

## 📖 Learning Path

The platform organizes algorithms by:

1. **Categories**: Sorting, Searching, Graph Algorithms
2. **Difficulty Levels**: Easy, Medium, Hard
3. **Complexity**: Algorithms are labeled with their time and space complexity

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
npm run test:watch
# or
npm run test:coverage
```

## 🚢 Deployment

This application is set up for easy deployment to Vercel or any other Next.js-compatible hosting service.

```bash
npm run build
npm run start
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built and maintained by [Sean Coughlin](https://seancoughlin.me)
- Inspired by the need for better visual learning tools for computer science education