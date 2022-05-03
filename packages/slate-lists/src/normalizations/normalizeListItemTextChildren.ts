import type { NodeEntry } from 'slate';
import { Editor, Element, Node, Transforms } from 'slate';

import type { ListsEditor } from '../types';

/**
 * A "list-item-text" can have only inline nodes in it.
 */
export function normalizeListItemTextChildren(
    editor: ListsEditor,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!editor.isListItemTextNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    for (const [childNode, childPath] of Node.children(editor, path)) {
        if (Element.isElement(childNode) && !Editor.isInline(editor, childNode)) {
            Transforms.unwrapNodes(editor, { at: childPath });
            return true;
        }
    }

    return false;
}
