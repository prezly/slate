const { getPackagesSync } = require('@manypkg/get-packages');

const workspace = getPackagesSync(`${__dirname}/../..`);

// Register Babel loader to transpile TS/TSX files
require('@babel/register').default({
    extensions: ['.ts', '.tsx', '.js'],
    extends: `${__dirname}/../../babel.config.json`,
    sourceType: 'unambiguous',
    presets: [
        ['@babel/env', { modules: 'commonjs' }],
    ],
    plugins: [
        ['babel-plugin-add-import-extension', false],
    ],
    only: [
        /**
         * Include workspace packages into Babel compilation,
         * even if they are resolved from `node_modules`.
         * @param {string} filepath
         */
        function(filepath) {
            const isNodeModules = filepath.match(/node_modules/);
            const isWorkspace = workspace.packages.some((pkg) => {
                return filepath.startsWith(pkg.dir) ||
                    filepath.includes(`/node_modules/${pkg.packageJson.name}/`);
            });

            return !isNodeModules || isWorkspace;
        },
    ],
});

require('tsconfig-paths').register();
require('tsconfig-paths').register({
    baseUrl: process.cwd(),
    paths: Object.fromEntries(
        workspace.packages.map((pkg) => {
            return [pkg.packageJson.name, [`${pkg.dir}/src`]];
        }),
    ),
});
