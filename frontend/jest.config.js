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
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
