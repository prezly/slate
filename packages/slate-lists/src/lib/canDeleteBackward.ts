import type { ListsEditor } from '../types';

import { getListItemsInRange } from './getListItemsInRange';
import { getParentListItem } from './getParentListItem';
import { getPrevSibling } from './getPrevSibling';
import { isCursorAtStartOfListItem } from './isCursorAtStartOfListItem';

/**
 * Returns true when editor.deleteBackward() is safe to call (it won't break the structure).
 */
export function canDeleteBackward(editor: ListsEditor): boolean {
    const listItemsInSelection = getListItemsInRange(editor, editor.selection);

    if (listItemsInSelection.length === 0) {
        return true;
    }

    const [[, listItemPath]] = listItemsInSelection;
    const isInNestedList = getParentListItem(editor, listItemPath) !== null;
    const isFirstListItem = getPrevSibling(editor, listItemPath) === null;
    return isInNestedList || !isFirstListItem || !isCursorAtStartOfListItem(editor);
}
