module.exports = (api) => {
    const isTest = api.env('test');

    return {
        targets: {
            esmodules: !isTest,
            node: '12',
        },
        presets: [
            '@babel/typescript',
            '@babel/react',
            '@dr.pogodin/babel-preset-svgr',
            [
                '@babel/env',
                {
                    useBuiltIns: false,
                    modules: isTest ? 'commonjs' : false,
                },
            ],
        ],
        plugins: [
            ['babel-plugin-transform-remove-imports', { test: '\\.scss$' }],
            !isTest && ['babel-plugin-add-import-extension', { extension: 'mjs' }],
        ].filter(Boolean),
    };
};
