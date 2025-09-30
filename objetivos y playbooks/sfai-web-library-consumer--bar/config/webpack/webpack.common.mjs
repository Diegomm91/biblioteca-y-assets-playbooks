import { loadEnvironmentVariables } from '../nodejs/loadVariables.mjs';

console.log('============================================================');
console.log('BEGIN ---> Webpack | Environment: COMMON');
console.log('');
console.log('Porpouse: Config file for Common environment');
console.log('------------------------------------------------------------');
console.log('');

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { fileURLToPath } from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { getSafeAbsRootPath } from '../../sfai_library_nodejs/open/SfaiNodeJs.mjs';

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
const absRootPath = getSafeAbsRootPath();

console.log('[SFAI] - __filename:', __filename);
console.log('[SFAI] - __dirname:', __dirname);
console.log('[SFAI] - environment:', environment);
console.log('[SFAI] - absRootPath:', absRootPath);

// ------------------------------------------
// END: Constants <-----
// ==========================================

console.log('============================================================');
console.log('             [SFAI] BEGIN ---> Webpack - Loading variables...');
console.log('------------------------------------------------------------');

console.log(`[SFAI] - SFAI_APP_ENV: ${process.env.SFAI_APP_ENV}`);
console.log('[SFAI] - Absolute Root Path:', absRootPath);

const environmentVariables = loadEnvironmentVariables();

console.log('------------------------------------------------------------');
console.log('               [SFAI] END <-- Webpack - Loaded variables!');
console.log('============================================================');

// Exportación sin uso de promesas ni async
export default {
    entry: {
        using_app: path.resolve(absRootPath, 'using_app/open/src/main/index.tsx'),
    },
    output: {
        filename: '[name].bundle.js', // Nombre del archivo de salida
        publicPath: '/',
        path: path.resolve(absRootPath, 'dist'),
        clean: true // Limpia la carpeta dist en cada build
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'  // Compila SASS a CSS
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images', // Give the images in the path '/images'
                            name: '[name].[ext]' // Keep the original name of file
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@rootProject': absRootPath,
            '@shared': path.resolve(absRootPath, 'shared'),
            '@config': path.resolve(absRootPath, 'config'),
            '@sfai_library_mjs': path.resolve(absRootPath, 'sfai_library_mjs'),
            '@sfai_library_nodejs': path.resolve(absRootPath, 'sfai_library_nodejs'),
            images: path.resolve(absRootPath, 'using_app/impl/res/images'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css'], // Extensiones que Webpack debe manejar
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
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../../tsconfig.json')
            })
        ]
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
        // DefinePlugin para inyectar todas las variables de entorno cargadas con dotenv
        new webpack.DefinePlugin(environmentVariables)
    ]
};

console.log('');
console.log('------------------------------------------------------------');
console.log('END: Webpack | Environment: COMMON');
console.log('============================================================');
