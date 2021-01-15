import { DocumentNode } from '@prezly/slate-types';

import render from './render';

const documentNode: DocumentNode = {
    children: [],
    type: 'document',
    version: '0.50',
};

describe('render', () => {
    it('returns null', () => {
        expect(render(documentNode)).toBe(null);
    });
});
