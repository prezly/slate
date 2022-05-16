/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { isNodeEmpty } from './isNodeEmpty';

describe('isNodeEmpty', () => {
    const editor = (
        <editor>
            <h:paragraph>
                <h:text>lorem ipsum</h:text>
            </h:paragraph>
            <h:paragraph>
                <h:text />
            </h:paragraph>
            <h:paragraph>
                <h:text> </h:text>
            </h:paragraph>
            <h:text> </h:text>
            <h:paragraph>
                <h:divider />
            </h:paragraph>
        </editor>
    ) as unknown as Editor;

    it('Considers paragraph node with text node with text to not be empty', () => {
        expect(isNodeEmpty(editor, editor.children[0])).toBe(false);
    });

    it('Considers paragraph node with empty text node to be empty', () => {
        expect(isNodeEmpty(editor, editor.children[1])).toBe(true);
    });

    it('Considers paragraph node with text node with whitespace to not be empty', () => {
        expect(isNodeEmpty(editor, editor.children[2])).toBe(false);
    });

    it('Considers paragraph node with text node with whitespace to be empty, when trim is enabled', () => {
        expect(isNodeEmpty(editor, editor.children[2], true)).toBe(true);
    });

    it('Considers text node with whitespace to not be empty', () => {
        expect(isNodeEmpty(editor, editor.children[3])).toBe(false);
    });

    it('Considers paragraphs with void elements to not be empty', () => {
        expect(isNodeEmpty(editor, editor.children[4])).toBe(false);
    });
});
