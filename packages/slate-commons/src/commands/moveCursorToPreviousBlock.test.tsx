/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { moveCursorToPreviousBlock } from './moveCursorToPreviousBlock';

describe('moveCursorToPreviousBlock', () => {
    it('Moves the cursor to the previous block', () => {
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
                    <cursor />
                </h:paragraph>
                <h:paragraph>
                    <h:text>second block</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        moveCursorToPreviousBlock(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves the cursor to the start of document if at the first block', () => {
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
                    <h:text>
                        <cursor />
                        lorem ipsum
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>second block</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        moveCursorToPreviousBlock(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
