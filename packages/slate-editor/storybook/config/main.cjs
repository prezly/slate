module.exports = {
  stories: ['../../build/esm/**/*.stories.@(js)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  features: {
    babelModeV7: true
  },
  webpackFinal: config => {
    config.resolve.mainFields = ['browser', 'main', 'module'];
    config.resolve.fallback = {...config.resolve.fallback, url: false  }
    config.module.rules.push({
      test: /node_modules\/@prezly\/sdk/,
      use: ['babel-loader']
    });
    return config;
  },
  docs: {
    autodocs: true
  }
};
