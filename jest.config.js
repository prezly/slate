module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
    moduleNameMapper: {
        '\\.(scss|svg)$': '<rootDir>/universalMock',
    },
    preset: 'ts-jest',
    setupFiles: ['<rootDir>/setupTests.js'],
    // testEnvironment: 'node',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/examples/'],
};
