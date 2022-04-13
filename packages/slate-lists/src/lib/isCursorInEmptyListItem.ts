import { Range } from 'slate';

import type { ListsEditor } from '../types';

import { getListItemsInRange } from './getListItemsInRange';
import { listItemContainsText } from './listItemContainsText';

/**
 * Returns true when editor has collapsed selection and the cursor is in an empty "list-item".
 */
export function isCursorInEmptyListItem(editor: ListsEditor): boolean {
    if (!editor.selection || Range.isExpanded(editor.selection)) {
        return false;
    }

    const listItemsInSelection = getListItemsInRange(editor, editor.selection);

    if (listItemsInSelection.length !== 1) {
        return false;
    }

    const [[listItemNode]] = listItemsInSelection;

    return !listItemContainsText(editor, listItemNode);
}
