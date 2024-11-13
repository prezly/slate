import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';
import { Element, Node } from 'slate';

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

    for (const [childNode, childPath] of Node.children(editor, path)) {
        // @ts-expect-error TODO: Fix this
        if (Element.isElement(childNode) && !editor.isInline(childNode)) {
            editor.unwrapNodes({ at: childPath });
            return true;
        }
    }

    return false;
}
