const { readFileSync, existsSync } = require('fs');
const JSON5 = require('json5');
const path = require('path');
const { expect } = require('expect');
const { getPackagesSync } = require('@manypkg/get-packages');

// Attach sinon-provided assertions to expect()
const sinon = require('sinon');
// Expose `jest` expect() function globally
global.expect = (function extendExpect() {
    expect.extend({
        toBeCalled: toJestFormat((actual) => sinon.assert.called(actual)),
        toBeCalledOnce: toJestFormat((actual) => sinon.assert.calledOnce(actual)),
        toBeCalledTimes: toJestFormat((actual, times) => sinon.assert.callCount(actual, times)),
    });

    return expect;

    function toJestFormat(callback) {
        return function(...args) {
            try {
                callback(...args);
            } catch (error) {
                return { pass: false, message: error.message };
            }
            return { pass: true };
        };
    }
})();

const workspace = getPackagesSync(`${__dirname}/..`);

// Register Babel loader to transpile TS/TSX files
require('@babel/register').default({
    extensions: ['.ts', '.tsx', '.js'],
    extends: `${__dirname}/../babel.config.json`,
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

(function registerTsPaths() {
    const workspacePaths = Object.fromEntries(
        workspace.packages.map((pkg) => {
            return [pkg.packageJson.name, [`${pkg.dir}/src`]];
        }),
    );

    const pkg = workspace.packages.find((pkg) => process.cwd() === pkg.dir);

    const packageTsConfig = existsSync(`${pkg.dir}/tsconfig.json`) ?
        JSON5.parse(readFileSync(`${pkg.dir}/tsconfig.json`, { encoding: 'utf-8' })) :
        undefined;

    const packageLocalPaths = packageTsConfig?.compilerOptions?.paths ?? {};
    const packageBaseUrl = packageTsConfig?.compilerOptions?.baseUrl ?? './';

    const packagePaths = Object.fromEntries(
        Object.entries(packageLocalPaths).map(([alias, paths]) => {
            return [
                alias,
                paths.map((dir) => path.join(pkg.dir, packageBaseUrl, dir)),
            ]
        }),
    );

    require('tsconfig-paths').register({
        baseUrl: './',
        paths: {
            ...packagePaths,
            ...workspacePaths,
        },
    });
})();

