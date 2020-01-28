const path = require('path');

const tsConfig = require('../tsconfig');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.module.rules.push({
    test: /\.tsx?$/,
    loader: "ts-loader"
  });
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve(__dirname, '../src'),
    ...Object
      .entries(tsConfig.compilerOptions.paths)
      .filter(([key, value]) => !key.includes('*') )
      .reduce((aliases, [ alias, paths ]) => ({ ...aliases, [alias]: path.resolve(__dirname, '..', paths[0]) }), {})
  }

  // Return the altered config
  return config;
};
