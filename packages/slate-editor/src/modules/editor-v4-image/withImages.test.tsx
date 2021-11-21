/** @jsx jsx */

import { withNormalization } from '@prezly/slate-commons';
import { ImageLayout } from '@prezly/slate-types';
import type { UploadcareStoragePayload } from '@prezly/uploadcare';
import { createRef } from 'react';
import { Editor } from 'slate';
import { withReact } from 'slate-react';

import ImageExtension from './ImageExtension';
import jsx from './jsx';
import withImages from './withImages';

const file: UploadcareStoragePayload = {
    filename: 'lorem.jpg',
    mime_type: 'image/jpeg',
    size: 1234,
    uuid: 'dc8a477a-e3bf-465c-83f3-1790ef393513',
    version: 2,
};

const getExtensions = () => [
    ImageExtension({
        availableWidth: 0,
        captions: true,
        containerRef: createRef(),
        showLayoutControls: true,
    }),
];

const createEditor = (editor: JSX.Element): Editor =>
    withNormalization(getExtensions)(withImages(withReact((editor as unknown) as Editor)));

describe('withImages - normalizeChildren', () => {
    it('unwraps deeply nested text objects', () => {
        const editor = createEditor(
            <editor>
                <h-image
                    file={file}
                    href=""
                    layout={ImageLayout.CONTAINED}
                    width="100%"
                    width_factor="100%"
                >
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
                <h-image
                    file={file}
                    href=""
                    layout={ImageLayout.CONTAINED}
                    width="100%"
                    width_factor="100%"
                >
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-image>
            </editor>,
        );

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
