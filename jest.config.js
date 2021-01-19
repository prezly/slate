module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
    moduleNameMapper: {
        '\\.scss$': '<rootDir>/styleMock',
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/examples/'],
};
