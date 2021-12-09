/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../../jsx';
import { createEditor as createCommonEditor } from '../../test-utils';

import withBreaksOnVoidNodes from './withBreaksOnVoidNodes';

export const createEditor = (input: JSX.Element) =>
    withBreaksOnVoidNodes(createCommonEditor(input));

describe('withBreaksOnVoidNodes', () => {
    it('should insert an empty paragraph after the void element when requesting a break', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-void-element>
                    <h-text />
                    <cursor />
                </h-void-element>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-void-element>
                    <h-text />
                </h-void-element>
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
