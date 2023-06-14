import type { Editor, NodeEntry } from 'slate';
import { Element, Node, Text, Transforms } from 'slate';

import type { ListsSchema } from '../types';

/**
 * All children of a "list" have to be "list-items". It can happen (e.g. during pasting) that
 * this will not be true, so we have to convert all non-"list-item" children of a "list"
 * into "list-items".
 */
export function normalizeListChildren(
    editor: Editor,
    schema: ListsSchema,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!schema.isListNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    let normalized = false;

    const children = Array.from(Node.children(editor, path));

    children.forEach(([childNode, childPath]) => {
        if (normalized) {
            // Make sure at most 1 normalization operation is done at a time.
            return;
        }

        if (Text.isText(childNode)) {
            // This can happen during pasting

            // When pasting from MS Word there may be weird text nodes with some whitespace
            // characters. They're not expected to be deserialized so we remove them.
            if (!childNode.text.trim()) {
                if (children.length > 1) {
                    Transforms.removeNodes(editor, { at: childPath });
                } else {
                    // If we're removing the only child, we may delete the whole list as well
                    // to avoid never-ending normalization (Slate will insert empty text node).
                    Transforms.removeNodes(editor, { at: path });
                }
                normalized = true;
                return;
            }

            Transforms.wrapNodes(
                editor,
                schema.createListItemNode({
                    children: [schema.createListItemTextNode({ children: [childNode] })],
                }),
                { at: childPath },
            );
            normalized = true;
            return;
        }

        if (!Element.isElement(childNode)) {
            return;
        }

        if (schema.isListItemTextNode(childNode)) {
            Transforms.wrapNodes(editor, schema.createListItemNode(), { at: childPath });
            normalized = true;
            return;
        }

        if (schema.isListNode(childNode)) {
            // Wrap it into a list item so that `normalizeOrphanNestedList` can take care of it.
            Transforms.wrapNodes(editor, schema.createListItemNode(), { at: childPath });
            normalized = true;
            return;
        }

        if (!schema.isListItemNode(childNode)) {
            Transforms.setNodes(editor, schema.createListItemTextNode(), { at: childPath });
            Transforms.wrapNodes(editor, schema.createListItemNode(), { at: childPath });
            normalized = true;
        }
    });

    return normalized;
}
