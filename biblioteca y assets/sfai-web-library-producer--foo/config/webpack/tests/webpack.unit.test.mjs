import { describe, it } from '@jest/globals';
import { loadEnvironmentVariables } from '../../nodejs/loadVariables.mjs'; // Removed 'expect' as it's not directly imported in most cases, Jest provides it globally

describe('loadEnvironmentVariables function', () => {
  it('should load non-sensitive environment variables', async () => {
    const envVariables = loadEnvironmentVariables();

    expect(
      envVariables['process.env.REACT_APP_SFAI_CONFIG_ENV_COMMON_PING']
    ).toBeDefined();
    expect(
      envVariables['process.env.REACT_APP_SFAI_CONFIG_LOCAL_CURRENT_ENV_PING']
    ).toBeDefined();

    expect(
      envVariables['process.env.REACT_APP_SFAI_WEB_BUILD_ENVIRONMENT']
    ).toBeDefined();
    expect(envVariables['process.env.REACT_APP_SFAI_WEB_BUILD_TYPE']).toBeDefined();
  });
});
