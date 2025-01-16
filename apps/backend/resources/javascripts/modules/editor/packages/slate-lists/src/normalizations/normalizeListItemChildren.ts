import { NodeApi, TextApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

import type { ListsSchema } from '../types';

/**
 * A "list-item" can have a single "list-item-text" and optionally an extra "list" as a child.
 */
export function normalizeListItemChildren(
    editor: SlateEditor,
    schema: ListsSchema,
    [node, path]: NodeEntry,
): boolean {
    if (!schema.isListItemNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const children = Array.from(NodeApi.children(editor, path));

    for (const [childIndex, [childNode, childPath]] of children.entries()) {
        if (TextApi.isText(childNode) || editor.api.isInline(childNode)) {
            const listItemText = schema.createListItemTextNode({
                children: [childNode],
            });
            editor.tf.wrapNodes(listItemText, { at: childPath });

            if (childIndex > 0) {
                const [previousChildNode] = children[childIndex - 1];

                if (schema.isListItemTextNode(previousChildNode)) {
                    editor.tf.mergeNodes({ at: childPath });
                }
            }

            return true;
        }

        if (schema.isListItemNode(childNode)) {
            editor.tf.liftNodes({ at: childPath });
            return true;
        }

        if (schema.isListItemTextNode(childNode) && childIndex !== 0) {
            editor.tf.wrapNodes(schema.createListItemNode(), { at: childPath });
            return true;
        }

        if (!schema.isListItemTextNode(childNode) && !schema.isListNode(childNode)) {
            editor.tf.setNodes(schema.createListItemTextNode(), { at: childPath });
            return true;
        }
    }

    return false;
}
