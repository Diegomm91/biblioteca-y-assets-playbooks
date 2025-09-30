// envChecker.js
class EnvChecker {
  static checkEnvVariable(variableName) {
    const value = process.env[variableName];
    if (!value) {
      throw new Error(`Variable de entorno ${variableName} no está definida`);
    }
    return value;
  }
}

module.exports = EnvChecker;
