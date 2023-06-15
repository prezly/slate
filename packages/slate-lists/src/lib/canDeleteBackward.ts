import type { Editor, Location } from 'slate';

import type { ListsSchema } from '../types';

import { getListItemsInRange } from './getListItemsInRange';
import { getParentListItem } from './getParentListItem';
import { getPrevSibling } from './getPrevSibling';
import { isAtStartOfListItem } from './isAtStartOfListItem';

/**
 * Returns true when editor.deleteBackward() is safe to call (it won't break the structure).
 */
export function canDeleteBackward(
    editor: Editor,
    schema: ListsSchema,
    at: Location | null = editor.selection,
): boolean {
    const listItemsInSelection = getListItemsInRange(editor, schema, at);

    if (listItemsInSelection.length === 0) {
        return true;
    }

    const [[, listItemPath]] = listItemsInSelection;
    const isInNestedList = getParentListItem(editor, schema, listItemPath) !== null;
    const isFirstListItem = getPrevSibling(editor, listItemPath) === null;
    return isInNestedList || !isFirstListItem || !isAtStartOfListItem(editor, schema);
}
