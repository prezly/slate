import { NodeApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

import { getNestedList, getPrevSibling } from '../lib';
import { moveListItemsToAnotherList, moveListToListItem } from '../transformations';
import type { ListsSchema } from '../types';

/**
 * If there is a nested "list" inside a "list-item" without a "list-item-text"
 * unwrap that nested "list" and try to nest it in previous sibling "list-item".
 */
export function normalizeOrphanNestedList(
    editor: SlateEditor,
    schema: ListsSchema,
    [node, path]: NodeEntry,
): boolean {
    if (!schema.isListItemNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const children = Array.from(NodeApi.children(editor, path));

    if (children.length !== 1) {
        return false;
    }

    const [list] = children;
    const [listNode, listPath] = list;

    if (!schema.isListNode(listNode)) {
        // If the first child is not a "list", then this fix does not apply.
        return false;
    }

    const previousListItem = getPrevSibling(editor, path);

    if (previousListItem) {
        const [, previousListItemPath] = previousListItem;
        const previousListItemNestedList = getNestedList(editor, schema, previousListItemPath);

        if (previousListItemNestedList) {
            moveListItemsToAnotherList(editor, schema, {
                at: list,
                to: previousListItemNestedList,
            });
        } else {
            moveListToListItem(editor, schema, {
                at: list,
                to: previousListItem,
            });
        }
        // Remove now empty "list-item".
        editor.tf.removeNodes({ at: path });
    } else {
        // If there's no previous "list-item" to move nested "list" into, just lift it up.
        editor.tf.unwrapNodes({ at: listPath });
        editor.tf.unwrapNodes({ at: path });
    }

    return true;
}
