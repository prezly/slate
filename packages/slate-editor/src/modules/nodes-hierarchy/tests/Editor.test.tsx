/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Editor', () => {
    it('should insert paragraph in empty editor', () => {
        const editor = (<editor />) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
