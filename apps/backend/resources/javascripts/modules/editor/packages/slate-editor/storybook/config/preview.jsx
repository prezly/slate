import React from 'react';

import '../../build/styles/styles.css';
import './preview.css';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [(Story) => <Story />];
