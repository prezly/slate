module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.jest.json',
        },
    },
    "moduleNameMapper": {
        '\\.(scss|svg)$': '<rootDir>/../../universalMock',
        "^components$": "<rootDir>/src/components",
        "^lib$": "<rootDir>/src/lib",
        "^lib/(.*)$": "<rootDir>/src/lib/$1",
        "^icons$": "<rootDir>/src/icons",
        "^modules/(.*)$": "<rootDir>/src/modules/$1",
        "^types$": "<rootDir>/src/types"
    },
    preset: 'ts-jest',
    setupFiles: ['<rootDir>/../../setupTests.js'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/build/',
        '/src/modules/(?!editor-v4-image/withImages.test.tsx)'
    ]
};
