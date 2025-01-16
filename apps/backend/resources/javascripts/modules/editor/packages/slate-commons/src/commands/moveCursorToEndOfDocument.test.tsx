/** @jsx hyperscript */

import type { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import { moveCursorToEndOfDocument } from './moveCursorToEndOfDocument';

describe('moveCursorToEndOfDocument', () => {
    it('Puts cursor at the end of document when there is no cursor', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        moveCursorToEndOfDocument(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves cursor at the end of document', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        moveCursorToEndOfDocument(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Puts cursor at the end of document when there is selection', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <anchor />
                    <h:text>lorem ipsum</h:text>
                    <focus />
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <h:text>lorem ipsum</h:text>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        moveCursorToEndOfDocument(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Does nothing when cursor is already at the end of document', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        moveCursorToEndOfDocument(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
