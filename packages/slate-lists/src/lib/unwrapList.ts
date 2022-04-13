import type { ListsEditor } from '../types';

import { decreaseDepth } from './decreaseDepth';
import { getListItemsInRange } from './getListItemsInRange';

/**
 * Unwraps all "list-items" in the current selection.
 * No list be left in the current selection.
 */
export function unwrapList(editor: ListsEditor): void {
    while (getListItemsInRange(editor, editor.selection).length > 0) {
        decreaseDepth(editor);
    }
}
