module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
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

        return {
            ...config,
        };
    },
};
