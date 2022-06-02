/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../jsx';

describe.skip('withResetRichFormattingOnBreak', () => {
    it('Inserts a new default paragraph when inserting a break inside a heading', () => {
        const editor = (
            <editor>
                <h1>
                    <text>
                        lorem ipsum
                        <cursor />
                    </text>
                </h1>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h1>
                    <text>lorem ipsum</text>
                </h1>
                <paragraph>
                    <text>
                        <cursor />
                    </text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new default paragraph when inserting a break inside a paragraph', () => {
        const editor = (
            <editor>
                <paragraph>
                    <text>
                        lorem ipsum
                        <cursor />
                    </text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <paragraph>
                    <text>lorem ipsum</text>
                </paragraph>
                <paragraph>
                    <text>
                        <cursor />
                    </text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new list item when inserting a break inside a list item', () => {
        const editor = (
            <editor>
                <ul>
                    <li>
                        <li-text>
                            <text>
                                lorem ipsum
                                <cursor />
                            </text>
                        </li-text>
                    </li>
                </ul>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <ul>
                    <li>
                        <li-text>
                            <text>lorem ipsum</text>
                        </li-text>
                    </li>
                    <li>
                        <li-text>
                            <text>
                                <cursor />
                            </text>
                        </li-text>
                    </li>
                </ul>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new default paragraph when inserting a break while selecting a heading', () => {
        const editor = (
            <editor>
                <h1>
                    <text>
                        lorem <anchor />
                        ipsum
                        <focus />
                    </text>
                </h1>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h1>
                    <text>lorem </text>
                </h1>
                <paragraph>
                    <text>
                        <cursor />
                    </text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
