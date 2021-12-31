import { EditorCommands } from '@prezly/slate-commons';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import type { Editor } from 'slate';

import { EventsEditor } from '../../../../modules/editor-v4-events';
import {
    createFileAttachment,
    getCurrentFileAttachmentElement,
    removeFileAttachment,
} from '../../../../modules/editor-v4-file-attachment';
import { LoaderContentType } from '../../../../modules/editor-v4-loader';
import { UploadcareEditor } from '../../../../modules/editor-v4-uploadcare';
import insertUploadingFile from '../insertUploadingFile';

async function handleEditAttachment(editor: Editor) {
    const currentFileAttachment = getCurrentFileAttachmentElement(editor);
    if (!currentFileAttachment) {
        return;
    }

    const { description, file } = currentFileAttachment;
    EventsEditor.dispatchEvent(editor, 'attachment-edit-clicked');
    const initialFileInfo = UploadcareFile.createFromPrezlyStoragePayload(file);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initialFileInfo[UPLOADCARE_FILE_DATA_KEY] = { caption: description };

    const filePromises = await UploadcareEditor.upload(editor, {
        captions: true,
        files: [initialFileInfo],
        multiple: false,
    });

    if (!filePromises) {
        return;
    }

    removeFileAttachment(editor);
    EditorCommands.insertEmptyParagraph(editor);

    const attachmentFileInfo = await insertUploadingFile<PrezlyFileInfo>(editor, {
        createElement: (fileInfo) => {
            const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
            const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
            return createFileAttachment(file.toPrezlyStoragePayload(), caption);
        },
        ensureEmptyParagraphAfter: false,
        filePromise: toProgressPromise(filePromises[0]),
        loaderContentType: LoaderContentType.ATTACHMENT,
        loaderMessage: 'Uploading Attachment',
    });

    if (!attachmentFileInfo) {
        return;
    }

    EventsEditor.dispatchEvent(editor, 'attachment-edited', {
        description: attachmentFileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
        mimeType: attachmentFileInfo.mimeType,
        size: attachmentFileInfo.size,
        uuid: attachmentFileInfo.uuid,
    });
}

export default handleEditAttachment;
