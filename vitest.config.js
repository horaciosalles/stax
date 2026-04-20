import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['js/engine/**/*.js'],
      reporter: ['text'],
      thresholds: {
        lines: 90,
      },
    },
  },
});
