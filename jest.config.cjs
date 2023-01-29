const path = require('path');

module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
            isolatedModules: true,
            tsconfig: `${__dirname}/tsconfig.jest.json`,
        },
    },
    moduleNameMapper: {
        '@prezly/slate-tables': path.join(__dirname, '/packages/slate-tables/src'),
        '@prezly/slate-lists': path.join(__dirname, '/packages/slate-lists/src'),
        '@prezly/slate-types': path.join(__dirname, '/packages/slate-types/src'),
        '@prezly/slate-commons': path.join(__dirname, '/packages/slate-commons/src'),
        '\\.(scss|svg)$': `${__dirname}/universalMock.js`,
    },
    preset: 'ts-jest',
    setupFiles: [`${__dirname}/mockRange.cjs`],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/', `${__dirname}/packages/slate-editor/`],
};
