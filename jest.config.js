module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "vue", "json"],
  transform: {
    "^.+\\.vue$": "<rootDir>/tests/vue-jest-transformer.js",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "preserve",
          esModuleInterop: true,
          allowJs: true,
          lib: ["es2020", "dom"],
        },
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,ts}", "<rootDir>/src/**/*.{spec,test}.{js,ts}"],
  collectCoverageFrom: [
    "src/**/*.{ts,vue}",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/*/index.ts",
    "!src/**/__tests__/**",
    "!src/shims-*.ts",
    "!src/themes/**",
  ],
  // Floors sit ~3-4 pts below actuals (branches 86.4 / functions 95.4 / lines 98.3 /
  // statements 97.9). Raised after the source-map fix made coverage accurate; the old
  // floors (72/88/88/85) compensated for under-reported coverage from broken .vue maps.
  coverageThreshold: {
    global: {
      branches: 82,
      functions: 92,
      lines: 95,
      statements: 94,
    },
  },
  coverageReporters: ["text", "json", "html", "lcov"],
  // Handle CSS imports and path aliases
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/tests/mocks/styleMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Ignore certain files
  transformIgnorePatterns: ["node_modules/(?!(@googlemaps|lodash-es)/)"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
