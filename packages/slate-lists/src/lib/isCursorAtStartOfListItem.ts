import { EditorCommands } from '@prezly/slate-commons';
import { Range } from 'slate';

import type { ListsEditor } from '../types';

import { getListItemsInRange } from './getListItemsInRange';

/**
 * Returns true when editor has collapsed selection and the cursor is at the beginning of a "list-item".
 */
export function isCursorAtStartOfListItem(editor: ListsEditor): boolean {
    if (!editor.selection || Range.isExpanded(editor.selection)) {
        return false;
    }

    const listItemsInSelection = getListItemsInRange(editor, editor.selection);

    if (listItemsInSelection.length !== 1) {
        return false;
    }

    const [[, listItemPath]] = listItemsInSelection;
    const { isStart } = EditorCommands.getCursorPositionInNode(
        editor,
        editor.selection.anchor,
        listItemPath,
    );

    return isStart;
}
