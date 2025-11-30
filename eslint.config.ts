import eslint from "@eslint/js";
import command from "eslint-plugin-command/config";
import importPlugin from "eslint-plugin-import";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/*.config.{js,cjs,mjs}", ".next", ".vercel"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
        },
      ],
      eqeqeq: ["error", "smart"],
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
        },
      ],
      "no-console": ["error"],
      "no-restricted-imports": [
        "error",
        {
          name: "test",
          message: "Please use `vitest` instead.",
        },
        {
          name: "node:test",
          message: "Please use `vitest` instead.",
        },
      ],
      "unused-imports/no-unused-imports": "error",
    },
  },
  command(),
];
