import { EditorCommands } from '@prezly/slate-commons';
import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function getCurrentFileAttachmentElement(editor: SlateEditor): AttachmentNode | null {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];
    if (currentNode && isAttachmentNode(currentNode)) {
        return currentNode;
    }
    return null;
}
