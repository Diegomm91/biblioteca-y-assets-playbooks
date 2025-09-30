import {
    getEnvVariable,
    getSafeAbsRootPath
} from '../../sfai_library_nodejs/open/SfaiNodeJs.mjs';

console.log('============================================================');
console.log('BEGIN ---> Webpack | Environment: QA');
console.log('');
console.log('Porpouse: Config file for QA environment');
console.log('------------------------------------------------------------');
console.log('');

import path from 'path';
import {merge} from 'webpack-merge';
import commonConfig from './webpack.common.mjs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import 'webpack-dev-server';
import webpack from 'webpack';
import {fileURLToPath} from 'url';

// ==========================================
// ------------> BEGIN CONSTANTS
// ------------------------------------------

const __filename = fileURLToPath(import.meta.url); // ESModules
const __dirname = path.dirname(__filename); // ESModules
const environment = getEnvVariable('SFAI_APP_ENV');
const absRootPath = getSafeAbsRootPath();
const entryPoint = getEnvVariable('ENTRY');
const port = entryPoint === 'main' ? 9005 : 9006;

console.log('[SFAI] __filename', __filename);
console.log('[SFAI] __dirname', __dirname);
console.log('[SFAI] environment', environment);
console.log('[SFAI] absRootPath', absRootPath);
console.log('[SFAI] entryPoint', entryPoint);
console.log('[SFAI] port', port);

// ------------------------------------------
// END: Constants <-----
// ==========================================

const config = merge(commonConfig, {
    mode: 'development',
    entry: {
        using_app: path.resolve(absRootPath, 'using_app/open/src/main/index.tsx')
    },
    output: {
        filename: '[name].bundle-qa.js',
        path: path.resolve(absRootPath, 'dist/qa'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        liveReload: true,
        static: {
            directory: path.resolve(absRootPath, 'dist/qa'),
            publicPath: '/',
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
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/using_app/,
                    to: entryPoint === 'using_app' ? '/index.html' : '/error.html'
                }
                // TODO - Bug: Redirige todas las demás rutas a index.html
            ]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(absRootPath, 'using_app/public/index.html'),
            filename: 'index.html',
            chunks: ['using_app']
        }),
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
