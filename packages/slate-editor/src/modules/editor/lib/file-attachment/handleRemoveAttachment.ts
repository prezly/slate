import type { AttachmentNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { EventsEditor } from '#modules/events';

export function handleRemoveAttachment(editor: Editor, element: AttachmentNode): void {
    return EventsEditor.dispatchEvent(editor, 'attachment-removed', { uuid: element.file.uuid });
}