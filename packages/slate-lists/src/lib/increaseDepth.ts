import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import type { ListsEditor } from '../types';
import { ListType } from '../types';

import { getListItemsInRange } from './getListItemsInRange';
import { getUnreachableAncestors } from './getUnreachableAncestors';
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

    const listItemsInRange = getListItemsInRange(editor, editor.selection);
    const indentableListItemsInRange = listItemsInRange.filter(([, listItemPath]) => {
        const previousListItem = EditorCommands.getPreviousSibling(editor, listItemPath);
        return previousListItem !== null;
    });

    // When calling `increaseListItemDepth` the paths and references to list items
    // can change, so we need a way of marking the list items scheduled for transformation.
    const refs = getUnreachableAncestors(indentableListItemsInRange).map(([_, path]) =>
        Editor.pathRef(editor, path),
    );

    // Before we indent "list-items", we want to convert every non list-related block in selection to a "list".
    wrapInList(editor, ListType.UNORDERED);

    refs.forEach((ref) => {
        if (ref.current) {
            increaseListItemDepth(editor, ref.current);
        }
        ref.unref();
    });
}
