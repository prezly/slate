import { Editor } from 'slate';

import { getListItemsInRange } from '../lib';
import type { ListsSchema } from '../types';

import { decreaseDepth } from './decreaseDepth';

/**
 * Unwraps all "list-items" in the current selection.
 * No lists will be left in the current selection.
 */
export function unwrapList(editor: Editor, schema: ListsSchema): void {
    Editor.withoutNormalizing(editor, () => {
        let iterations = 0;

        while (getListItemsInRange(editor, schema, editor.selection).length > 0) {
            iterations++;

            decreaseDepth(editor, schema);

            if (iterations > 1000) {
                throw new Error(
                    'Too many iterations. Most likely there is a bug causing an infinite loop.',
                );
            }
        }
    });
}
