import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { EventsEditor } from '#modules/editor-v4-events';
import { getCurrentFileAttachmentElement } from '#extensions/editor-v4-file-attachment';

export async function handleEditAttachment(editor: Editor, element: Partial<AttachmentNode>) {
    EventsEditor.dispatchEvent(editor, 'attachment-edit-clicked');

    const currentFileAttachment = getCurrentFileAttachmentElement(editor);

    if (!currentFileAttachment) {
        return;
    }

    Transforms.setNodes<AttachmentNode>(editor, element, {
        match: isAttachmentNode,
    });

    const { description, file } = { ...currentFileAttachment, ...element };

    EventsEditor.dispatchEvent(editor, 'attachment-edited', {
        description: description,
        mimeType: file.mime_type,
        size: file.size,
        uuid: file.uuid,
    });
}
