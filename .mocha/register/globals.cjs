const { expect } = require('expect');

const { assert } = require('sinon');

// Expose `jest` expect() function globally
global.expect = (function extendExpect() {

    // Attach sinon-provided assertions to expect()
    expect.extend({
        toBeCalled: toJestFormat((actual) => assert.called(actual)),
        toBeCalledOnce: toJestFormat((actual) => assert.calledOnce(actual)),
        toBeCalledTimes: toJestFormat((actual, times) => assert.callCount(actual, times)),
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
