import path from 'path';
import { fileURLToPath } from 'url';
import { getSafeAbsRootPath } from '@sfai-library-nodejs/open/SfaiNodeJs.mjs';

/**
 * UNIT TESTS:
 *
 * Compatibility for run tests in different environments:
 *  - Local
 *  - Amplify
 */

const __filename = fileURLToPath(import.meta.url); // ESM syntax
const __dirname = path.dirname(__filename); // ESM syntax

const rootDir = path.resolve(__dirname, '../../');

console.log('=========================');
console.log('');
console.log('[SFAI] __filename: ', __filename);
console.log('[SFAI] __dirname: ', __dirname);
console.log('[SFAI] rootDir: ', rootDir);
console.log('');
console.log('=========================');

/**
 * <rootDir> is: softwarefactoryai-web/config/jest
 * */
export default {
  rootDir: rootDir,
  roots: [rootDir], // support dirs also for amplify

  // Supports tests for Amplify in: /codebuild/output/src1805465551/src/softwarefactoryai-web/config/jest
  testMatch: [
    '<rootDir>/**/?(*.)+(unit.test).[jt]s?(x)',
    '<rootDir>/**/?(*.)+(unit.test).mjs'
  ],
  setupFilesAfterEnv: [
    // allows use beforeAll in setup file
    path.resolve(rootDir, 'config/jest/setup/jest.setup.unit.ts') // Ruta absoluta para setup
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Usa ts-jest para transformar archivos TypeScript, incluyendo .tsx
    '^.+\\.jsx?$': 'babel-jest', // Usa babel-jest para transformar archivos JavaScript
    '^.+\\.js$': 'babel-jest', // Añadir esta línea para transformar archivos .js con babel-jest
    '^.+\\.mjs$': 'babel-jest' // Asegura que Babel maneje archivos .mjs
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Tratar archivos TypeScript como ES Modules
  globals: {
    'ts-jest': {
      useESM: true // Permitir ESM en ts-jest
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
  testEnvironment: 'node', // Use Node.js environment
  moduleNameMapper: {
    '^(.*)\\.js$': '$1', // Mapea importaciones con extensión .js a módulos sin extensión
    '^@rootProject/(.*)$': path.resolve(__dirname, '../../$1'),

    '^@shared/(.*)$': path.resolve(getSafeAbsRootPath(), 'shared/$1'),
    '^@config/(.*)$': path.resolve(getSafeAbsRootPath(), 'config/$1'),
    '^@sfai-react-library/(.*)$': path.resolve(
      getSafeAbsRootPath(),
      'sfai_react_library/$1'
    ),
    '^@sfai-library-nodejs/(.*)$': path.resolve(
      getSafeAbsRootPath(),
      'sfai_library_nodejs/$1'
    ),
    '^@sfai-library-mjs/(.*)$': path.resolve(getSafeAbsRootPath(), 'sfai_library_mjs/$1')
  },
  transformIgnorePatterns: ['/node_modules/(?!@babel/runtime)'],

  // WARNING: Use ^<rootDir> to avoid ignore match with other paths on Amplify
  modulePathIgnorePatterns: [
    '^<rootDir>/amplify',
    '^<rootDir>/amplify-backup',
    '^<rootDir>/app/dist',
    '^<rootDir>/build',
    '^<rootDir>/coverage',
    '^<rootDir>/deprecated-static-web',
    '^<rootDir>/dist',
    '^<rootDir>/node_modules',
    '^<rootDir>/temp',
    '^<rootDir>/sfai_react_library/src/component_swiper/deprecated',
    '^<rootDir>/output',
    '^<rootDir>/TODO',
    '^<rootDir>/TODO',
    '^<rootDir>/stories'
  ],
  testPathIgnorePatterns: [
    '^<rootDir>/amplify',
    '^<rootDir>/amplify-backup',
    '^<rootDir>/app/dist',
    '^<rootDir>/build',
    '^<rootDir>/coverage',
    '^<rootDir>/deprecated-static-web',
    '^<rootDir>/dist',
    '^<rootDir>/node_modules',
    '^<rootDir>/temp',
    '^<rootDir>/sfai_react_library/src/component_swiper/deprecated',
    '^<rootDir>/output',
    '^<rootDir>/TODO',
    '^<rootDir>/TODO',
    '^<rootDir>/stories'
  ]
};
