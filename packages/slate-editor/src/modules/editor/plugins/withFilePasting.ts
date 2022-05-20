/* eslint-disable no-param-reassign */

import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import {
    toProgressPromise,
    UPLOADCARE_FILE_DATA_KEY,
    UploadcareFile,
    UploadcareImage,
} from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import type { Editor } from 'slate';

import { createFileAttachment, FILE_ATTACHMENT_EXTENSION_ID } from '#extensions/file-attachment';
import { createImage, IMAGE_EXTENSION_ID } from '#extensions/image';
import { LOADER_EXTENSION_ID, LoaderContentType } from '#extensions/loader';
import { EventsEditor } from '#modules/events';

import { insertUploadingFile } from '../lib';

const IMAGE_TYPES = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];

function canPasteFiles(extensions: Extension[], data: DataTransfer): boolean {
    const isFilesOnly = data.types.length === 1 && data.types[0] === 'Files';

    if (!isFilesOnly) {
        return false;
    }

    const isLoaderExtensionEnabled = extensions.some(({ id }) => id === LOADER_EXTENSION_ID);

    if (!isLoaderExtensionEnabled) {
        return false;
    }

    const isImageExtensionEnabled = extensions.some(({ id }) => id === IMAGE_EXTENSION_ID);
    const isFileAttachmentExtensionEnabled = extensions.some(
        ({ id }) => id === FILE_ATTACHMENT_EXTENSION_ID,
    );

    return Array.from(data.files).some((file) => {
        const isImage = IMAGE_TYPES.includes(file.type);

        return isImage
            ? isImageExtensionEnabled || isFileAttachmentExtensionEnabled
            : isFileAttachmentExtensionEnabled;
    });
}

export function withFilePasting(getExtensions: () => Extension[]) {
    return function <T extends Editor>(editor: T): T {
        const { insertData } = editor;

        editor.insertData = (data: DataTransfer) => {
            const extensions = getExtensions();

            if (!canPasteFiles(extensions, data)) {
                insertData(data);
                return;
            }

            const files = Array.from(data.files);
            const isImageExtensionEnabled = extensions.some(({ id }) => id === IMAGE_EXTENSION_ID);
            const isFileAttachmentExtensionEnabled = extensions.some(
                ({ id }) => id === FILE_ATTACHMENT_EXTENSION_ID,
            );

            EventsEditor.dispatchEvent(editor, 'files-pasted', {
                filesCount: files.filter((file) => !IMAGE_TYPES.includes(file.type)).length,
                imagesCount: files.filter((file) => IMAGE_TYPES.includes(file.type)).length,
                isEmpty: EditorCommands.isEmpty(editor),
                slateVersion: process.env.SLATE_VERSION,
            });

            files.forEach(async (file) => {
                const isImage = IMAGE_TYPES.includes(file.type);

                if (isImage && !isImageExtensionEnabled && !isFileAttachmentExtensionEnabled) {
                    return;
                }

                if (!isImage && !isFileAttachmentExtensionEnabled) {
                    return;
                }

                const uploadedFileInfo = await insertUploadingFile<PrezlyFileInfo>(editor, {
                    createElement: (fileInfo) => {
                        const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';

                        if (fileInfo.isImage && isImageExtensionEnabled) {
                            const image =
                                UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                            return createImage({
                                file: image.toPrezlyStoragePayload(),
                                children: [{ text: caption }],
                            });
                        }

                        const attachment =
                            UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                        return createFileAttachment(attachment.toPrezlyStoragePayload(), caption);
                    },
                    ensureEmptyParagraphAfter: true,
                    filePromise: toProgressPromise(uploadcare.fileFrom('object', file)),
                    loaderContentType: isImage
                        ? LoaderContentType.IMAGE
                        : LoaderContentType.ATTACHMENT,
                    loaderMessage: isImage ? 'Uploading Image' : 'Uploading Attachment',
                });

                if (!uploadedFileInfo) {
                    return;
                }

                const event = uploadedFileInfo.isImage ? 'image-added' : 'attachment-added';
                EventsEditor.dispatchEvent(editor, event, {
                    description: uploadedFileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
                    isPasted: true,
                    mimeType: uploadedFileInfo.mimeType,
                    size: uploadedFileInfo.size,
                    uuid: uploadedFileInfo.uuid,
                });
            });
        };

        return editor;
    };
}
