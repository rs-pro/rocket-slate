const path = require('path');

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

  // Return the altered config
  return config;
};
