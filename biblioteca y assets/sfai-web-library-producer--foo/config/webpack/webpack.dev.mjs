import {
    getEnvVariable,
    getSafeAbsRootPath
} from '../../sfai_library_nodejs/open/SfaiNodeJs.mjs';

console.log('============================================================');
console.log('BEGIN ---> Webpack | Environment: DEV');
console.log('');
console.log('Porpouse: Config file for DEV environment');
console.log('------------------------------------------------------------');
console.log('');

import path from 'path';
import {merge} from 'webpack-merge';
import commonConfig from './webpack.common.mjs';
import 'webpack-dev-server';
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

console.log('[SFAI] - __filename', __filename);
console.log('[SFAI] - __dirname', __dirname);
console.log('[SFAI] - environment', environment);
console.log('[SFAI] - absRootPath', absRootPath);
console.log('[SFAI] - entryPoint', entryPoint);
console.log('[SFAI] - port', port);

// ------------------------------------------
// END: Constants <-----
// ==========================================

// Only serve files from the dist/dev folder
const config = merge(commonConfig, {
    mode: 'development',
    entry: {
        using_app: path.resolve(absRootPath, 'using_app/open/src/main/index.tsx')
    },
    output: {
        filename: '[name].bundle-dev.js',
        path: path.resolve(absRootPath, 'dist/dev'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        hot: true,
        liveReload: true,
        static: {
            directory: path.resolve(absRootPath, 'dist/dev'),
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
                // TODO: Fix redirect for all other routes to index.html
            ]
        }
    }
});

export default config;

console.log('');
console.log('------------------------------------------------------------');
console.log('END: Webpack | Environment: DEV');
console.log('============================================================');
