/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  collectCoverage: true,
  coverageReporters: ['text'],
  silent: true,
  verbose: true,
  bail: true,
  cache: false,
  maxConcurrency: 1,
  detectLeaks: true,
  detectOpenHandles: true,
};
