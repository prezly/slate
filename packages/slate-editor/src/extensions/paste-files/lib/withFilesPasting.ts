import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import { noop } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';

import { filterDataTransferFiles, isFilesOnlyDataTransfer } from '#lib';

import { IMAGE_TYPES } from '#extensions/image';
import { insertPlaceholders, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';

interface Parameters {
    onFilesPasted?: (editor: SlateEditor, files: File[]) => void;
}

export function withFilesPasting({ onFilesPasted = noop }: Parameters = {}) {
    return <T extends SlateEditor>(editor: T): T => {
        const parent = {
            insertData: editor.insertData,
        };

        editor.insertData = (dataTransfer: DataTransfer) => {
            if (!isFilesOnlyDataTransfer(dataTransfer)) {
                // Exit, if the pasted content contains more than just files.
                return parent.insertData(dataTransfer);
            }

            const files = Array.from(dataTransfer.files).filter(isAttachmentFile);

            if (files.length === 0) {
                return parent.insertData(dataTransfer);
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

function isAttachmentFile(file: File) {
    return !IMAGE_TYPES.includes(file.type);
}

function withoutFiles(dataTransfer: DataTransfer): DataTransfer {
    return filterDataTransferFiles(dataTransfer, (file) => !isAttachmentFile(file));
}
