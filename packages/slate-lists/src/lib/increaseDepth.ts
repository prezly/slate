import { EditorCommands, nodeIdManager } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { ListsOptions } from '../types';

import getListItemsInRange from './getListItemsInRange';
import increaseListItemDepth from './increaseListItemDepth';
import wrapInList from './wrapInList';

/**
 * Increases nesting depth of all "list-items" in the current selection.
 * All nodes matching options.wrappableTypes in the selection will be converted to "list-items" and wrapped in a "list".
 */
const increaseDepth = (options: ListsOptions, editor: Editor): void => {
    if (!editor.selection) {
        return;
    }

    const listItemsInRange = getListItemsInRange(options, editor, editor.selection);
    const indentableListItemsInRange = listItemsInRange.filter(([, listItemPath]) => {
        const previousListItem = EditorCommands.getPreviousSibling(editor, listItemPath);
        return previousListItem !== null;
    });
    const unreachableListItems = EditorCommands.getUnreachableAncestors(indentableListItemsInRange);
    // When calling `increaseListItemDepth` the paths and references to list items
    // can change, so we need a way of marking the list items scheduled for transformation.
    const unreachableListItemsIds = unreachableListItems.map((listItem) => {
        return nodeIdManager.assign(editor, listItem);
    });

    // Before we indent "list-items", we want to convert every non list-related block in selection to a "list".
    wrapInList(options, editor, options.listTypes[0]);

    unreachableListItemsIds.forEach((id) => {
        const listItemEntry = nodeIdManager.get(editor, id);
        nodeIdManager.unassign(editor, id);

        if (!listItemEntry) {
            // It should never happen.
            return;
        }

        const [, listItemEntryPath] = listItemEntry;
        increaseListItemDepth(options, editor, listItemEntryPath);
    });
};

export default increaseDepth;
