import { ElementApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

import type { ListsSchema } from '../types';

/**
 * Moves all "list-items" from one "list" to the end of another "list".
 */
export function moveListItemsToAnotherList(
    editor: SlateEditor,
    schema: ListsSchema,
    parameters: {
        at: NodeEntry;
        to: NodeEntry;
    },
): boolean {
    const [sourceListNode, sourceListPath] = parameters.at;
    const [targetListNode, targetListPath] = parameters.to;

    if (
        ElementApi.isElement(sourceListNode) &&
        ElementApi.isElement(targetListNode) &&
        schema.isListNode(sourceListNode) &&
        schema.isListNode(targetListNode) &&
        sourceListNode.children.length > 0
    ) {
        // Sanity check.
        for (let i = 0; i < sourceListNode.children.length; ++i) {
            editor.tf.moveNodes({
                at: [...sourceListPath, 0],
                to: [...targetListPath, targetListNode.children.length + i],
            });
        }

        return true;
    }
    return false;
}
