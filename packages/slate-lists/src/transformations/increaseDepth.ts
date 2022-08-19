import { Editor } from 'slate';

import { getListItemsInRange, getPrevSibling, pickSubtreesRoots } from '../lib';
import type { ListsEditor } from '../types';
import { ListType } from '../types';

import { increaseListItemDepth } from './increaseListItemDepth';
import { wrapInList } from './wrapInList';

/**
 * Increases nesting depth of all "list-items" in the current selection.
 * All nodes matching options.wrappableTypes in the selection will be converted to "list-items" and wrapped in a "list".
 */
export function increaseDepth(editor: ListsEditor): void {
    if (!editor.selection) {
        return;
    }

    const listItems = getListItemsInRange(editor, editor.selection);
    const indentableListItems = listItems.filter(([, listItemPath]) => {
        const previousListItem = getPrevSibling(editor, listItemPath);
        return previousListItem !== null;
    });

    // When calling `increaseListItemDepth` the paths and references to list items
    // can change, so we need a way of marking the list items scheduled for transformation.
    const refs = pickSubtreesRoots(indentableListItems).map(([_, path]) =>
        Editor.pathRef(editor, path),
    );

    Editor.withoutNormalizing(editor, () => {
        // Before we indent "list-items", we want to convert every non list-related block in selection to a "list".
        wrapInList(editor, ListType.UNORDERED);

        refs.forEach((ref) => {
            if (ref.current) {
                increaseListItemDepth(editor, ref.current);
            }
            ref.unref();
        });
    });
}
