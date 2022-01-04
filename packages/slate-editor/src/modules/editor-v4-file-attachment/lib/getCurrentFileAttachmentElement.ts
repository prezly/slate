import { EditorCommands } from '@prezly/slate-commons';
import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function getCurrentFileAttachmentElement(editor: Editor): AttachmentNode | null {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];
    if (currentNode && isAttachmentNode(currentNode)) {
        return currentNode;
    }
    return null;
}
