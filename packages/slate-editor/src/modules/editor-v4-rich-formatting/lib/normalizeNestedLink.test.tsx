/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../jsx';
import { createRichFormattingEditor } from '../test-utils';

describe('normalizeNestedLink', () => {
    it('Unwraps nested links', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-p>
                    <h-a href="https://example.com/1">
                        <h-text>lorem</h-text>
                        <h-a href="https://example.com/2">
                            <h-text>ipsum</h-text>
                        </h-a>
                        <h-text>dolor</h-text>
                    </h-a>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text />
                    <h-a href="https://example.com/1">
                        <h-text>lorem</h-text>
                    </h-a>
                    <h-text />
                    <h-a href="https://example.com/2">
                        <h-text>ipsum</h-text>
                    </h-a>
                    <h-text />
                    <h-a href="https://example.com/1">
                        <h-text>dolor</h-text>
                    </h-a>
                    <h-text />
                </h-p>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
