import type { NodeEntry } from 'slate';
import { Node, Text, Transforms } from 'slate';

import type { ListsEditor } from '../types';

/**
 * A "list-item" can have a single "list-item-text" and optionally an extra "list" as a child.
 */
export function normalizeListItemChildren(
    editor: ListsEditor,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!editor.isListItemNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const children = Array.from(Node.children(editor, path));

    for (let childIndex = 0; childIndex < children.length; ++childIndex) {
        const [childNode, childPath] = children[childIndex];

        if (Text.isText(childNode) || editor.isInline(childNode)) {
            const listItemText = editor.createListItemTextNode({
                children: [childNode],
            });
            Transforms.wrapNodes(editor, listItemText, { at: childPath });

            if (childIndex > 0) {
                const [previousChildNode] = children[childIndex - 1];

                if (editor.isListItemTextNode(previousChildNode)) {
                    Transforms.mergeNodes(editor, { at: childPath });
                }
            }

            return true;
        }

        if (editor.isListItemNode(childNode)) {
            Transforms.liftNodes(editor, { at: childPath });
            return true;
        }

        if (editor.isListItemTextNode(childNode) && childIndex !== 0) {
            Transforms.wrapNodes(editor, editor.createListItemNode(), { at: childPath });
            return true;
        }

        if (!editor.isListItemTextNode(childNode) && !editor.isListNode(childNode)) {
            Transforms.setNodes(editor, editor.createListItemTextNode(), { at: childPath });
            return true;
        }
    }

    return false;
}
