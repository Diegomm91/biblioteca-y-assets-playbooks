/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const sfaiLogReact = (
  message: string,
  details: string,
  logLevel: any, // Suprimido el error de tipo explícito 'any'
  additionalData: object, // Suprimido el error de variable no utilizada
  isEnabled: boolean // Suprimido el error de variable no utilizada
) => {
  console.log(`[SFaiStub] ${message} - ${details}`);
};

/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
