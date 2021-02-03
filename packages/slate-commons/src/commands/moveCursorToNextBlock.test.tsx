/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';

import moveCursorToNextBlock from './moveCursorToNextBlock';

describe('moveCursorToNextBlock', () => {
    it('Moves the cursor to the next block', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
                <h-p>
                    <h-text>second block</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
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
        ) as unknown) as Editor;

        moveCursorToNextBlock(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves the cursor to the end of document if at the last block', () => {
        const editor = ((
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
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        second block
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        moveCursorToNextBlock(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
