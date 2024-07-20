/** @type {import('jest').Config} */
const config = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.tsx", // Exclude entry point if not needed
    "!src/**/*.d.ts", // Exclude type declaration files
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
