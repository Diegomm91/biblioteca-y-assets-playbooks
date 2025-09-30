/**
 * Use sintaxs of ESModules
 */

export default {
  presets: [
    [
      '@babel/preset-env', // Para compatibilidad con JavaScript moderno
      {
        targets: {
          node: 'current'
        },
        modules: false // Asegura que se mantengan los módulos ES
      }
    ],
    '@babel/preset-react', // Para soporte de JSX (React)
    '@babel/preset-typescript' // Para soporte de TypeScript
  ]
};
