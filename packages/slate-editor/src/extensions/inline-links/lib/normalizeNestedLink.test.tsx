/** @jsx hyperscript */

import { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

describe('normalizeNestedLink', () => {
    it('Unwraps nested links', () => {
        const editor = (
            <editor>
                <paragraph>
                    <link href="https://example.com/1">
                        <text>lorem</text>
                        <link href="https://example.com/2">
                            <text>ipsum</text>
                        </link>
                        <text>dolor</text>
                    </link>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <paragraph>
                    <text />
                    <link href="https://example.com/1">
                        <text>lorem</text>
                    </link>
                    <text />
                    <link href="https://example.com/2">
                        <text>ipsum</text>
                    </link>
                    <text />
                    <link href="https://example.com/1">
                        <text>dolor</text>
                    </link>
                    <text />
                </paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
