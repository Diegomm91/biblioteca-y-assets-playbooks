console.log(
  '>>>>>>>>>>>> [SFAI] 1. Environment in webpack.config.mjs:',
  process.env.SFAI_APP_ENV
);

console.log('============================================================');
console.log('BEGIN ---> Webpack - Config');
console.log('');
console.log('Porpouse: Orchestate the webpack configuration for different envs');
console.log('Precondition: For webpack use "module": "ESModule');
console.log('------------------------------------------------------------');
console.log('');

import { fileURLToPath } from 'url';
import path from 'path';
import {
  SfaiLogLevel,
  sfaiLogNode
} from '../../../sfai_library_nodejs/open/logger/sfaiLogNode.mjs';

/**
 * Precondition:
 *  - Webpack should be using ESM format for module imports
 * @type {number}
 */

// ==========================================
// ------------> BEGIN CONSTANTS
// ------------------------------------------

const __filename = fileURLToPath(import.meta.url); // ESModules
const __dirname = path.dirname(__filename); // ESModules
const environment = process.env.SFAI_APP_ENV;

console.log('[SFAI] WebpackConfig: __filename:', __filename);
console.log('[SFAI] WebpackConfig: __dirname:', __dirname);
console.log('[SFAI] WebpackConfig: environment:', environment);

// ------------------------------------------
// END: Constants <-----
// ==========================================

/**
 *
 * WARNING:
 *  - Eliminar el paso del parámetro environment en la función asíncrona y usar la variable process.env.SFAI_APP_ENV
 *    directamente dentro de la función. Con esto se evita:
 *      1. Sobreescribir a la variable process.env.SFAI_APP_ENV accidentalmente
 *      2. Una doble definicion del parametro
 *      3. Una evaluacion tardia por asincronia.
 *
 * @returns {Promise<*>}
 */
export default async () => {
  let configModule;

  switch (environment) {
    case 'prod':
      sfaiLogNode('WebpackConfig', 'Environment: prod', SfaiLogLevel.INFO, {}, true);
      configModule = await import('./webpack.prod.mjs');
      break;
    case 'qa':
      sfaiLogNode('WebpackConfig', 'Environment: qa', SfaiLogLevel.INFO, {}, true);
      configModule = await import('./webpack.qa.mjs');
      break;
    case 'dev':
      sfaiLogNode('WebpackConfig', 'Environment: dev', SfaiLogLevel.INFO, {}, true);
      configModule = await import('./webpack.dev.mjs');
      break;
    default:
      sfaiLogNode('WebpackConfig', 'Environment: none', SfaiLogLevel.INFO, {}, true);
      configModule = await import('./webpack.common.mjs');
      break;
  }

  return configModule.default;
};

console.log('');
console.log('------------------------------------------------------------');
console.log('END: Webpack - Config');
console.log('============================================================');
