import path, { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

function getProjectRoot(): string {
  // Convert `import.meta.url` to a file path and navigate to the parent directory to find `package.json`
  const moduleDir = dirname(fileURLToPath(import.meta.url));
  const projectRoot = resolve(moduleDir, '../'); // Mueve un nivel hacia arriba
  console.log('SFAI - projectRoot', projectRoot);
  return projectRoot;
}

function searchStoriesIn(directory: string): string {
  return `${getProjectRoot()}/${directory}/**/*.stories.@(js|jsx|ts|tsx|mdx)`;
}

// Configuración de Storybook
const config: {
  webpackFinal: (config: any) => Promise<any>;
  stories: string[];
  framework: { name: string; options: {} };
  addons: string[];
} = {
  stories: [`${searchStoriesIn('sfai_react_library')}`, `${searchStoriesIn('stories')}`],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sfai-react-library': path.resolve(getProjectRoot(), '/sfai_react_library')
    };

    // Loaders de SCSS
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    });

    return config;
  }
};

export default config;
