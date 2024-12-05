import { getNodeChildren, isElement, type SlateEditor } from '@udecode/plate-common';
import type { NodeEntry, Node } from 'slate';

import type { ListsSchema } from '../types';

/**
 * A "list-item-text" can have only inline nodes in it.
 */
export function normalizeListItemTextChildren(
    editor: SlateEditor,
    schema: ListsSchema,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!schema.isListItemTextNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const children = getNodeChildren(editor, path);
    for (const [childNode, childPath] of children) {
        if (isElement(childNode) && !editor.isInline(childNode)) {
            editor.unwrapNodes({ at: childPath });
            return true;
        }
    }

    return false;
}
