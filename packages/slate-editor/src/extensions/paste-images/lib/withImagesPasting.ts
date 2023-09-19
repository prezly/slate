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

import { createFileAttachment } from '#extensions/file-attachment';
import { createImage, IMAGE_TYPES } from '#extensions/image';
import { LoaderContentType } from '#extensions/loader';
import { EventsEditor } from '#modules/events';

import { insertUploadingFile } from '#modules/editor/lib';

interface Parameters {
    /**
     * Fallback to inserting an attachment node, if the uploaded image
     * is reported as a raw file upload by Uploadcare.
     */
    fallbackAttachments?: boolean;
}

export function withImagesPasting({ fallbackAttachments = false }: Parameters = {}) {
    return <T extends Editor>(editor: T): T => {
        const parent = {
            insertData: editor.insertData,
        };

        editor.insertData = (dataTransfer: DataTransfer) => {
            const isFilesOnly =
                dataTransfer.types.length === 1 && dataTransfer.types[0] === 'Files';

            if (!isFilesOnly) {
                // Handle images, if the pasted content is containing files only.
                return parent.insertData(dataTransfer);
            }

            const images = Array.from(dataTransfer.files).filter((file) =>
                IMAGE_TYPES.includes(file.type),
            );

            if (images.length === 0) {
                parent.insertData(dataTransfer);
            }

            EventsEditor.dispatchEvent(editor, 'images-pasted', {
                imagesCount: images.length,
                isEmpty: EditorCommands.isEmpty(editor),
            });

            images.forEach(async (file) => {
                const uploadedFileInfo = await insertUploadingFile<PrezlyFileInfo>(editor, {
                    createElement: (fileInfo) => {
                        const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';

                        if (fileInfo.isImage) {
                            const image =
                                UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                            return createImage({
                                file: image.toPrezlyStoragePayload(),
                                children: [{ text: caption }],
                            });
                        }

                        if (fallbackAttachments) {
                            const attachment =
                                UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);

                            return createFileAttachment(
                                attachment.toPrezlyStoragePayload(),
                                caption,
                            );
                        }

                        return null;
                    },
                    filePromise: toProgressPromise(uploadcare.fileFrom('object', file)),
                    loaderContentType: LoaderContentType.IMAGE,
                    loaderMessage: 'Uploading Image',
                    mode: 'insert',
                });

                if (!uploadedFileInfo) {
                    return;
                }

                EventsEditor.dispatchEvent(editor, 'image-added', {
                    description: uploadedFileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
                    isPasted: true,
                    mimeType: uploadedFileInfo.mimeType,
                    size: uploadedFileInfo.size,
                    uuid: uploadedFileInfo.uuid,
                });
            });

            const filteredDataTransfer = withoutImages(dataTransfer);

            if (filteredDataTransfer.files.length > 0) {
                parent.insertData(filteredDataTransfer);
            }
        };

        return editor;
    };
}

function withoutImages(dataTransfer: DataTransfer): DataTransfer {
    // FIXME: Filter out images
    return dataTransfer;
}
