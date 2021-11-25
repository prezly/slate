module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    globals: {
        'ts-jest': {
            tsconfig: `${__dirname}/tsconfig.jest.json`,
        },
    },
    moduleNameMapper: {
        '\\.(scss|svg)$': '<rootDir>/../../universalMock',
    },
    preset: 'ts-jest',
    setupFiles: ['<rootDir>/../../setupTests.js', 'jest-canvas-mock'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(mjs|js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
    },
};
