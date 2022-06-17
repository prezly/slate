/** @jsx jsx */

import { Alignment } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Paragraph', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:paragraph align={Alignment.LEFT}>
                    <h-text>Left</h-text>
                </h:paragraph>
                <h:paragraph align={Alignment.CENTER}>
                    <h-text>Center</h-text>
                </h:paragraph>
                <h:paragraph align={Alignment.RIGHT}>
                    <h-text>Right</h-text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph align={Alignment.LEFT}>
                    <h-text>Left</h-text>
                </h:paragraph>
                <h:paragraph align={Alignment.CENTER}>
                    <h-text>Center</h-text>
                </h:paragraph>
                <h:paragraph align={Alignment.RIGHT}>
                    <h-text>Right</h-text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
