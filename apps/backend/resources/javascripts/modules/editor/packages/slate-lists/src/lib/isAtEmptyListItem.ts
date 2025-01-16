import type { SlateEditor } from '@udecode/plate-common';
import type { Location, Span } from 'slate';

import type { ListsSchema } from '../types';

import { getCursorPosition } from './getCursorPosition';
import { getListItems } from './getListItems';
import { isListItemContainingText } from './isListItemContainingText';

/**
 * Returns true when editor has collapsed selection and the cursor is in an empty "list-item".
 */
export function isAtEmptyListItem(
    editor: SlateEditor,
    schema: ListsSchema,
    at: Location | Span | null = editor.selection,
): boolean {
    const point = getCursorPosition(editor, at);

    if (!point) {
        return false;
    }

    const listItemsInSelection = getListItems(editor, schema, point);

    if (listItemsInSelection.length !== 1) {
        return false;
    }

    const [[listItemNode]] = listItemsInSelection;

    return !isListItemContainingText(editor, schema, listItemNode);
}
