/** @jsx hyperscript */

import type { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import { insertEmptyParagraph } from './insertEmptyParagraph';

describe('insertEmptyParagraph', () => {
    it('should insert an empty paragraph after the cursor', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        lorem ipsum
                        <cursor />
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
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        insertEmptyParagraph(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should insert an empty paragraph at the cursor, splitting the text in the block', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        lorem
                        <cursor />
                        ipsum
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>lorem</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        <cursor />
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>ipsum</h:text>
                </h:paragraph>
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
                <h:paragraph>
                    <h:text>
                        lorem ipsum
                        <cursor />
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>dolor</h:text>
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
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>dolor</h:text>
                </h:paragraph>
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
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        dolor
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
                        <cursor />
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>dolor</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        insertEmptyParagraph(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should insert an empty paragraph at a given location', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>first block</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        second block
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>first block</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text />
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        second block
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        insertEmptyParagraph(editor, { at: [1] });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
