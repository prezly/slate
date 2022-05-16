/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { isEmptyParagraphElement } from './isEmptyParagraphElement';

describe('isEmptyParagraphElement', () => {
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
            <h:paragraph></h:paragraph>
            <h:paragraph>
                <h:divider />
            </h:paragraph>
        </editor>
    ) as unknown as Editor;

    it('Considers paragraph with non-empty text to not be empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[0])).toBe(false);
    });

    it('Considers paragraph node with empty text node to be empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[1])).toBe(true);
    });

    it('Considers paragraph node with whitespace to not be empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[2])).toBe(false);
    });

    it('Considers paragraph without text nodes to be empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[3])).toBe(true);
    });

    it('Considers paragraph with non-empty text to not be empty even if whitespace is ignored', () => {
        expect(isEmptyParagraphElement(editor, editor.children[0], { trim: true })).toBe(false);
    });

    it('Considers paragraph with whitespace only to be empty when whitespace is ignored', () => {
        expect(isEmptyParagraphElement(editor, editor.children[2], { trim: true })).toBe(true);
    });

    it('Considers paragraph without text nodes to be empty when whitespace is ignored', () => {
        expect(isEmptyParagraphElement(editor, editor.children[3], { trim: true })).toBe(true);
    });

    it('Considers paragraph with void elements as non-empty', () => {
        expect(isEmptyParagraphElement(editor, editor.children[4], { trim: true })).toBe(false);
    });
});
