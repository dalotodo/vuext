import type { Config } from '@jest/types';

// Jest configuration
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    rootDir: __dirname,
    globals: {
      __DEV__: true
    },    
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^test/(.*)$': '<rootDir>/test/$1'
    },

    transform: { 
      "^.+\\.jsx?$": "babel-jest", 
      '^.+\\.ts?$': 'ts-jest' 
    },
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/**/*.spec.ts'],
    testPathIgnorePatterns: ['/node_modules/'],    
    
    
  };
};