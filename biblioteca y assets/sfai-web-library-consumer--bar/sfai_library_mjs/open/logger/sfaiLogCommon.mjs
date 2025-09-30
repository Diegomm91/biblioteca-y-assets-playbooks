/**
 * Captura los nombres de las funciones en el flujo del stack trace hasta un límite definido, en un entorno Node.
 * @param {number} limit - Número máximo de llamadas a capturar en el stack (por defecto 10)
 * @returns {string[]} Array con los nombres de funciones en el stack trace hasta el límite
 */
export const captureStackTraceForNode = (limit = 10) => {
  const stack = new Error().stack;

  if (!stack) {
    return ['unknown function'];
  }

  // Dividir el stack en líneas y omitir la primera línea "Error"
  const stackLines = stack.split('\n').slice(1);

  // Tomar las primeras `limit` líneas relevantes
  const relevantLines = stackLines.slice(0, limit).map((line) => line.trim());

  // Expresión regular para capturar el nombre de la función en cada línea
  const functionNameRegex = /^\s*at\s+([^\s]+)\s/;

  // Extraer los nombres de las funciones en el flujo hasta el límite
  const callerFunctions = relevantLines.map((line) => {
    const matches = line.match(functionNameRegex);
    return matches ? matches[1] : 'unknown function';
  });

  console.log(
    '[SFAI] [DEBUG] ----> Nombres de función en el flujo de stack hasta el límite: ',
    callerFunctions
  );

  return callerFunctions;
};

export const logToConsole = (logEntry, level, enabled) => {
  const replacer = (key, value) => {
    return value === undefined ? null : value;
  };

  if (enabled) {
    switch (level) {
      case 'ERROR':
        console.error(JSON.stringify(logEntry, replacer, 2));
        break;
      case 'WARNING':
        console.warn(JSON.stringify(logEntry, replacer, 2));
        break;
      case 'DEBUG':
        console.info(JSON.stringify(logEntry, replacer, 2));
        break;
      case 'INFO':
      default:
        console.info(JSON.stringify(logEntry, replacer, 2));
        break;
    }
  }
};
