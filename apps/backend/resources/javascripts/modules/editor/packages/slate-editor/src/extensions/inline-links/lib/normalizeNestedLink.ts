import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import type { Element, NodeEntry, SlateEditor } from '@udecode/plate';

function disallowParentLink(parent: Element) {
    return !isLinkNode(parent);
}

export function normalizeNestedLink(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!isLinkNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    return EditorCommands.normalizeNestedElement(editor, [node, path], disallowParentLink);
}
