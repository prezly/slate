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

