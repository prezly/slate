import {
    PrezlyFileInfo,
    toProgressPromise,
    UPLOADCARE_FILE_DATA_KEY,
    UploadcareFile,
} from '@prezly/uploadcare';
import { Editor } from 'slate';

import { EventsEditor } from '../../../../modules/editor-v4-events';
import { createFileAttachment } from '../../../../modules/editor-v4-file-attachment';
import { LoaderContentType } from '../../../../modules/editor-v4-loader';
import { UploadcareEditor } from '../../../../modules/editor-v4-uploadcare';

import insertUploadingFile from '../insertUploadingFile';

const handleAddAttachment = async (editor: Editor) => {
    EventsEditor.dispatchEvent(editor, 'attachment-add-clicked');

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
};

export default handleAddAttachment;
