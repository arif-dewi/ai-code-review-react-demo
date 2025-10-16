/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: false,
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: [
    '@typescript-eslint',
    'vitest',
    'testing-library',
    'sonarjs',
    'unicorn',
    'i18next',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vitest/recommended',
    'plugin:testing-library/react',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  rules: {
    /* --- Semicolons & formatting --- */
    'semi': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'prettier/prettier': ['error', { semi: true }],

    /* --- Testing discipline --- */
    'vitest/no-focused-tests': 'error',  // .only
    'vitest/no-disabled-tests': 'error', // .skip

    /* --- Magic numbers --- */
    'no-magic-numbers': ['error', {
      ignore: [0, 1, -1], // adjust as needed
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: true,
    }],

    /* --- Hard-coded strings --- */
    // 1) Repeated string literals (nudge to extract constant)
    'sonarjs/no-duplicate-string': ['warn', { threshold: 3 }], // threshold of duplicates

    // 2) UI literals detection (encourage i18n). Only in JSX by default:
    'i18next/no-literal-string': 'off', // Disabled for demo purposes

    /* --- General quality --- */
    'eqeqeq': ['error', 'always'],
    'unicorn/no-null': 'off', // allow `null` in React
    'unicorn/prevent-abbreviations': 'off', // too noisy for FE
    'unicorn/filename-case': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.*', '**/*.spec.*'],
      rules: {
        // allow test literals / magic numbers only if needed:
        'no-magic-numbers': 'off',
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
