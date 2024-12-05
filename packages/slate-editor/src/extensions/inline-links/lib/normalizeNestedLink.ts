import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Element, Node, NodeEntry } from 'slate';

function disallowParentLink(parent: Element) {
    return !isLinkNode(parent);
}

export function normalizeNestedLink(editor: SlateEditor, [node, path]: NodeEntry<Node>): boolean {
    if (!isLinkNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    return EditorCommands.normalizeNestedElement(editor, [node, path], disallowParentLink);
}
