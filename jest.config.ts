import type { Config } from '@jest/types';
// import { InitialOptionsTsJest } from 'ts-jest/dist/types';
const { defaults: tsjPreset } = require('ts-jest/presets')

// Jest configuration
async function getConfig() {
  const config : Config.InitialOptions = {
    verbose: true,
    rootDir: __dirname,
    globals: {
      __DEV__: true,
      "ts-jest": { tsconfig: "tsconfig.test.json" }
    },    
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^test/(.*)$': '<rootDir>/test/$1'
    },
    transform: {      
      ...tsjPreset.transform,
    },
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/**/*.spec.ts'],
    testPathIgnorePatterns: ['/node_modules/'],    
  };

  return config;
};



export default getConfig;