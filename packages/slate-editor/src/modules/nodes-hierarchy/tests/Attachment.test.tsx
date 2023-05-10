/** @jsx hyperscript */

import { Editor } from 'slate';

import { hyperscript } from '../../../hyperscript';

describe('nodes-hierarchy / Attachment', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:attachment
                    description="one"
                    file={{
                        filename: 'example.pdf',
                        mime_type: 'application/pdf',
                        size: 1234,
                        uuid: 'dc8a477a-e3bf-465c-83f3-1790ef393513',
                        version: 2,
                    }}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:attachment
                    description="one"
                    file={{
                        filename: 'example.pdf',
                        mime_type: 'application/pdf',
                        size: 1234,
                        uuid: 'dc8a477a-e3bf-465c-83f3-1790ef393513',
                        version: 2,
                    }}
                />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
