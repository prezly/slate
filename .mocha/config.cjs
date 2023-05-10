module.exports = {
    'extension': ['ts', 'tsx'],
    'require': [
        `${__dirname}/bootstrap.cjs`, // bootstrap mocha environment
        'ignore-styles', // ignore non-code imports (.css, .scss, .svg, etc)
        'global-jsdom/register', // mock JSDom
        'mocha-expect-snapshot', // toMatchSnapshot
    ],
    'globals': [
        'global',
    ],
};
