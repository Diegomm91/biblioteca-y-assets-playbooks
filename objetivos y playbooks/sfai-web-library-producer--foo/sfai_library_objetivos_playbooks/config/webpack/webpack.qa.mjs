import {
  getEnvVariable,
  getSafeAbsRootPath
} from '../../../sfai_library_nodejs/open/SfaiNodeJs.mjs';

console.log('============================================================');
console.log('BEGIN ---> Webpack | Environment: QA');
console.log('');
console.log('Porpouse: Config file for QA environment');
console.log('------------------------------------------------------------');
console.log('');

import path from 'path';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.mjs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import 'webpack-dev-server';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

// ==========================================
// ------------> BEGIN CONSTANTS
// ------------------------------------------

const __filename = fileURLToPath(import.meta.url); // ESModules
const __dirname = path.dirname(__filename); // ESModules
const environment = getEnvVariable('SFAI_APP_ENV');
const absRootPathLibrary = path.resolve(__dirname, '../..');
const entryPoint = getEnvVariable('ENTRY');
const port = 9006;

console.log('[SFAI] __filename', __filename);
console.log('[SFAI] __dirname', __dirname);
console.log('[SFAI] environment', environment);
console.log('[SFAI] absRootPathLibrary', absRootPathLibrary);
console.log('[SFAI] entryPoint', entryPoint);
console.log('[SFAI] port', port);

// ------------------------------------------
// END: Constants <-----
// ==========================================

const config = merge(commonConfig, {
  mode: 'development',
  entry: {
    library: path.resolve(absRootPathLibrary, 'public/index.tsx')
  },
  output: {
    filename: 'sfai-library-foo--qa.bundle.js',
    path: path.resolve(absRootPathLibrary, 'dist/qa'),
    publicPath: '/',
    library: 'SFAI_Library_Foo',
    libraryTarget: 'umd', // Formato de la librería (opcional)
    globalObject: 'this', // Objeto global para UMD (opcional)
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    liveReload: true,
    static: {
      directory: path.resolve(absRootPathLibrary, 'dist/qa'),
      serveIndex: true,
      watch: true
    },
    compress: true,
    port: port,
    client: {
      webSocketURL: {
        hostname: 'localhost',
        port: port,
        pathname: '/ws',
        protocol: 'ws'
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new Dotenv()
  ]
});

export default config;

console.log('');
console.log('------------------------------------------------------------');
console.log('END: Webpack | Environment: QA');
console.log('============================================================');
