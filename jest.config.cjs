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
        '\\.(scss|svg)$': `${__dirname}/universalMock.js`,
    },
    preset: 'ts-jest',
    setupFiles: [`${__dirname}/setupTests.js`],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/', `${__dirname}/packages/slate-editor/`],
};
