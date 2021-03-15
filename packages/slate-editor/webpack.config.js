const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const packageJson = fs.readFileSync('./package.json', 'utf-8');
const { peerDependencies } = JSON.parse(packageJson);

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.ts',
    externals: Object.fromEntries(Object.keys(peerDependencies).map((name) => [name, name])),
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
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'src')],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: '@svgr/webpack',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.svg'],
    },
    output: {
        filename: 'index.js',
        globalObject: 'this',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    watch: isDev,
};
