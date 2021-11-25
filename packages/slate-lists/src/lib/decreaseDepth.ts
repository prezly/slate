import { EditorCommands, nodeIdManager } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import type { ListsOptions } from '../types';

import decreaseListItemDepth from './decreaseListItemDepth';
import getListItemsInRange from './getListItemsInRange';

/**
 * Decreases nesting depth of all "list-items" in the current selection.
 * All "list-items" in the root "list" will become "default" nodes.
 */
const decreaseDepth = (options: ListsOptions, editor: Editor): void => {
    if (!editor.selection) {
        return;
    }

    const listItemsInRange = getListItemsInRange(options, editor, editor.selection);
    const unreachableListItems = EditorCommands.getUnreachableAncestors(listItemsInRange);
    // When calling `decreaseListItemDepth` the paths and references to "list-items"
    // can change, so we need a way of marking the "list-items" scheduled for transformation.
    const unreachableListItemsIds = unreachableListItems.map((listItem) => {
        return nodeIdManager.assign(editor, listItem);
    });

    unreachableListItemsIds.forEach((id) => {
        const listItemEntry = nodeIdManager.get(editor, id);
        nodeIdManager.unassign(editor, id);

        if (!listItemEntry) {
            // It should never happen.
            return;
        }

        const [, listItemEntryPath] = listItemEntry;
        decreaseListItemDepth(options, editor, listItemEntryPath);
    });
};

export default decreaseDepth;
