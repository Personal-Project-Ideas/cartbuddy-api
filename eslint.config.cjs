const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const baseConfig = require('eslint/conf/eslint-recommended');

module.exports = [
  baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'no-eval': 'error',
      'no-await-in-loop': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/no-extraneous-class': 'warn',
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'max-nested-callbacks': ['warn', 3],
      'sort-imports': ['warn', { ignoreDeclarationSort: true }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variableLike',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
    },
    ignorePatterns: ['dist/', 'node_modules/', '*.config.js', '*.config.cjs', '*.config.mjs'],
  },
];
