import dotenv from 'dotenv';
import path from 'path';
import { beforeAll, afterAll, jest } from '@jest/globals';
import {
  getNoSensitiveEnvVariableInNode,
  getSafeAbsRootPath,
  validateDirectoryExists
} from '@sfai-library-nodejs/open/SfaiNodeJs.mjs';
import {sfaiLogReact} from "../../../sfai_library_stub/open/src/main/SfaiLibraryStub";
import {SfaiLogLevel} from "@sfai-library-nodejs/open/logger/sfaiLogNode.mjs";

/**
 * Usar temporizadores falsos de Jest para controlar el tiempo y garantizar
 * setear las pruebas unitarias previamente a ejecutarlas
 */

jest.useFakeTimers();

sfaiLogReact(
  'JEST SETUP',
  '---> BEGIN: Unit Test - 1. Loading variables...',
  SfaiLogLevel.INFO,
  {},
  true
);

type EnvKeys = 'none' | 'dev' | 'qa' | 'prod';

const envFileMap: Record<EnvKeys, string> = {
  none: '.env.none',
  dev: '.env.dev',
  qa: '.env.qa',
  prod: '.env.prod'
};

const nodeEnv = getNoSensitiveEnvVariableInNode('SFAI_APP_ENV') as EnvKeys | 'none';
const envFile = nodeEnv && envFileMap[nodeEnv] ? envFileMap[nodeEnv] : '.env.none';

const noSensitiveEnvDir = path.resolve(
  getSafeAbsRootPath(),
  'config/variables/no-sensitive'
);

validateDirectoryExists(noSensitiveEnvDir);

sfaiLogReact(
  'JEST',
  'Unit Test - Info:',
  SfaiLogLevel.INFO,
  {
    'nodeEnv: ': nodeEnv,
    'envFile: ': envFile,
    'noSensitiveEnvDir: ': noSensitiveEnvDir
  },
  true
);

// Ejecutar una sola vez antes de toda la suite de pruebas
beforeAll(async () => {
  sfaiLogReact('JEST', 'Unit Test - Before All', SfaiLogLevel.INFO, {}, true);

  await loadEnvVariables();

  sfaiLogReact(
    'JEST',
    '<--- END: Unit Test - 1. Loading variables...',
    SfaiLogLevel.INFO,
    {},
    true
  );

  // Avanzar el tiempo para asegurar que todas las promesas se resuelvan
  jest.advanceTimersByTime(0);
});

async function loadEnvVariables() {
  return new Promise<void>((resolve, reject) => {
    try {
      // Fase 1: Cargar y validar variables comunes
      dotenv.config({
        path: path.join(noSensitiveEnvDir, '.env.common'),
        override: true
      });
      validateEnvVariable('REACT_APP_SFAI_CONFIG_ENV_COMMON_PING');

      // Fase 2: Cargar y validar variables específicas del entorno
      dotenv.config({ path: path.join(noSensitiveEnvDir, envFile), override: true });
      validateEnvVariable('REACT_APP_SFAI_CONFIG_LOCAL_CURRENT_ENV_PING');

      // Fase 3: Cargar y validar variables simuladas del Secret Manager
      dotenv.config({
        path: path.join(noSensitiveEnvDir, '.env.mocked.secret-manager'),
        override: true
      });
      validateEnvVariable('REACT_APP_SFAI_CONFIG_ENV_MOCKED_SECRET_MANAGER_PING');

      resolve(); // Resuelve la promesa para continuar con las pruebas
    } catch (error) {
      reject(error); // Rechaza la promesa si hay algún error
    }
  });
}

afterAll(async () => {
  sfaiLogReact('JEST', 'Unit Test - After All...', SfaiLogLevel.INFO, {}, true);
  jest.runAllTimers(); // Ejecuta todos los temporizadores pendientes
});

function validateEnvVariable(variableName: string) {
  const value = getNoSensitiveEnvVariableInNode(variableName);
  if (!value) {
    sfaiLogReact(
      'JEST - Unit Tests',
      `The environment variable ${variableName} is missing.`,
      SfaiLogLevel.ERROR,
      {
        [variableName]: value
      },
      true
    );
    throw new Error(`Environment variable ${variableName} is missing.`);
  } else {
    sfaiLogReact(
      'JEST - Unit Tests',
      `The environment variable ${variableName} is defined.`,
      SfaiLogLevel.INFO,
      {
        [variableName]: value
      },
      true
    );
  }
}
