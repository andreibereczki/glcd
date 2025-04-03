import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import eslintTs from "typescript-eslint";
import eslint from '@eslint/js';
import angular from 'angular-eslint';


export default defineConfig([
  {
    ignores: ["**/dist/", "**/coverage/", "**/.angular/"]
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    extends: ["js/recommended"]
  },
  {
    files: ["**/*.ts"],
    languageOptions: { globals: globals.browser },
    extends: [
      eslint.configs.recommended,
      ...eslintTs.configs.recommended,
      ...eslintTs.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
]);
