import { ElementApi, NodeApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

import type { ListsSchema } from '../types';

/**
 * A "list-item-text" can have only inline nodes in it.
 */
export function normalizeListItemTextChildren(
    editor: SlateEditor,
    schema: ListsSchema,
    [node, path]: NodeEntry,
): boolean {
    if (!schema.isListItemTextNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const children = NodeApi.children(editor, path);
    for (const [childNode, childPath] of children) {
        if (ElementApi.isElement(childNode) && !editor.api.isInline(childNode)) {
            editor.tf.unwrapNodes({ at: childPath });
            return true;
        }
    }

    return false;
}
