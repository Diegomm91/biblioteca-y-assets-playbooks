import {
    getEnvVariable,
    getSafeAbsRootPath
} from '../../../sfai_library_nodejs/open/SfaiNodeJs.mjs';

console.log('============================================================');
console.log('BEGIN ---> Webpack | Environment: DEV');
console.log('');
console.log('Porpouse: Config file for DEV environment');
console.log('------------------------------------------------------------');
console.log('');

import path from 'path';
import 'webpack-dev-server';
import {fileURLToPath} from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

// ==========================================
// ------------> BEGIN CONSTANTS
// ------------------------------------------

const __filename = fileURLToPath(import.meta.url); // ESModules
const __dirname = path.dirname(__filename); // ESModules
const environment = getEnvVariable('SFAI_APP_ENV');
const absRootPathLibrary = path.resolve(__dirname, '../..');
const entryPoint = getEnvVariable('ENTRY');
const port = entryPoint === 'library' ? 9005 : 9006;

console.log('[SFAI] - __filename', __filename);
console.log('[SFAI] - __dirname', __dirname);
console.log('[SFAI] - environment', environment);
console.log('[SFAI] - absRootPathLibrary', absRootPathLibrary);
console.log('[SFAI] - entryPoint', entryPoint);
console.log('[SFAI] - port', port);

// ------------------------------------------
// END: Constants <-----
// ==========================================


// ======================
// Shared Config for Common
// ======================
export const sharedConfig = {
  absRootPathLibrary,
  resolve: {
    alias: {
      '@rootProject': absRootPathLibrary,
      '@config': path.resolve(absRootPathLibrary, 'config'),
      '@shared': path.resolve(absRootPathLibrary, '../shared'),
      '@sfai_library_mjs': path.resolve(absRootPathLibrary, '../sfai_library_mjs'),
      '@sfai_library_nodejs': path.resolve(absRootPathLibrary, '../sfai_library_nodejs'),
      '@sfai_library_foo_impl': path.resolve(absRootPathLibrary, 'impl'),
      '@sfai-library-biblioteca-assets-impl': path.resolve(absRootPathLibrary, 'impl'),
      images: path.resolve(absRootPathLibrary, 'impl/res/images'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css'],
    enforceExtension: false,
    fallback: {
      process: 'process/browser',
      buffer: 'buffer',
      http: 'stream-http',
      https: 'https-browserify',
      url: 'url',
      path: 'path-browserify',
      crypto: 'crypto-browserify',
      vm: 'vm-browserify',
      assert: 'assert',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      querystring: 'querystring-es3',
      util: 'util/',
      os: 'os-browserify/browser',
      fs: false,
      child_process: false,
      tls: false,
      net: false,
      request: false
    },
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../../tsconfig.dev.json') })]
  },
  moduleRules: [
    { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: ['ts-loader'] },
    { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [{ loader: 'file-loader', options: { outputPath: 'images', name: '[name].[ext]' } }]
    },
    {
      test: /\.svg$/,
      use: [{ loader: 'file-loader', options: { outputPath: 'images', name: '[name].[ext]' } }]
    }
  ]
};



const config = {
    mode: 'development',
    entry: {
        library: path.resolve(absRootPathLibrary, 'public/index.tsx')
    },
    output: {
        filename: 'sfai-library-foo--dev.bundle.js',
        path: path.resolve(absRootPathLibrary, 'dist/dev'),
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
            directory: path.resolve(absRootPathLibrary, 'dist/dev'),
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
    resolve: sharedConfig.resolve,
    module: { rules: sharedConfig.moduleRules },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]
};

export default config;

console.log('');
console.log('------------------------------------------------------------');
console.log('END: Webpack | Environment: DEV');
console.log('============================================================');