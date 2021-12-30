export default {
    targets: {
        esmodules: true,
        node: '12',
    },
    presets: [
        '@babel/typescript',
        '@babel/react',
        '@dr.pogodin/babel-preset-svgr',
        ['@babel/env', { useBuiltIns: false, modules: false }],
    ],
    plugins: [
        ['babel-plugin-transform-remove-imports', { test: '\\.scss$' }],
        ['babel-plugin-add-import-extension', { extension: 'mjs' }],
    ],
};
