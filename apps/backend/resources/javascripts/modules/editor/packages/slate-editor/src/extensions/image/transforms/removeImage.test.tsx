/** @jsx hyperscript */

import { ImageLayout } from '@prezly/slate-types';
import type { UploadedImage } from '@prezly/uploadcare';
import type { Editor } from 'slate';
import { withReact } from 'slate-react';

import { hyperscript } from '../hyperscript';

import { removeImage } from './removeImage';

const createEditor = (editor: JSX.Element): Editor => withReact(editor as unknown as Editor);

const createImageFile = (): UploadedImage => ({
    effects: [],
    filename: 'Screenshot (46).png',
    mime_type: 'image/png',
    original_height: 1080,
    original_width: 1920,
    size: 152137,
    uuid: '8702f0ce-5a92-406a-b882-8825be108509',
    version: 2,
});

describe('removeImage', () => {
    it('should remove currently focused image and focus the adjacent paragraph', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-image
                    file={createImageFile()}
                    href=""
                    layout={ImageLayout.CONTAINED}
                    width="100%"
                >
                    <h-text>
                        <cursor />
                    </h-text>
                </h-image>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                        paragraph after
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        removeImage(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should do nothing when not focusing an image node', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                    <cursor />
                </h-p>
                <h-image
                    file={createImageFile()}
                    href=""
                    layout={ImageLayout.CONTAINED}
                    width="100%"
                >
                    <h-text />
                </h-image>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                    <cursor />
                </h-p>
                <h-image
                    file={createImageFile()}
                    href=""
                    layout={ImageLayout.CONTAINED}
                    width="100%"
                >
                    <h-text />
                </h-image>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        removeImage(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
