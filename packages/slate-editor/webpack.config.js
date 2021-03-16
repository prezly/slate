const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const postCssConfig = require('./postcss.config');

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'));

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.ts',
    externals: Object.fromEntries(
        Object.keys(packageJson.peerDependencies).map((name) => [name, name]),
    ),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader', options: postCssConfig },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.sprite\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            spriteFilename: 'icons',
                        },
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [{ convertColors: { shorthex: true } }, { sortAttrs: true }],
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules', 'src'],
    },
    output: {
        filename: 'index.js',
        globalObject: 'this',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    plugins: [
        new SpriteLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    watch: isDev,
};
