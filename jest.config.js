module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    coverageDirectory: "./coverage",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts"],
    coverageThreshold: {
      global: {
        branches: 85,
        functions: 85,
        lines: 85,
        statements: 85,
      },
    },
  };
  