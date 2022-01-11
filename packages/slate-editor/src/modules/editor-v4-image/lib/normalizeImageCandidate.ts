import { EditorCommands } from '@prezly/slate-commons';
import { toProgressPromise, UploadcareImage } from '@prezly/uploadcare';
import type { FileInfo, FilePromise } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';
import type { Editor, Node, NodeEntry } from 'slate';
import { Transforms } from 'slate';

import isDataURI from 'validator/lib/isDataURI.js';

import { dataUriToFile } from '#lib';

import { EventsEditor } from '#modules/editor-v4-events';
import type { LoaderNode } from '#modules/editor-v4-loader';
import {
    createLoader,
    findLoaderPath,
    LoaderContentType,
    loaderPromiseManager,
    removeLoader,
    replaceLoader,
} from '#modules/editor-v4-loader';
import { UPLOAD_SINGLE_IMAGE_ERROR_MESSAGE } from '#modules/uploadcare';

import type { ImageCandidateNode } from '../types';

import { createImage } from './createImage';
import { isImageCandidateElement } from './isImageCandidateElement';

async function resolveFile(filePromise: FilePromise): Promise<FileInfo | null> {
    const fileInfo = await filePromise;

    if (!fileInfo.isImage) {
        throw new Error(`Unsupported image file format: ${fileInfo.mimeType}`);
    }

    return fileInfo;
}

function getFilePromise(src: string): FilePromise | null {
    if (src.startsWith('file://')) {
        // We don't know how to deal with this data
        return null;
    }

    if (isDataURI(src)) {
        try {
            return uploadcare.fileFrom('object', dataUriToFile(src));
        } catch (error) {
            // We don't know how to deal with this data
            return null;
        }
    }

    return uploadcare.fileFrom('url', src);
}

async function scheduleLoaderReplacement(
    editor: Editor,
    loaderElement: LoaderNode,
    { href, src }: ImageCandidateNode,
) {
    const loaderPath = findLoaderPath(editor, loaderElement.id);
    const filePromise = getFilePromise(src);

    if (!filePromise) {
        // No file promise, we cannot insert the element.
        // We still have to remove the loader before exiting.
        if (loaderPath) {
            removeLoader(editor, loaderPath);
        }
        return;
    }

    loaderPromiseManager.track(loaderElement.id, toProgressPromise(filePromise));

    let fileInfo: FileInfo | null = null;

    try {
        fileInfo = await resolveFile(filePromise);
    } catch (error) {
        EventsEditor.dispatchEvent(editor, 'error', error);
        EventsEditor.dispatchEvent(editor, 'notification', {
            children: UPLOAD_SINGLE_IMAGE_ERROR_MESSAGE,
            type: 'error',
        });
    }

    if (!fileInfo) {
        // No file info, we cannot insert the element.
        // We still have to remove the loader before exiting.
        if (loaderPath) {
            removeLoader(editor, loaderPath);
        }
        return;
    }

    if (!loaderPath) {
        // When loaderPath === null, it means the loader was removed by the user.
        // This most likely means the user changed their mind, so we do not insert the element.
        return;
    }

    const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
    const imageElement = createImage(image.toPrezlyStoragePayload(), { href });
    replaceLoader(editor, loaderElement, imageElement);

    EventsEditor.dispatchEvent(editor, 'image-added', {
        description: '',
        isPasted: true,
        mimeType: fileInfo.mimeType,
        size: fileInfo.size,
        uuid: fileInfo.uuid,
    });
}

/**
 * We don't want to have image-candidate nodes in the editor - we want to convert
 * them into actual images.
 */
export function normalizeImageCandidate(editor: Editor, [node, path]: NodeEntry<Node>): boolean {
    if (!isImageCandidateElement(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const selection = EditorCommands.saveSelection(editor);
    const loader = createLoader({
        contentType: LoaderContentType.IMAGE,
        message: 'Uploading Image',
    });
    Transforms.removeNodes(editor, { at: path, voids: true });
    Transforms.insertNodes(editor, loader, { at: path, mode: 'highest' });
    selection.restore(editor);
    scheduleLoaderReplacement(editor, loader, node);

    return true;
}
