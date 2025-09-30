/* eslint-env jest */
import EnvChecker from './envChecker';

describe('Verificación de variables de entorno', () => {
  it('debería tener definida la variable REACT_APP_SFAI_WEB_BUILD_VARIANT', () => {
    expect(() => EnvChecker.checkEnvVariable('REACT_APP_SFAI_WEB_BUILD_VARIANT')).not.toThrow();
  });
});