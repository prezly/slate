/* eslint-disable no-param-reassign */

import type { DataTransferHandler } from '@prezly/slate-commons';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import { noop } from '@technically/lodash';
import type { Editor } from 'slate';

import { filterDataTransferFiles, isFilesOnlyDataTransfer } from '#lib';

import { IMAGE_TYPES } from '#extensions/image';
import { insertPlaceholders, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';

interface Parameters {
    onFilesPasted?: (editor: Editor, files: File[]) => void;
}

export function createDataTransferHandler(
    editor: Editor,
    { onFilesPasted = noop }: Parameters,
): DataTransferHandler {
    return (dataTransfer, next) => {
        if (!isFilesOnlyDataTransfer(dataTransfer)) {
            // Handle images, if the pasted content is containing files only.
            return next(dataTransfer);
        }

        const files = Array.from(dataTransfer.files).filter(isAttachmentFile);

        if (files.length === 0) {
            return next(dataTransfer);
        }

        onFilesPasted(editor, files);

        const placeholders = insertPlaceholders(editor, files.length, {
            type: PlaceholderNode.Type.ATTACHMENT,
        });

        files.forEach((file, i) => {
            const filePromise = uploadcare.fileFrom('object', file);
            const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
                const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return {
                    file: file.toPrezlyStoragePayload(),
                    caption,
                    trigger: 'paste' as const,
                };
            });
            PlaceholdersManager.register(
                PlaceholderNode.Type.ATTACHMENT,
                placeholders[i].uuid,
                uploading,
            );
        });

        const filteredDataTransfer = withoutFiles(dataTransfer);

        if (filteredDataTransfer.files.length > 0) {
            next(filteredDataTransfer);
        }
    };
}

function isAttachmentFile(file: File) {
    return !IMAGE_TYPES.includes(file.type);
}

function withoutFiles(dataTransfer: DataTransfer): DataTransfer {
    return filterDataTransferFiles(dataTransfer, (file) => !isAttachmentFile(file));
}
