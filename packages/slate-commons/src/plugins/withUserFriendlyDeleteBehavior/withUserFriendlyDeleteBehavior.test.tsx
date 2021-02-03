/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../../jsx';
import { createEditor as createCommonEditor } from '../../test-utils';

import withUserFriendlyDeleteBehavior from './withUserFriendlyDeleteBehavior';

export const createEditor = (input: JSX.Element) =>
    withUserFriendlyDeleteBehavior(createCommonEditor(input));

const simulateBackspace = (editor: Editor) => {
    Editor.deleteBackward(editor, { unit: 'character' });
};

const simulateDelete = (editor: Editor) => {
    Editor.deleteForward(editor, { unit: 'character' });
};

describe('withUserFriendlyDeleteBehavior', () => {
    it('should remove only the empty paragraph, not the void element before it', () => {
        const editor = createEditor(
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
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-void-element>
                    <h-text />
                    <cursor />
                </h-void-element>
            </editor>
        ) as unknown) as Editor;

        simulateBackspace(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove the void element, not the focused paragraph block', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-void-element>
                    <h-text />
                </h-void-element>
                <h-p>
                    <cursor />
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>
                        paragraph before
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        simulateBackspace(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should focus the paragraph after when using deleteForward (delete key)', () => {
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

        const expected = ((
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                        paragraph after
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        simulateDelete(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove the currently empty paragraph and focus the element after it when using deleteForward (delete key)', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
                <h-void-element>
                    <h-text />
                </h-void-element>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-void-element>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-void-element>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        simulateDelete(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
