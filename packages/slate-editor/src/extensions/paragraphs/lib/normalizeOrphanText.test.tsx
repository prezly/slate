/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../jsx';
import { createParagraphsEditor } from '../test-utils';

describe('normalizeOrphanText', () => {
    it('Wraps sibling orphan text nodes into a single paragraph', () => {
        const editor = createParagraphsEditor(
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-text bold>dolor</h-text>
                <h-text>sit</h-text>
                <h-text bold>amet</h-text>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text bold>dolor</h-text>
                    <h-text>sit</h-text>
                    <h-text bold>amet</h-text>
                </h-p>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
