/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../jsx';

import { withBreaksOnVoidNodes } from './withBreaksOnVoidNodes';

describe('withBreaksOnVoidNodes', () => {
    it('should insert an empty paragraph after the void element when requesting a break', () => {
        const editor = (
            <editor withOverrides={[withBreaksOnVoidNodes]}>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-divider>
                    <h-text />
                    <cursor />
                </h-divider>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-divider>
                    <h-text />
                </h-divider>
                <h-p>
                    <h-text />
                    <cursor />
                </h-p>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
