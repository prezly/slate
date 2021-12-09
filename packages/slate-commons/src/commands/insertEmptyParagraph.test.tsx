/** @jsx jsx */

import type { Editor } from 'slate';

import jsx from '../jsx';

import insertEmptyParagraph from './insertEmptyParagraph';

describe('insertEmptyParagraph', () => {
    it('should insert an empty paragraph after the cursor', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertEmptyParagraph(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should insert an empty paragraph at the cursor, splitting the text in the block', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem
                        <cursor />
                        ipsum
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertEmptyParagraph(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    /**
     * createHandleEditImage() relies on this behavior.
     * @see createHandleEditImage()
     */
    it('should insert an empty paragraph after the current one, if the cursor is at the end', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertEmptyParagraph(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    /**
     * createHandleEditImage() relies on this behavior.
     * @see createHandleEditImage()
     */
    it('should insert an empty paragraph before the current one, if the cursor is at the beginning', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                        dolor
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertEmptyParagraph(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should insert an empty paragraph at a given location', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>first block</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        second block
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>first block</h-text>
                </h-p>
                <h-p>
                    <h-text />
                </h-p>
                <h-p>
                    <h-text>
                        second block
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertEmptyParagraph(editor, [1]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
