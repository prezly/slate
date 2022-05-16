/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../jsx';

import { removeChildren } from './removeChildren';

describe('removeChildren', () => {
    it('Removes children from any given element leaving just an empty Text node', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>aaa</h-text>
                    <h-link href="https://example.com">
                        <h-text>this text has no right being here</h-text>
                    </h-link>
                    <h-text>bbb</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>aaa</h-text>
                    <h-link href="https://example.com">
                        <h-text />
                    </h-link>
                    <h-text>bbb</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        removeChildren(editor, Editor.node(editor, [0, 1]));

        expect(editor.children).toEqual(expected.children);
    });
});
