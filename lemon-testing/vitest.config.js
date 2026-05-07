
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/experimental/**'],
    testTimeout: 10000, // Sets global timeout to 10 seconds
    environment: 'jsdom', // Simulates browser DOM
    globals: true,        // Allows using 'describe', 'it', 'expect' without imports
    setupFiles: path.resolve(__dirname, 'src/test/setup.js'), // Global setup for matchers
  },
});

