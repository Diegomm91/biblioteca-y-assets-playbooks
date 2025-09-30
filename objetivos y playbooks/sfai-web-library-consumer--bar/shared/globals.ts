export const isProductionEnvironment = () =>
  process.env.REACT_APP_SFAI_WEB_BUILD_ENVIRONMENT === 'PROD';

export const isQaEnvironment = () =>
  process.env.REACT_APP_SFAI_WEB_BUILD_ENVIRONMENT === 'QA';

export const isDevEnvironment = () =>
  process.env.REACT_APP_SFAI_WEB_BUILD_ENVIRONMENT === 'DEV';

export const isReleaseBuild = () =>
  process.env.REACT_APP_SFAI_WEB_BUILD_TYPE === 'RELEASE';

export const sfaiHost = () => 'https://www.softwarefactoryai.com';
export const currentHost = () => window.location.origin;
