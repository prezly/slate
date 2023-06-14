import type { Editor } from 'slate';
import { Range } from 'slate';

import type { ListsSchema } from '../types';

import { getListItemsInRange } from './getListItemsInRange';
import { isListItemContainingText } from './isListItemContainingText';

/**
 * Returns true when editor has collapsed selection and the cursor is in an empty "list-item".
 */
export function isCursorInEmptyListItem(editor: Editor, schema: ListsSchema): boolean {
    if (!editor.selection || Range.isExpanded(editor.selection)) {
        return false;
    }

    const listItemsInSelection = getListItemsInRange(editor, schema, editor.selection);

    if (listItemsInSelection.length !== 1) {
        return false;
    }

    const [[listItemNode]] = listItemsInSelection;

    return !isListItemContainingText(editor, schema, listItemNode);
}
