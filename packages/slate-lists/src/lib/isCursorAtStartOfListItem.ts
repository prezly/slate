import type { Editor } from 'slate';
import { Range } from 'slate';

import type { ListsSchema } from '../types';

import { getCursorPositionInNode } from './getCursorPositionInNode';
import { getListItemsInRange } from './getListItemsInRange';

/**
 * Returns true when editor has collapsed selection and the cursor is at the beginning of a "list-item".
 */
export function isCursorAtStartOfListItem(editor: Editor, schema: ListsSchema): boolean {
    if (!editor.selection || Range.isExpanded(editor.selection)) {
        return false;
    }

    const listItemsInSelection = getListItemsInRange(editor, schema, editor.selection);

    if (listItemsInSelection.length !== 1) {
        return false;
    }

    const [[, listItemPath]] = listItemsInSelection;
    const { isStart } = getCursorPositionInNode(editor, editor.selection.anchor, listItemPath);

    return isStart;
}
