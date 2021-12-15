/** @jsx jsx */

import type { Editor } from 'slate';

import jsx from '../jsx';

import moveCursorToPreviousBlock from './moveCursorToPreviousBlock';

describe('moveCursorToPreviousBlock', () => {
    it('Moves the cursor to the previous block', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                        second block
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
                <h-p>
                    <h-text>second block</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        moveCursorToPreviousBlock(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves the cursor to the start of document if at the first block', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
                <h-p>
                    <h-text>second block</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                        lorem ipsum
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>second block</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        moveCursorToPreviousBlock(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
