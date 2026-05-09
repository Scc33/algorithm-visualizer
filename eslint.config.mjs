import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  { ignores: ["coverage/**", ".next/**", "node_modules/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  sonarjs.configs.recommended,
  {
    rules: {
      // Complexity caps
      complexity: ["error", 10],
      "max-lines": [
        "error",
        { max: 250, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "error",
        { max: 80, skipBlankLines: true, skipComments: true },
      ],
      "max-params": ["error", 5],

      // TypeScript strict additions on top of next/typescript
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],

      // Math.random() is intentional in this visualization app
      "sonarjs/pseudo-random": "off",
    },
  },
  // JSX components have higher line counts due to template markup
  {
    files: ["**/*.tsx"],
    rules: {
      "max-lines-per-function": [
        "error",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
    },
  }
);
