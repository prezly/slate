/** @jsx jsx */

import { Alignment } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Heading', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:h1 align={Alignment.LEFT}>First</h:h1>
                <h:h2>Second</h:h2>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:h1 align={Alignment.LEFT}>First</h:h1>
                <h:h2>Second</h:h2>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
