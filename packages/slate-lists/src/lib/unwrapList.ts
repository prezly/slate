import type { Editor } from 'slate';

import type { ListsOptions } from '../types';

import { decreaseDepth } from './decreaseDepth';
import { getListItemsInRange } from './getListItemsInRange';

/**
 * Unwraps all "list-items" in the current selection.
 * No list be left in the current selection.
 */
export function unwrapList(options: ListsOptions, editor: Editor): void {
    while (getListItemsInRange(options, editor, editor.selection).length > 0) {
        decreaseDepth(options, editor);
    }
}

