/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { isEmptyParagraphElement } from './isEmptyParagraphElement';

describe('isNodeEmpty', () => {
    const editor = (
        <editor>
            <h-p>
                <h-text>lorem ipsum</h-text>
            </h-p>
            <h-p>
                <h-text />
            </h-p>
            <h-p>
                <h-text></h-text>
            </h-p>
            <h-p></h-p>
        </editor>
    ) as unknown as Editor;

    it('Considers paragraph node with text node with text to not be empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[0])).toBe(false);
    });

    it('Considers paragraph node with empty text node to be empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[1])).toBe(true);
    });

    it('Considers paragraph node with text node with whitespace to not be empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[2])).toBe(false);
    });

    it('Considers text node with whitespace to not be empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[3])).toBe(false);
    });

    it('Considers paragraph node with whitespace only to be empty when whitespace is ignored', () => {
        expect(isEmptyParagraphElement(editor, editor.children[2], { trim: true })).toBe(true);
    });

    it('Considers text node with whitespace only to be empty when whitespace is ignored', () => {
        expect(isEmptyParagraphElement(editor, editor.children[3], { trim: true })).toBe(true);
    });
});
