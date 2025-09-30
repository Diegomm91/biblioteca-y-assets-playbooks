import dotenv from 'dotenv';
import path from 'path';
import { beforeAll, afterAll, jest } from '@jest/globals';
import {
  getNoSensitiveEnvVariableInNode,
  getSafeAbsRootPath,
  validateDirectoryExists
} from '@sfai-library-nodejs/open/SfaiNodeJs.mjs';

/**
 * Usar temporizadores falsos de Jest para controlar el tiempo y garantizar
 * setear las pruebas de integracion previamente a ejecutarlas
 */

jest.useFakeTimers();

const noSensitiveEnvDir = path.resolve(
  getSafeAbsRootPath(),
  'config/variables/no-sensitive'
);

validateDirectoryExists(noSensitiveEnvDir);

// Definir los posibles valores para SFAI_APP_ENV
type EnvKeys = 'none' | 'dev' | 'qa' | 'prod';
const envFileMap: Record<EnvKeys, string> = {
  none: '.env.none',
  dev: '.env.dev',
  qa: '.env.qa',
  prod: '.env.prod'
};
const nodeEnv = getNoSensitiveEnvVariableInNode('SFAI_APP_ENV') as EnvKeys | 'none';
const envFile = nodeEnv && envFileMap[nodeEnv] ? envFileMap[nodeEnv] : '.env.none';


beforeAll(async () => {

  // Fase 1: Cargar variables comunes
  dotenv.config({ path: path.join(noSensitiveEnvDir, '.env.common') });

  // Fase 2: Cargar variables específicas del entorno
  dotenv.config({ path: path.join(noSensitiveEnvDir, envFile), override: true });

  // Fase 4: Cargar y validar variables del Secret Manager
  dotenv.config({ path: path.join(envFile), override: true });

  validateEnvVariable('REACT_APP_SFAI_CONFIG_ENV_COMMON_PING');
  validateEnvVariable('REACT_APP_SFAI_CONFIG_LOCAL_CURRENT_ENV_PING');

});

afterAll(async () => {
  jest.runAllTimers(); // Ejecuta todos los temporizadores pendientes
});

function validateEnvVariable(variableName: string) {
  const value = getNoSensitiveEnvVariableInNode(variableName);
  if (!value) {
    throw new Error(`Environment variable ${variableName} is missing.`);
  }
}
