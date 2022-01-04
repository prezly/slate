/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../jsx';
import { createRichFormattingEditor } from '../test-utils';

describe('normalizeEmptyLink', () => {
    it('Removes link nodes without text', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-p>
                    <h-text>a</h-text>
                    <h-a href="https://example.com">
                        <h-text>
                            <anchor />a<focus />
                        </h-text>
                    </h-a>
                    <h-text>b</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>
                        a<cursor />b
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        // `Editor.deleteFragment` is equivalent to pressing Backspace or Delete key
        // when selection is expanded.
        Editor.deleteFragment(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
