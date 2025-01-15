import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { NESTED_LIST_PATH_INDEX } from '../constants';
import type { ListsSchema } from '../types';

/**
 * Nests (moves) given "list" in a given "list-item".
 */
export function moveListToListItem(
    editor: SlateEditor,
    schema: ListsSchema,
    parameters: {
        at: NodeEntry;
        to: NodeEntry;
    },
): void {
    const [sourceListNode, sourceListPath] = parameters.at;
    const [targetListNode, targetListPath] = parameters.to;

    if (!schema.isListNode(sourceListNode) || !schema.isListItemNode(targetListNode)) {
        // Sanity check.
        return;
    }

    editor.tf.moveNodes({
        at: sourceListPath,
        to: [...targetListPath, NESTED_LIST_PATH_INDEX],
    });
}
