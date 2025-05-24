/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
    '!src/index.ts',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@/prisma': '<rootDir>/generated/prisma',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};
