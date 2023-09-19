/** @jsx hyperscript */

import { withExtensions } from '@prezly/slate-commons';
import { ImageLayout } from '@prezly/slate-types';
import type { UploadedFile } from '@prezly/uploadcare';
import { Editor } from 'slate';
import { withReact } from 'slate-react';

import { hyperscript } from './hyperscript';
import { ImageExtension } from './ImageExtension';
import { withImages } from './withImages';

const file: UploadedFile = {
    filename: 'lorem.jpg',
    mime_type: 'image/jpeg',
    size: 1234,
    uuid: 'dc8a477a-e3bf-465c-83f3-1790ef393513',
    version: 2,
};

const getExtensions = () => [
    ImageExtension({
        withCaptions: true,
        withLayoutOptions: true,
    }),
];

const createEditor = (editor: JSX.Element): Editor => {
    // FIXME: Enable ImageExtension for the test
    console.log(getExtensions()); // FIXME: Remove this
    return withExtensions(withImages(withReact(editor as unknown as Editor)));
};

describe('ImageExtension - normalizeChildren', () => {
    it('unwraps deeply nested text objects', () => {
        const editor = createEditor(
            <editor>
                <h-image file={file} href="" layout={ImageLayout.CONTAINED} width="100%">
                    <fragment>
                        <fragment>
                            <h-text />
                        </fragment>
                        <fragment>
                            <h-text />
                        </fragment>
                    </fragment>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-image>
            </editor>,
        );

        const expected = createEditor(
            <editor>
                <h-image file={file} href="" layout={ImageLayout.CONTAINED} width="100%">
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-image>
            </editor>,
        );

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
