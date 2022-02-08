const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/react',
    features: {
        babelModeV7: true,
    },
    typescript: {
        check: true,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    webpackFinal: async (config) => {
        const fileLoaderRule = config.module.rules.find(
            (rule) => rule.test && rule.test.test('.svg'),
        );

        fileLoaderRule.exclude = /\.(svg)$/;

        config.module.rules.push({
            test: /\.(svg)$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
        });

        config.module.rules.push({
            test: /\.mjs$/,
            type: 'javascript/auto',
        });

        config.resolve.alias['#lodash'] = require.resolve('lodash-es');

        config.plugins.push(new TsconfigPathsPlugin({}));

        return {
            ...config,
        };
    },
};
