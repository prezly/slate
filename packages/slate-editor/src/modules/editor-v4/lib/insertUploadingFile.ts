import type ProgressPromise from '@prezly/progress-promise';
import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Element } from 'slate';

import { EventsEditor } from '#modules/editor-v4-events';
import type { LoaderContentType } from '#modules/editor-v4-loader';
import {
    createLoader,
    findLoaderPath,
    loaderPromiseManager,
    removeLoader,
    replaceLoader,
} from '#modules/editor-v4-loader';
import { UPLOAD_SINGLE_FILE_ERROR_MESSAGE } from '#modules/uploadcare';

interface Parameters<T> {
    createElement: (file: T) => Element;
    ensureEmptyParagraphAfter: boolean;
    filePromise: ProgressPromise<T>;
    loaderContentType: LoaderContentType;
    loaderMessage: string;
}

function isValidFile<T>(file: T | null): file is T {
    return Array.isArray(file) ? file.length > 0 : Boolean(file);
}

export async function insertUploadingFile<T>(
    editor: Editor,
    {
        createElement,
        ensureEmptyParagraphAfter,
        filePromise,
        loaderContentType,
        loaderMessage,
    }: Parameters<T>,
): Promise<T | null> {
    const loader = createLoader({
        contentType: loaderContentType,
        message: loaderMessage,
    });
    EditorCommands.insertNodes(editor, [loader], { ensureEmptyParagraphAfter });
    loaderPromiseManager.track(loader.id, filePromise);

    let file: T | null = null;

    try {
        file = await filePromise;
    } catch (error) {
        EventsEditor.dispatchEvent(editor, 'error', error);
        EventsEditor.dispatchEvent(editor, 'notification', {
            children: UPLOAD_SINGLE_FILE_ERROR_MESSAGE,
            type: 'error',
        });
    }

    const loaderPath = findLoaderPath(editor, loader.id);

    if (!isValidFile(file)) {
        // No file info, we cannot insert the element.
        // We still have to remove the loader before exiting.
        if (loaderPath) {
            removeLoader(editor, loaderPath);
        }
        return null;
    }

    if (!loaderPath) {
        // When loaderPath === null, it means the loader was removed by the user.
        // This most likely means the user changed their mind, so we do not insert the element.
        return null;
    }

    const element = createElement(file);
    replaceLoader(editor, loader, element);

    return file;
}
