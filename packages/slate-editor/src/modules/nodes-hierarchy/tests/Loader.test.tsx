/** @jsx jsx */

import { Editor } from 'slate';

import { LoaderContentType } from '#extensions/loader';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Loader', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:loader
                    contentType={LoaderContentType.IMAGE}
                    id="23c253d5-5a72-4033-a877-8db73775cab0"
                    message="Uploading Image"
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:loader
                    contentType={LoaderContentType.IMAGE}
                    id="23c253d5-5a72-4033-a877-8db73775cab0"
                    message="Uploading Image"
                />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
