import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import * as espree from "espree";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    ignores: ["build/", "node_modules/", "storybook-static/"],
  },
  {
    plugins: { svelte, "@typescript-eslint": ts },
  },
  {
    files: ["**/*.ts", "**/*.svelte"],
    rules: {
      ...ts.configs["eslint-recommended"].overrides[0].rules,
      ...ts.configs.recommended.rules,
      ...ts.configs.stylistic.rules,
    },
  },
  prettierConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: {
          js: espree,
          ts: tsParser,
        },
      },
    },
    rules: {
      ...svelte.configs.base.overrides[0].rules,
      ...svelte.configs.recommended.rules,
      ...svelte.configs.prettier.rules,
    },
  },
];
