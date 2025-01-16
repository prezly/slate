import { EditorCommands } from '@prezly/slate-commons';
import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function removeFileAttachment(editor: SlateEditor): AttachmentNode | null {
    return EditorCommands.removeNode<AttachmentNode>(editor, {
        match: isAttachmentNode,
    });
}
