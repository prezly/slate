/** @jsx jsx */

import { Editor } from 'slate';

import { PARAGRAPH_TYPE } from '../constants';
import jsx from '../jsx';

import getCurrentNodeEntry from './getCurrentNodeEntry';

const OTHER_TYPE = 'other-type';

describe('getCurrentNodeEntry', () => {
    it('Returns "null" when editor has no cursor in it', () => {
        const editor = ((
            <editor>
                <element type={OTHER_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <element type={OTHER_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
            </editor>
        ) as unknown) as Editor;

        const currentNodeEntry = getCurrentNodeEntry(editor);
        expect(currentNodeEntry).toBeNull();
    });

    it('Returns the node and path tuple where cursor is placed in', () => {
        const editor = ((
            <editor>
                <element type={OTHER_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
                <element type={OTHER_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
            </editor>
        ) as unknown) as Editor;

        const nodeEntry = getCurrentNodeEntry(editor);

        expect(nodeEntry).not.toBe(null);

        if (!nodeEntry) {
            throw new Error('"nodeEntry" is not expected to be null');
        }

        const [currentNode, currentPath] = nodeEntry;

        expect(currentNode).toEqual({
            children: [{ text: 'lorem ipsum' }],
            type: PARAGRAPH_TYPE,
        });
        expect(currentPath).toEqual([1]);
    });
});
