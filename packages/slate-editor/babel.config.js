module.exports = {
    extends: `${__dirname}/../../babel.config.js`,
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '#components': './src/components',
                    '#icons': './src/icons',
                    '#lib': './src/lib',
                    '#modules': './src/modules',
                },
            },
        ],
    ],
};
