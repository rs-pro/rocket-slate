const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const configFilePath = path.resolve(__dirname, '..', 'tsconfig.json');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.module.rules.push({
    test: /\.tsx?$/,
    loader: "ts-loader",
    options: {
      configFile: configFilePath,
      onlyCompileBundledFiles: true,
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.plugins = config.resolve.plugins || [];
  config.resolve.plugins.push( new TsconfigPathsPlugin({ configFile: configFilePath }) );

  // Return the altered config
  return config;
};
