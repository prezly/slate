/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';
import { createRichFormattingEditor } from '../test-utils';

describe('withResetRichFormattingOnBreak', () => {
    it('Inserts a new default paragraph when inserting a break inside a heading', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-h1>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-h1>
            </editor>,
        );

        const expected = (
            <editor>
                <h-h1>
                    <h-text>lorem ipsum</h-text>
                </h-h1>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new default paragraph when inserting a break inside a paragraph', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

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

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new list item when inserting a break inside a list item', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                lorem ipsum
                                <cursor />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const expected = (
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                <cursor />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new default paragraph when inserting a break while selecting a heading', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-h1>
                    <h-text>
                        lorem <anchor />
                        ipsum
                        <focus />
                    </h-text>
                </h-h1>
            </editor>,
        );

        const expected = (
            <editor>
                <h-h1>
                    <h-text>lorem </h-text>
                </h-h1>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
