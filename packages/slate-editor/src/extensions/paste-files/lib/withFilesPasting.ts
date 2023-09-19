import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import { noop } from '@technically/lodash';
import type { Editor } from 'slate';

import { IMAGE_TYPES } from '#extensions/image';
import { insertPlaceholders, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';

interface Parameters {
    onFilesPasted?: (editor: Editor, files: File[]) => void;
}

export function withFilesPasting({ onFilesPasted = noop }: Parameters = {}) {
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

            const files = Array.from(dataTransfer.files).filter(
                (file) => !IMAGE_TYPES.includes(file.type),
            );

            if (files.length === 0) {
                parent.insertData(dataTransfer);
            }

            onFilesPasted(editor, files);

            const placeholders = insertPlaceholders(editor, files.length, {
                type: PlaceholderNode.Type.ATTACHMENT,
            });

            files.forEach((file, i) => {
                const filePromise = uploadcare.fileFrom('object', file);
                const uploading = toProgressPromise(filePromise).then(
                    (fileInfo: PrezlyFileInfo) => {
                        const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                        const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                        return {
                            file: file.toPrezlyStoragePayload(),
                            caption,
                            trigger: 'paste' as const,
                        };
                    },
                );
                PlaceholdersManager.register(
                    PlaceholderNode.Type.ATTACHMENT,
                    placeholders[i].uuid,
                    uploading,
                );
            });

            const filteredDataTransfer = withoutFiles(dataTransfer);

            if (filteredDataTransfer.files.length > 0) {
                parent.insertData(filteredDataTransfer);
            }
        };

        return editor;
    };
}

function withoutFiles(dataTransfer: DataTransfer): DataTransfer {
    // FIXME: Filter out non-image files
    return dataTransfer;
}
