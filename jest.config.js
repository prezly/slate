module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/examples/'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
};
