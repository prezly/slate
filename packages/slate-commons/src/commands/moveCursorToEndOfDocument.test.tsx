/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { moveCursorToEndOfDocument } from './moveCursorToEndOfDocument';

describe('moveCursorToEndOfDocument', () => {
    it('Puts cursor at the end of document when there is no cursor', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown as Editor;

        moveCursorToEndOfDocument(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves cursor at the end of document', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown as Editor;

        moveCursorToEndOfDocument(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Puts cursor at the end of document when there is selection', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <anchor />
                    <h-text>lorem ipsum</h-text>
                    <focus />
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-text>lorem ipsum</h-text>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown as Editor;

        moveCursorToEndOfDocument(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Does nothing when cursor is already at the end of document', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown as Editor;

        moveCursorToEndOfDocument(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
