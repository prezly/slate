import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import { noop } from '@technically/lodash';
import type { Editor } from 'slate';

import { createImage, IMAGE_TYPES } from '#extensions/image';

import { insertPlaceholders, PlaceholderNode, PlaceholdersManager } from '../../placeholders';

export interface Parameters {
    onImagesPasted?: (editor: Editor, images: File[]) => void;
}

export function withImagesPasting({ onImagesPasted = noop }: Parameters = {}) {
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

            onImagesPasted(editor, images);

            const placeholders = insertPlaceholders(editor, images.length, {
                type: PlaceholderNode.Type.IMAGE,
            });

            images.forEach((file, i) => {
                const filePromise = uploadcare.fileFrom('object', file);
                const uploading = toProgressPromise(filePromise).then(
                    (fileInfo: PrezlyFileInfo) => {
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
                    },
                );
                PlaceholdersManager.register(
                    PlaceholderNode.Type.IMAGE,
                    placeholders[i].uuid,
                    uploading,
                );
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
