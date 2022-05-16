/** @jsx jsx */

import { Editor } from 'slate';

import { createHyperscript } from '../../jsx';

import { withUserFriendlyDeleteBehavior } from './withUserFriendlyDeleteBehavior';

const jsx = createHyperscript({
    withOverrides: [withUserFriendlyDeleteBehavior],
});

function simulateBackspace(editor: Editor) {
    return Editor.deleteBackward(editor, { unit: 'character' });
}

function simulateDelete(editor: Editor) {
    return Editor.deleteForward(editor, { unit: 'character' });
}

describe('withUserFriendlyDeleteBehavior', () => {
    it('should remove only the empty paragraph, not the void element before it', () => {
        const editor = (
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
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-void-element>
                    <h-text />
                    <cursor />
                </h-void-element>
            </editor>
        ) as unknown as Editor;

        simulateBackspace(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove the void element, not the focused paragraph block', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-void-element>
                    <h-text />
                </h-void-element>
                <h-p>
                    <h-text>
                        <cursor />
                        paragraph after
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
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
        ) as unknown as Editor;

        simulateBackspace(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should focus the paragraph after when using deleteForward (delete key)', () => {
        const editor = (
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
            </editor>
        ) as unknown as Editor;

        const expected = (
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
        ) as unknown as Editor;

        simulateDelete(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove the currently empty paragraph and focus the element after it when using deleteForward (delete key)', () => {
        const editor = (
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
            </editor>
        ) as unknown as Editor;

        const expected = (
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
        ) as unknown as Editor;

        simulateDelete(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should have a block above and removing by backspace a node below should move the focus upper', () => {
        const editor = (
            <editor>
                <h-some-element-1>1</h-some-element-1>
                <h-p>
                    <h-text />
                    <cursor />
                </h-p>
                <h-p>
                    <h-text>3</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-some-element-1>
                    1<cursor />
                </h-some-element-1>
                <h-p>
                    <h-text>3</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        simulateBackspace(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
