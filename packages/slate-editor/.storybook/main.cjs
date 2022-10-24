module.exports = {
    stories: ['../build/esm/**/*.stories.@(js)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/react',
    features: {
        babelModeV7: true,
    },
    webpackFinal: (config) => {
        config.resolve.mainFields = ['browser', 'main', 'module'];
        config.module.rules.push({
            test: /node_modules\/@prezly\/sdk/,
            use: ['babel-loader'],
        });
        return config;
    },
};
