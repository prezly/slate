module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: `${__dirname}/tsconfig.jest.json`,
        },
    },
    moduleNameMapper: {
        '\\.(scss|svg)$': `${__dirname}/../../universalMock.js`,
    },
    preset: 'ts-jest',
    setupFiles: [`${__dirname}/../../mockGlobals.cjs`, 'jest-canvas-mock'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
