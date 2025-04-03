import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import eslintTs from "typescript-eslint";
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';


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
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    extends: [
      eslint.configs.recommended,
      ...eslintTs.configs.recommendedTypeChecked,
      ...eslintTs.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
    ],
    plugins: { prettier, importPlugin },
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
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "accessibility": "explicit",
          "overrides": {
            "constructors": "no-public"
          }
        }
      ],
      "linebreak-style": ["warn", "unix"],
      "require-jsdoc": 0,
      "valid-jsdoc": ["off"],
      "prefer-template": "error",
      "curly": ["error", "all"],
      "arrow-body-style": ["error", "as-needed"],
      "eqeqeq": ["error", "always", { "null": "ignore" }],
      "sort-imports": [
        "warn",
        {
          "ignoreCase": true,
          "ignoreDeclarationSort": true
        }
      ],
      "importPlugin/order": [
        "error",
        {
          "groups": ["external", "builtin", "internal", "sibling", "index", "parent", "object", "type"]
        }
      ],
      "importPlugin/named": "off",
      "prettier/prettier": "error"
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
