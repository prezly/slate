/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes hierarchy - orphan text leaves', () => {
    it('should wraps sibling orphan text nodes into a single paragraph', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:text bold>dolor</h:text>
                <h:text>sit</h:text>
                <h:text bold>amet</h:text>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text bold>dolor</h:text>
                    <h:text>sit</h:text>
                    <h:text bold>amet</h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
