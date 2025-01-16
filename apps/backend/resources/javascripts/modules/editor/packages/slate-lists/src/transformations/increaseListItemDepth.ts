import type { SlateEditor } from '@udecode/plate-common';
import { Element, Node, Path } from 'slate';

import { NESTED_LIST_PATH_INDEX } from '../constants';
import { getListType, getPrevSibling } from '../lib';
import type { ListsSchema } from '../types';

/**
 * Increases nesting depth of "list-item" at a given Path.
 */
export function increaseListItemDepth(
    editor: SlateEditor,
    schema: ListsSchema,
    listItemPath: Path,
): boolean {
    const previousListItem = getPrevSibling(editor, listItemPath);

    if (!previousListItem) {
        // The existence of previous "list-item" is necessary and sufficient for the operation to be possible.
        // See: https://en.wikipedia.org/wiki/Necessity_and_sufficiency
        return false;
    }

    const [previousListItemNode, previousListItemPath] = previousListItem;

    if (!schema.isListItemNode(previousListItemNode)) {
        // Sanity check.
        return false;
    }

    const previousListItemChildListPath = [...previousListItemPath, NESTED_LIST_PATH_INDEX];
    const previousListItemHasChildList = Node.has(editor, previousListItemChildListPath);

    let changed = false;

    editor.withoutNormalizing(() => {
        // Ensure there's a nested "list" in the previous sibling "list-item".
        if (!previousListItemHasChildList) {
            const listNodePath = Path.ancestors(listItemPath, { reverse: true })[0];
            const listNode = Node.get(editor, listNodePath);
            editor.insertNodes(
                schema.createListNode(getListType(schema, listNode), { children: [] }),
                {
                    at: previousListItemChildListPath,
                },
            );
            changed = true;
        }

        const previousListItemChildList = Node.get(editor, previousListItemChildListPath);

        if (
            Element.isElement(previousListItemChildList) &&
            schema.isListNode(previousListItemChildList)
        ) {
            const index = previousListItemHasChildList
                ? previousListItemChildList.children.length
                : 0;

            editor.moveNodes({
                at: listItemPath,
                to: [...previousListItemChildListPath, index],
            });

            changed = true;
        }
    });

    return changed;
}
