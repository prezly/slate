import { Editor } from 'slate';

import { UPLOADCARE_PROPERTY } from './constants';
import type { ResultPromise, Uploadcare, UploadcareOptions } from './types';

export abstract class UploadcareEditor {
    static upload<
        Multiple extends boolean,
        ImagesOnly extends boolean,
        MediaGallery extends boolean,
    >(
        editor: Editor,
        options: UploadcareOptions<Multiple, ImagesOnly, MediaGallery>,
    ): Promise<ResultPromise<Multiple> | void> {
        if (UploadcareEditor.isUploadcareEditor(editor)) {
            return editor[UPLOADCARE_PROPERTY].upload(editor, options);
        }

        return Promise.resolve();
    }

    static isUploadcareEditor = (value: unknown): value is UploadcareEditor => {
        // @ts-expect-error todo
        return Editor.isEditor(value) && typeof value[UPLOADCARE_PROPERTY] !== 'undefined';
    };

    public abstract [UPLOADCARE_PROPERTY]: Uploadcare;
}
