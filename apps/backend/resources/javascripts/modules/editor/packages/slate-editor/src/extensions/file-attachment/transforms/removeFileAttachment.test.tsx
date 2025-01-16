/** @jsx hyperscript */

import type { UploadedFile } from '@prezly/uploadcare';
import type { Editor } from 'slate';
import { withReact } from 'slate-react';

import { hyperscript } from '../hyperscript';

import { removeFileAttachment } from './removeFileAttachment';

const createEditor = (editor: JSX.Element): Editor => withReact(editor as unknown as Editor);

const createFileAttachmentFile = (): UploadedFile => ({
    filename: 'example.pdf',
    mime_type: 'application/pdf',
    size: 1234,
    uuid: 'dc8a477a-e3bf-465c-83f3-1790ef393513',
    version: 2,
});

describe('removeFileAttachment', () => {
    it('should remove currently focused file attachment and focus the paragraph before it', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-file-attachment description="" file={createFileAttachmentFile()}>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-file-attachment>
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

        removeFileAttachment(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should do nothing when not focusing a file attachment node', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        paragraph before
                        <cursor />
                    </h-text>
                </h-p>
                <h-file-attachment description="" file={createFileAttachmentFile()}>
                    <h-text />
                </h-file-attachment>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>
                        paragraph before
                        <cursor />
                    </h-text>
                </h-p>
                <h-file-attachment description="" file={createFileAttachmentFile()}>
                    <h-text />
                </h-file-attachment>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        removeFileAttachment(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
