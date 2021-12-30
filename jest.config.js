export default {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: 'tsconfig.jest.json',
        },
    },
    moduleNameMapper: {
        '\\.(scss|svg)$': '<rootDir>/universalMock.js',
    },
    preset: 'ts-jest',
    setupFiles: ['<rootDir>/setupTests.js'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/', '<rootDir>/packages/slate-editor/'],
};
