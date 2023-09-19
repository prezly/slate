/* eslint-disable no-param-reassign */

import type { DataTransferHandler } from '@prezly/slate-commons';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import type { Editor } from 'slate';

import { filterDataTransferFiles, isFilesOnlyDataTransfer } from '#lib';

import { createImage, IMAGE_TYPES } from '#extensions/image';
import { insertPlaceholders, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';

export interface Parameters {
    onImagesPasted: (editor: Editor, images: File[]) => void;
}

export function createDataTransferHandler(
    editor: Editor,
    { onImagesPasted }: Parameters,
): DataTransferHandler {
    return (dataTransfer, next) => {
        if (!isFilesOnlyDataTransfer(dataTransfer)) {
            // Handle images, if the pasted content is containing files only.
            return next(dataTransfer);
        }

        const images = Array.from(dataTransfer.files).filter(isImageFile);

        if (images.length === 0) {
            return next(dataTransfer);
        }

        onImagesPasted(editor, images);

        const placeholders = insertPlaceholders(editor, images.length, {
            type: PlaceholderNode.Type.IMAGE,
        });

        images.forEach((file, i) => {
            const filePromise = uploadcare.fileFrom('object', file);
            const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
                const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return {
                    image: createImage({
                        file: image.toPrezlyStoragePayload(),
                        children: [{ text: caption }],
                    }),
                    operation: 'add' as const,
                    trigger: 'paste' as const,
                };
            });
            PlaceholdersManager.register(
                PlaceholderNode.Type.IMAGE,
                placeholders[i].uuid,
                uploading,
            );
        });

        const filteredDataTransfer = withoutImages(dataTransfer);

        if (filteredDataTransfer.files.length > 0) {
            next(filteredDataTransfer);
        }
    };
}

function isImageFile(file: File) {
    return IMAGE_TYPES.includes(file.type);
}

function withoutImages(dataTransfer: DataTransfer): DataTransfer {
    return filterDataTransferFiles(dataTransfer, (file) => !isImageFile(file));
}
