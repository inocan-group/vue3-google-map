module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "vue", "json"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
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
  coverageThreshold: {
    global: {
      branches: 72,
      functions: 88,
      lines: 88,
      statements: 85,
    },
  },
  coverageReporters: ["text", "json", "html", "lcov"],
  // Handle CSS imports and path aliases
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/tests/mocks/styleMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Ignore certain files
  transformIgnorePatterns: ["node_modules/(?!@googlemaps/)"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
