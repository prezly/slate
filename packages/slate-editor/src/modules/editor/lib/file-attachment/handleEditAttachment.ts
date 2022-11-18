import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
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

    newElement.file.filename = newElement.file.filename.replaceAll('/', ':');

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
