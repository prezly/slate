/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../jsx';

describe('normalizeEmptyLink', () => {
    it('Removes link nodes without text', () => {
        const editor = (
            <editor>
                <paragraph>
                    <text>a</text>
                    <link href="https://example.com">
                        <text>
                            <anchor />a<focus />
                        </text>
                    </link>
                    <text>b</text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <paragraph>
                    <text>
                        a<cursor />b
                    </text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        // `Editor.deleteFragment` is equivalent to pressing Backspace or Delete key
        // when selection is expanded.
        Editor.deleteFragment(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
