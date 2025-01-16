/** @jsx hyperscript */

import type { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import { moveCursorToNextBlock } from './moveCursorToNextBlock';

describe('moveCursorToNextBlock', () => {
    it('Moves the cursor to the next block', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
                <h:paragraph>
                    <h:text>second block</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        second block
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        moveCursorToNextBlock(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves the cursor to the end of document if at the last block', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        second block
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        second block
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        moveCursorToNextBlock(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
