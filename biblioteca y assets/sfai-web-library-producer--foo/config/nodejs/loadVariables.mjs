import dotenv from 'dotenv';
import path from 'path';
import {
  getEnvVariable,
  getSafeAbsRootPath,
} from '../../sfai_library_nodejs/open/SfaiNodeJs.mjs';

/**
 * Cargar tanto las variables no sensibles como las sensibles en una sola función.
 *
 * @returns {object} - Retorna las variables de entorno cargadas
 */
export function loadEnvironmentVariables() {
  const variablesPath = path.resolve(getSafeAbsRootPath(), 'config/variables');
  const noSensibleCommonEnv = path.resolve(
    getSafeAbsRootPath(),
    `${variablesPath}/no-sensitive/.env.common`
  );
  const noSensibleCurrentEnv = path.resolve(
    getSafeAbsRootPath(),
    `${variablesPath}/no-sensitive/.env.${getEnvVariable('SFAI_APP_ENV')}`
  );
  const noSensibleMockedSecretManagerCurrentEnv = path.resolve(
    getSafeAbsRootPath(),
    `${variablesPath}/no-sensitive/.env.mocked.secret-manager`
  );

  console.log(`[SFAI]    - variablesPath: ${variablesPath}`);
  console.log(`[SFAI]    - envCommon: ${noSensibleCommonEnv}`);
  console.log(`[SFAI]    - noSensibleCurrentEnv: ${noSensibleCurrentEnv}`);
  console.log(
    `[SFAI]    - noSensibleMockedSecretManagerCurrentEnv: ${noSensibleMockedSecretManagerCurrentEnv}`
  );

  dotenv.config({ path: noSensibleCommonEnv, override: true });
  dotenv.config({ path: noSensibleCurrentEnv, override: true });
  dotenv.config({ path: noSensibleMockedSecretManagerCurrentEnv, override: true });

  // Crear y devolver el objeto para `DefinePlugin` con las variables cargadas en `process.env`
  const envObject = Object.keys(process.env).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return acc;
  }, {});

  console.log('==================================================================');
  console.log('-------------------------------------------------------------------');
  console.log(`[SFAI] Environment variables after loading env files:`);
  console.log(process.env);
  console.log('-------------------------------------------------------------------');
  console.log('==================================================================');

  console.log('==================================================================');
  console.log('-------------------------------------------------------------------');
  console.log(`[SFAI] Final envObject for DefinePlugin:`);
  console.log(envObject);
  console.log('-------------------------------------------------------------------');
  console.log('==================================================================');

  return envObject;
}
