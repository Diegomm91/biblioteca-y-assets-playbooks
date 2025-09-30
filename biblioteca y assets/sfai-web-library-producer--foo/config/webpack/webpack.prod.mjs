import {
    getEnvVariable,
    getSafeAbsRootPath
} from '../../sfai_library_nodejs/open/SfaiNodeJs.mjs';

console.log('============================================================');
console.log('BEGIN ---> Webpack | Environment: PROD');
console.log('');
console.log('Porpouse: Config file for PROD environment');
console.log('------------------------------------------------------------');
console.log('');

import path from 'path';
import {merge} from 'webpack-merge';
import commonConfig from './webpack.common.mjs';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import {fileURLToPath} from 'url';

// ==========================================
// ------------> BEGIN CONSTANTS
// ------------------------------------------

const __filename = fileURLToPath(import.meta.url); // ESModules
const __dirname = path.dirname(__filename); // ESModules
const environment = getEnvVariable('SFAI_APP_ENV');
const absRootPath = getSafeAbsRootPath();
const entryPoint = getEnvVariable('ENTRY');

console.log('[SFAI] __filename', __filename);
console.log('[SFAI] __dirname', __dirname);
console.log('[SFAI] environment', environment);
console.log('[SFAI] absRootPath', absRootPath);
console.log('[SFAI] entryPoint', entryPoint);

// ------------------------------------------
// END: Constants <-----
// ==========================================

// Enforce "main" as the only valid entry point in production
if (entryPoint !== 'main') {
    throw new Error('[SFAI] Invalid entry point for production: only "main" is allowed');
}

const config = merge(commonConfig, {
    mode: 'production',
    entry: {
        [entryPoint]: path.resolve(__dirname, '../../using_app/open/src/main/index.tsx')
    },
    output: {
        filename: '[name].[contenthash].bundle-prod.js',
        path: path.resolve(absRootPath, 'dist/prod'),
        clean: true, // Limpiar el directorio de salida antes de cada compilación
        publicPath: '/'
    },
    optimization: {
        minimizer: [new TerserWebpackPlugin()]
    },
    plugins: [new Dotenv()]
});

export default config;

console.log('');
console.log('------------------------------------------------------------');
console.log('END: Webpack | Environment: PROD');
console.log('============================================================');
