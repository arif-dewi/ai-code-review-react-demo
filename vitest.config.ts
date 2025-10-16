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
      all: true,
      exclude: [
        '**/*.d.ts',
        '**/node_modules/**',
        '**/vite.config.*',
        '**/vitest.config.*',
        '**/.history/**',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
        '**/.eslintrc.*',
        '**/tsconfig.*',
        '**/package*.json',
        '**/README.md',
        '**/index.html',
      ],
    },
  },
});
