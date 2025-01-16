/** @jsx hyperscript */

import { Editor } from 'slate';

import { hyperscript } from '../../../hyperscript';

describe('nodes-hierarchy / Divider', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:divider />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:divider />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
