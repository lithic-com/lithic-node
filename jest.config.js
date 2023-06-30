/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^lithic$': '<rootDir>/src/index.ts',
    '^lithic/_shims/(.*)$': '<rootDir>/src/_shims/$1.node',
    '^lithic/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/ecosystem-tests/', '<rootDir>/dist/'],
};
