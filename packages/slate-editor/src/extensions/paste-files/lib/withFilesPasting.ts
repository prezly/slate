import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import { noop } from '@technically/lodash';
import type { Editor } from 'slate';

import { createFileAttachment } from '#extensions/file-attachment';
import { IMAGE_TYPES } from '#extensions/image';
import { LoaderContentType } from '#extensions/loader';
import { EventsEditor } from '#modules/events';

import { insertUploadingFile } from '#modules/editor/lib';

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

            files.forEach(async (file) => {
                const uploadedFileInfo = await insertUploadingFile<PrezlyFileInfo>(editor, {
                    createElement: (fileInfo) => {
                        const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';

                        const attachment =
                            UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);

                        return createFileAttachment(attachment.toPrezlyStoragePayload(), caption);
                    },
                    filePromise: toProgressPromise(uploadcare.fileFrom('object', file)),
                    loaderContentType: LoaderContentType.IMAGE,
                    loaderMessage: 'Uploading Image',
                    mode: 'insert',
                });

                if (!uploadedFileInfo) {
                    return;
                }

                EventsEditor.dispatchEvent(editor, 'attachment-added', {
                    description: uploadedFileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
                    isPasted: true,
                    mimeType: uploadedFileInfo.mimeType,
                    size: uploadedFileInfo.size,
                    uuid: uploadedFileInfo.uuid,
                });
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
