import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import type { Editor } from 'slate';

import { createFileAttachment } from '#extensions/file-attachment';
import { LoaderContentType } from '#extensions/loader';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';

import { insertUploadingFile } from '../insertUploadingFile';

export async function handleAddAttachment(editor: Editor) {
    const filePromises = await UploadcareEditor.upload(editor, {
        captions: true,
        multiple: true,
    });

    if (!filePromises) {
        return;
    }

    filePromises.forEach(async (filePromise) => {
        const attachmentFileInfo = await insertUploadingFile<PrezlyFileInfo>(editor, {
            createElement: (fileInfo) => {
                const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return createFileAttachment(file.toPrezlyStoragePayload(), caption);
            },
            ensureEmptyParagraphAfter: true,
            filePromise: toProgressPromise(filePromise),
            loaderContentType: LoaderContentType.ATTACHMENT,
            loaderMessage: 'Uploading Attachment',
        });

        if (!attachmentFileInfo) {
            return;
        }

        EventsEditor.dispatchEvent(editor, 'attachment-added', {
            description: attachmentFileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
            isPasted: false,
            mimeType: attachmentFileInfo.mimeType,
            size: attachmentFileInfo.size,
            uuid: attachmentFileInfo.uuid,
        });
    });
}
