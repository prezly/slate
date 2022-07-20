module.exports = {
    stories: ['../build/esm/**/*.stories.@(js)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/react',
    features: {
        babelModeV7: true,
    },
    webpackFinal: (config) => {
        config.resolve.mainFields = ['browser', 'main', 'module'];

        return config;
    },
};
