import type { Node, NodeEntry } from 'slate';
import { Transforms } from 'slate';

import type { ListsEditor } from '../types';

/**
 * Moves all "list-items" from one "list" to the end of another "list".
 */
export function moveListItemsToAnotherList(
    editor: ListsEditor,
    parameters: {
        at: NodeEntry<Node>;
        to: NodeEntry<Node>;
    },
): void {
    const [sourceListNode, sourceListPath] = parameters.at;
    const [targetListNode, targetListPath] = parameters.to;

    if (!editor.isListNode(sourceListNode) || !editor.isListNode(targetListNode)) {
        // Sanity check.
        return;
    }

    for (let i = 0; i < sourceListNode.children.length; ++i) {
        Transforms.moveNodes(editor, {
            at: [...sourceListPath, 0],
            to: [...targetListPath, targetListNode.children.length + i],
        });
    }
}
