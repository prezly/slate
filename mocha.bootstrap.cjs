const { expect } = require('expect');
const { toMatchSnapshot } = require('expect-mocha-snapshot');

// Attach sinon-provided assertions to expect()
const sinon = require('sinon');
// Expose `jest` expect() function globally
global.expect = (function extendExpect() {
    expect.extend({
        toBeCalled: toJestFormat((actual) => sinon.assert.called(actual)),
        toBeCalledOnce: toJestFormat((actual) => sinon.assert.calledOnce(actual)),
        toBeCalledTimes: toJestFormat((actual, times) => sinon.assert.callCount(actual, times)),
        toMatchSnapshot,
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

const WORKSPACE = [
    '@prezly/slate-types',
    '@prezly/slate-commons',
    '@prezly/slate-lists',
    '@prezly/slate-tables',
    '@prezly/slate-editor',
];

// Register Babel loader to transpile TS/TSX files
require('@babel/register').default({
    extensions: ['.ts', '.tsx'],
    extends: `${__dirname}/babel.config.json`,
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
            const isWorkspace = WORKSPACE.some((packageName) => filepath.includes(`/${packageName}/`));
            return !isNodeModules || isWorkspace;
        },
    ],
});

