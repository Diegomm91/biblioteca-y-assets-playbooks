import {loadEnvironmentVariables} from '../nodejs/loadVariables.mjs';

console.log('============================================================');
console.log('BEGIN ---> Webpack | Environment: COMMON');
console.log('');
console.log('Porpouse: Config file for Common environment');
console.log('------------------------------------------------------------');
console.log('');

import path from 'path';
import webpack from 'webpack';
import {fileURLToPath} from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import GeneratePackageJsonPlugin from 'generate-package-json-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { sharedConfig } from './webpack.dev.mjs';
/*
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {getSafeAbsRootPath} from '../../../sfai_library_nodejs/open/SfaiNodeJs.mjs';
*/

// ==========================================
// -----> BEGIN: Init:
// ------------------------------------------

// ------------------------------------------
// END: Init <-----
// ==========================================

// ==========================================
// ------------> BEGIN CONSTANTS
// ------------------------------------------

const __filename = fileURLToPath(import.meta.url); // ESModules
const __dirname = path.dirname(__filename); // ESModules
const environment = process.env.SFAI_APP_ENV;
const absRootPathLibrary = path.resolve(__dirname, '../..');

let ignorePatterns = [];
if (environment === "dev") {
  ignorePatterns = ["**/qa/**", "**/prod/**"];
} else if (environment === "qa") {
  ignorePatterns = ["**/dev/**", "**/prod/**"];
} else if (environment === "prod") {
  ignorePatterns = ["**/dev/**", "**/qa/**"];
}

console.log('[SFAI] - __filename:', __filename);
console.log('[SFAI] - __dirname:', __dirname);
console.log('[SFAI] - environment:', environment);
console.log('[SFAI] absRootPathLibrary', absRootPathLibrary);
console.log(`[SFAI] - SFAI_APP_ENV: ${process.env.SFAI_APP_ENV}`);


// ------------------------------------------
// END: Constants <-----
// ==========================================

console.log('============================================================');
console.log('             [SFAI] BEGIN ---> Webpack - Loading variables...');
console.log('------------------------------------------------------------');


const environmentVariables = loadEnvironmentVariables();

console.log('------------------------------------------------------------');
console.log('               [SFAI] END <-- Webpack - Loaded variables!');
console.log('============================================================');

// Exportación sin uso de promesas ni async
export default {
    mode: 'none',
    entry: {
    }, output: {
        path: path.resolve(absRootPathLibrary, 'dist/sfai_library_objetivos_playbooks'),
        clean: true
    }, 
    module: { rules: sharedConfig.moduleRules }, 
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser', 
            Buffer: ['buffer', 'Buffer']
        }),
        new webpack.DefinePlugin(environmentVariables), // DefinePlugin para inyectar todas las variables de entorno cargadas con dotenv
        // Generar package.json en dist
        new GeneratePackageJsonPlugin(
            {
                name: "sfai-library-foo",
                version: "1.0.6",
                description: "SFAI Library Foo",
                main: "public/index.js",
                types: "public/index.d.ts",
                type: "module",
                author: "Software Factory AI - SFAI",
                license: "MIT",
                exports: {
                    ".": {
                        "import": "./public/index.js",
                        "types": "./public/index.d.ts"
                    }
                }
            }
        ),
        // Copiar assets estáticos
        new CopyWebpackPlugin({
            patterns: [
                {
                  from: path.resolve(absRootPathLibrary, 'impl'),
                  to: 'impl/[path][name][ext]',
                  filter: async (resourcePath) => {
                     return /\.(css|scss)$/.test(resourcePath);
                  }
                },
                {
                    from: path.resolve(absRootPathLibrary, "impl/res/images"),
                    to: "impl/res/images/[path][name][ext]",
                    globOptions: {
                      ignore: ignorePatterns,
                    },
                    noErrorOnMissing: true,
                },	    
            ]
        })
    ]
};

console.log('');
console.log('------------------------------------------------------------');
console.log('END: Webpack | Environment: COMMON');
console.log('============================================================');