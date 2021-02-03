/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';

import isNodeEmpty from './isNodeEmpty';

describe('isNodeEmpty', () => {
    const editor = ((
        <editor>
            <h-p>
                <h-text>lorem ipsum</h-text>
            </h-p>
            <h-p>
                <h-text />
            </h-p>
            <h-p>
                <h-text> </h-text>
            </h-p>
            <h-text> </h-text>
        </editor>
    ) as unknown) as Editor;

    it('Considers paragraph node with text node with text to not be empty', () => {
        expect(isNodeEmpty(editor, editor.children[0])).toBe(false);
    });

    it('Considers paragraph node with empty text node to be empty', () => {
        expect(isNodeEmpty(editor, editor.children[1])).toBe(true);
    });

    it('Considers paragraph node with text node with whitespace to not be empty', () => {
        expect(isNodeEmpty(editor, editor.children[2])).toBe(false);
    });

    it('Considers text node with whitespace to not be empty', () => {
        expect(isNodeEmpty(editor, editor.children[3])).toBe(false);
    });
});
