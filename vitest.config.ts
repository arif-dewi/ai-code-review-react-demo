import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 80, // eslint-disable-line no-magic-numbers
        functions: 80, // eslint-disable-line no-magic-numbers
        branches: 75, // eslint-disable-line no-magic-numbers
        statements: 80, // eslint-disable-line no-magic-numbers
      },
      all: true,
      exclude: ['**/*.d.ts', '**/node_modules/**', '**/vite.config.*', '**/vitest.config.*'],
    },
  },
});
