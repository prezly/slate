module.exports = {
    'extension': ['ts', 'tsx'],
    'require': [
        `${__dirname}/register/globals.cjs`, // bootstrap mocha environment
        `${__dirname}/register/babel.cjs`, // bootstrap mocha environment
        `${__dirname}/register/tsconfig-paths.cjs`, // bootstrap mocha environment
        'ignore-styles', // ignore non-code imports (.css, .scss, .svg, etc)
        'global-jsdom/register', // mock JSDom
        'mocha-expect-snapshot', // toMatchSnapshot
    ],
    'globals': [
        'global',
    ],
};
