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
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/', '<rootDir>/packages/examples/'],
    projects: ['<rootDir>', '<rootDir>/packages/slate-editor'],
};
