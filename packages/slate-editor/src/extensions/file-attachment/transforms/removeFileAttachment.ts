import { EditorCommands } from '@prezly/slate-commons';
import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeFileAttachment(editor: Editor): AttachmentNode | null {
    return EditorCommands.removeNode<AttachmentNode>(editor, {
        match: isAttachmentNode,
    });
}
