# Algorithm Visualizer Tests

This directory contains tests for the Algorithm Visualizer application. The tests are organized to mirror the structure of the source code, making it easy to locate tests for specific components or functionality.

## Directory Structure

```
__tests__/
├── app/                       # Tests for page components
│   └── sorting/
│       └── [algorithm]/
│           └── page.test.tsx  # Tests for algorithm page
├── components/                # Tests for React components
│   ├── AlgorithmCard.test.tsx
│   └── visualizer/
│       ├── SortingVisualization.test.tsx
│       └── VisualizerControls.test.tsx
├── context/                   # Tests for React context
│   └── AlgorithmContext.test.tsx
├── lib/                       # Tests for utility functions and algorithms
│   ├── algorithms/
│   │   └── bubbleSort.test.ts
│   └── utils.test.ts
└── utils/                     # Test utilities
    └── test-utils.tsx         # Common test utilities and helpers
```

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Testing Approach

1. **Unit Tests**: Test individual functions and components in isolation.
2. **Integration Tests**: Test interactions between multiple components.
3. **Mock Dependencies**: External dependencies are mocked to ensure tests are reliable and fast.

## Test Utilities

The `test-utils.tsx` file provides:

- A custom render function that includes the AlgorithmProvider
- Mock implementations for key dependencies
- Helper functions for test setup

## Coverage Reports

After running `npm run test:coverage`, a coverage report will be generated in the `coverage/` directory. This report shows how much of the code is covered by tests and helps identify areas that need more testing.

## Writing New Tests

When adding new features or components, please follow these guidelines for writing tests:

1. Create test files that mirror the structure of the source code.
2. Test both happy paths and edge cases.
3. Mock external dependencies.
4. Keep tests focused on specific behavior.
5. Use descriptive test names that explain what is being tested.

Example:

```typescript
describe('ComponentName', () => {
  it('should render correctly with default props', () => {
    // Test code here
  });

  it('should handle edge case X properly', () => {
    // Test code here
  });
});
```