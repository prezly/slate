/** @jsx jsx */

import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';

describe('getCurrentNodeEntry', () => {
    it('Returns "null" when editor has no cursor in it', () => {
        const editor = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
            </editor>
        ) as unknown as Editor;

        const currentNodeEntry = getCurrentNodeEntry(editor);
        expect(currentNodeEntry).toBeNull();
    });

    it('Returns the node and path tuple where cursor is placed in', () => {
        const editor = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
            </editor>
        ) as unknown as Editor;

        const nodeEntry = getCurrentNodeEntry(editor);

        expect(nodeEntry).not.toBe(null);

        if (!nodeEntry) {
            throw new Error('"nodeEntry" is not expected to be null');
        }

        const [currentNode, currentPath] = nodeEntry;

        expect(currentNode).toEqual({
            children: [{ text: 'lorem ipsum' }],
            type: PARAGRAPH_NODE_TYPE,
        });
        expect(currentPath).toEqual([1]);
    });
});
