import { NodeApi, TextApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

import type { ListsSchema } from '../types';

/**
 * All children of a "list" have to be "list-items". It can happen (e.g. during pasting) that
 * this will not be true, so we have to convert all non-"list-item" children of a "list"
 * into "list-items".
 */
export function normalizeListChildren(
    editor: SlateEditor,
    schema: ListsSchema,
    [node, path]: NodeEntry,
): boolean {
    if (!schema.isListNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const children = Array.from(NodeApi.children(editor, path));

    for (const [childNode, childPath] of children) {
        if (TextApi.isText(childNode)) {
            // This can happen during pasting

            // When pasting from MS Word there may be weird text nodes with some whitespace
            // characters. They're not expected to be deserialized so we remove them.
            if (childNode.text.trim() === '') {
                if (children.length > 1) {
                    editor.tf.removeNodes({ at: childPath });
                } else {
                    // If we're removing the only child, we may delete the whole list as well
                    // to avoid never-ending normalization (Slate will insert empty text node).
                    editor.tf.removeNodes({ at: path });
                }
                return true;
            }

            editor.tf.wrapNodes(
                schema.createListItemNode({
                    children: [schema.createListItemTextNode({ children: [childNode] })],
                }),
                { at: childPath },
            );
            return true;
        }

        if (schema.isListItemTextNode(childNode)) {
            editor.tf.wrapNodes(schema.createListItemNode(), { at: childPath });
            return true;
        }

        if (schema.isListNode(childNode)) {
            // Wrap it into a list item so that `normalizeOrphanNestedList` can take care of it.
            editor.tf.wrapNodes(schema.createListItemNode(), { at: childPath });
            return true;
        }

        if (!schema.isListItemNode(childNode)) {
            editor.tf.setNodes(schema.createListItemTextNode(), { at: childPath });
            editor.tf.wrapNodes(schema.createListItemNode(), { at: childPath });
            return true;
        }
    }

    return false;
}
