import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Reset handlers for test isolation, and runs a clean after each test case
// (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// Tackle antd type issues
if (typeof window !== 'undefined') {
  window.matchMedia =
    window.matchMedia ||
    ((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // Deprecated
      removeListener: () => {}, // Deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }));
}
