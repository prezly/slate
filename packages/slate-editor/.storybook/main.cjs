module.exports = {
    stories: ['../build/cjs/**/*.stories.@(cjs)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/react',
    features: {
        babelModeV7: true,
    },
};
