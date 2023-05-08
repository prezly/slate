module.exports = {
    'extension': ['ts', 'tsx'],
    'require': [
        `${__dirname}/mocha.bootstrap.cjs`, // bootstrap mocha environment
        'ignore-styles', // ignore non-code imports (.css, .scss, .svg, etc)
        'global-jsdom/register', // mock JSDom
        'tsconfig-paths/register', // support TS import path mapping
    ],
    'globals': [
        'global',
    ],
};
