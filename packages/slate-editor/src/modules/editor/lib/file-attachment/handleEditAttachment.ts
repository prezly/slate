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

    const newElement = mapFilename({ ...currentFileAttachment, ...element }, (filename) =>
        filename.replaceAll('/', '_'),
    );

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

function mapFilename(element: AttachmentNode, map: (filename: string) => string): AttachmentNode {
    return { ...element, file: { ...element.file, filename: map(element.file.filename) } };
}
