import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Context: Node.js
 * Este código está diseñado para ejecutarse en entornos de Node.js.
 * El objetivo es manejar archivos y directorios en el servidor.
 */

// Asumimos que estamos en Node.js
const isNode = true;

// Detectamos si estamos en un entorno de ES Modules
const isESM = typeof import.meta !== 'undefined';

/**
 * Retrieves the value of a non-sensitive environment variable from process.env.
 * If the variable is not defined, an empty string is returned as a fallback.
 *
 * @param variableName - The name of the environment variable to retrieve.
 * @returns The value of the environment variable as a string, or an empty string if not set.
 */
export function getNoSensitiveEnvVariableInNode(variableName) {
  return process.env[variableName] || '';
}

/**
 * Función para obtener `__filename` de manera segura en entornos ESM o CommonJS.
 * @returns {string} - El path del archivo actual.
 */
function getSafeFilename() {
  if (isESM) {
    return fileURLToPath(import.meta.url); // Para ES Modules
  }
  if (typeof __filename !== 'undefined') {
    return __filename; // Para CommonJS
  }
  throw new Error('Unable to determine __filename');
}

/**
 * Función para obtener `__dirname` de manera segura en entornos ESM o CommonJS.
 * @returns {string} - El directorio actual del archivo.
 */
function getSafeDirname() {
  const filename = getSafeFilename();
  if (isESM) {
    return path.dirname(filename); // Para ES Modules
  }
  if (typeof __dirname !== 'undefined') {
    return __dirname; // Para CommonJS
  }
  throw new Error('Unable to determine __dirname');
}

// Exportamos los valores de __filename y __dirname ya calculados
export const __filename = getSafeFilename();
export const __dirname = getSafeDirname();

export function getEnvVariable(variableName) {
  return process.env[variableName] || '';
}

/**
 * Obtiene la ruta raíz absoluta de manera segura.
 * @returns {string} - La ruta absoluta desde el directorio raíz del proyecto.
 */
export function getSafeAbsRootPath() {
  if (!__dirname) {
    throw new Error('Cannot resolve root path: __dirname is not defined');
  }
  return path.resolve(__dirname, '../..');
}

/**
 * Verifica si un directorio existe en el sistema de archivos.
 * @param {string} dirPath - Ruta absoluta o relativa del directorio a verificar.
 * @returns {boolean} - Devuelve true si el directorio existe, de lo contrario false.
 */
export function validateDirectoryExists(dirPath) {
  const resolvedPath = path.resolve(dirPath);
  try {
    if (fs.existsSync(resolvedPath) && fs.lstatSync(resolvedPath).isDirectory()) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(
      `Error validating the existence of the directory: ${resolvedPath}`,
      error
    );
    return false;
  }
}

export const isProductionEnvironment = () => {
  return getEnvVariable('SFAI_APP_ENV') === 'prod';
};

export const isQaEnvironmentInNode = () => {
  return getEnvVariable('SFAI_APP_ENV') === 'qa';
};

export const isDevEnvironmentInNode = () => {
  return getEnvVariable('SFAI_APP_ENV') === 'dev';
};
