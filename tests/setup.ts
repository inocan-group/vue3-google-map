import { initialize, mockInstances } from "@googlemaps/jest-mocks";

// Initialize Google Maps mocks before each test
beforeEach(() => {
  initialize();
});

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
  mockInstances.clearAll();
});

// Suppress only specific test-environment-related console output
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    const message = args[0]?.toString?.() || "";

    // Only suppress specific Vue test-environment warnings that are expected and harmless
    if (message.includes("Invalid watch source")) return;
    if (message.includes("Slot") && message.includes("invoked outside of the render function")) return;

    // Log all other errors normally
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    const message = args[0]?.toString?.() || "";

    // Only suppress the specific Vue slot warning that's expected in test environment
    if (message.includes("[Vue warn]: Slot") && message.includes("invoked outside of the render function")) return;

    // Log all other warnings normally - this preserves legitimate Vue warnings
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
