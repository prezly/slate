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
        '@prezly/slate-tables': path.join(__dirname, '../slate-tables/src'),
        '@prezly/slate-lists': path.join(__dirname, '../slate-lists/src'),
        '@prezly/slate-types': path.join(__dirname, '../slate-types/src'),
        '@prezly/slate-commons': path.join(__dirname, '../slate-commons/src'),

        '#components': `${__dirname}/src/components`,
        '#extensions/(.*)': `${__dirname}/src/extensions/$1`,
        '#icons': `${__dirname}/src/icons`,
        '#lib': `${__dirname}/src/lib`,
        '#modules/(.*)': `${__dirname}/src/modules/$1`,
        '\\.(scss|svg)$': `${__dirname}/../../universalMock.js`,
    },
    preset: 'ts-jest',
    setupFiles: [`${__dirname}/../../mockRange.cjs`, 'jest-canvas-mock'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
