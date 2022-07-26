/** @jsx jsx */

import { Alignment } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Quote', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:quote align={Alignment.LEFT}>
                    <h:text>Left</h:text>
                </h:quote>
                <h:quote align={Alignment.CENTER}>
                    <h:text>Center</h:text>
                </h:quote>
                <h:quote align={Alignment.RIGHT}>
                    <h:text>Right</h:text>
                </h:quote>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:quote align={Alignment.LEFT}>
                    <h:text>Left</h:text>
                </h:quote>
                <h:quote align={Alignment.CENTER}>
                    <h:text>Center</h:text>
                </h:quote>
                <h:quote align={Alignment.RIGHT}>
                    <h:text>Right</h:text>
                </h:quote>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should insert text node when there are no children', () => {
        const editor = (
            <editor>
                <h:quote align={Alignment.LEFT} />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:quote align={Alignment.LEFT}>
                    <h:text />
                </h:quote>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
