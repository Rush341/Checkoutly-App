import globals from "globals";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactNativePlugin from "eslint-plugin-react-native";
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      react: reactPlugin,
      "react-native": reactNativePlugin,
      "unused-imports": unusedImports
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "error",
      "react-native/no-inline-styles": "error",
      "react-native/no-unused-styles": "error",
      "unused-imports/no-unused-imports": "error",
      "react/no-unescaped-entities": "off",
      "unused-imports/no-unused-vars": [
        "error",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_"
        }
      ],
      // Alphabetical ordering for styles in StyleSheet.create()
      "react-native/sort-styles": [
        "error",
        "asc", // "asc" for ascending alphabetical order
        {
          ignoreClassNames: false,
          ignoreStyleProperties: false
        }
      ]
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script"
    }
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  ...tsEslint.configs.recommended.rules ? [{ rules: tsEslint.configs.recommended.rules }] : [],
  ...reactPlugin.configs.recommended.rules ? [{ rules: reactPlugin.configs.recommended.rules }] : [],

  {
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    }
  }
];
