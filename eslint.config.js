import storybook from 'eslint-plugin-storybook';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    // 전역 규칙
    ignores: ['node_modules', 'dist', 'package-lock.json', 'pnpm-lock.yaml', 'package.json'],
  },
  {
    // entry(파일 집합) 별 규칙
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': hooks,
      a11y,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: 'function', next: 'function' },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: ['if', 'for', 'function', 'switch', 'try', 'return', 'block-like'],
        },
        {
          blankLine: 'always',
          prev: ['if', 'for', 'while', 'switch', 'try'],
          next: ['if', 'for', 'while', 'switch', 'try', 'function', 'block-like'],
        },
        { blankLine: 'always', prev: 'block-like', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var', 'function'], next: 'return' },
        { blankLine: 'always', prev: 'return', next: 'return' },
      ],

      // 일반 JS 규칙
      'no-console': 'warn',
      eqeqeq: 'error',
      curly: 'error',
      'no-shadow': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'prefer-destructuring': ['warn', { object: true, array: false }],
      'no-var': 'error',

      // import plugin
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'warn',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-curly-brace-presence': ['warn', 'never'],
      'react/jsx-key': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-pascal-case': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript 전용
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    files: ['tools/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: { 'no-console': 'off' },
  },
  ...storybook.configs['flat/recommended'],
];
