/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';

import insertEmptyParagraph from './insertEmptyParagraph';

describe('insertEmptyParagraph', () => {
    it('Inserts an empty paragraph after the cursor', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text />
                    <cursor />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertEmptyParagraph(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts an empty paragraph at the cursor, splitting the text in the block', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>lorem</h-text>
                    <cursor />
                    <h-text>ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem</h-text>
                </h-p>
                <h-p>
                    <h-text />
                    <cursor />
                </h-p>
                <h-p>
                    <h-text>ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertEmptyParagraph(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts an empty paragraph at a given location', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>first block</h-text>
                </h-p>
                <h-p>
                    <h-text>second block</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <h-p>
                    <h-text>first block</h-text>
                </h-p>
                <h-p>
                    <h-text />
                </h-p>
                <h-p>
                    <h-text>second block</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertEmptyParagraph(editor, [1]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
