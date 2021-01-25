import {
    DIVIDER_NODE_TYPE,
    DOCUMENT_NODE_TYPE,
    DocumentNode,
    HEADING_1_NODE_TYPE,
} from '@prezly/slate-types';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Render from './Render';

const documentNode: DocumentNode = {
    children: [
        {
            children: [{ text: 'Hello world!' }],
            type: HEADING_1_NODE_TYPE,
        },
        {
            children: [{ text: '' }],
            type: DIVIDER_NODE_TYPE,
        },
    ],
    type: DOCUMENT_NODE_TYPE,
    version: '0.50',
};

describe('render', () => {
    it('Renders a <h1> for a heading and a <section> for a divider', () => {
        const asString = renderToString(<Render nodes={documentNode} />);

        expect(asString).toContain('<h1');
        expect(asString).toContain('<section');
    });
});
