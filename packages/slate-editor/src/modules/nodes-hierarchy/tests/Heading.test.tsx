/** @jsx hyperscript */

import { Alignment } from '@prezly/slate-types';
import { Editor } from 'slate';

import { hyperscript } from '../../../hyperscript';

describe('nodes-hierarchy / Heading', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:h1 align={Alignment.LEFT}>
                    <h:text>First</h:text>
                </h:h1>
                <h:h2>
                    <h:text>Second</h:text>
                </h:h2>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:h1 align={Alignment.LEFT}>
                    <h:text>First</h:text>
                </h:h1>
                <h:h2>
                    <h:text>Second</h:text>
                </h:h2>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
