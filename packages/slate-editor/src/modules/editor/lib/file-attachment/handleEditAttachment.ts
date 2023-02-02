import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
import { UploadcareFile } from '@prezly/uploadcare';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { getCurrentFileAttachmentElement } from '#extensions/file-attachment';
import { EventsEditor } from '#modules/events';

export async function handleEditAttachment(editor: Editor, element: Partial<AttachmentNode>) {
    EventsEditor.dispatchEvent(editor, 'attachment-edit-clicked');

    const currentFileAttachment = getCurrentFileAttachmentElement(editor);

    if (!currentFileAttachment) {
        return;
    }

    const newElement = { ...currentFileAttachment, ...element };

    if (newElement.file) {
        const uploadcareFile = UploadcareFile.createFromPrezlyStoragePayload(newElement.file);
        newElement.file = uploadcareFile.toPrezlyStoragePayload();
    }

    Transforms.setNodes<AttachmentNode>(editor, newElement, {
        match: isAttachmentNode,
    });

    EventsEditor.dispatchEvent(editor, 'attachment-edited', {
        description: newElement.description,
        mimeType: newElement.file.mime_type,
        size: newElement.file.size,
        uuid: newElement.file.uuid,
    });
}
