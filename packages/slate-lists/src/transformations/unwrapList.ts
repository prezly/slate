import type { Location } from 'slate';
import { Editor } from 'slate';

import { getListItemsInRange } from '../lib';
import type { ListsSchema } from '../types';

import { decreaseDepth } from './decreaseDepth';

/**
 * Unwraps all "list-items" in the current selection.
 * No lists will be left in the current selection.
 */
export function unwrapList(
    editor: Editor,
    schema: ListsSchema,
    at: Location | null = editor.selection,
): boolean {
    if (!at) {
        return false;
    }

    let iterations = 0;

    Editor.withoutNormalizing(editor, () => {
        while (getListItemsInRange(editor, schema, at).length > 0) {
            iterations++;

            decreaseDepth(editor, schema, at);

            if (iterations > 1000) {
                throw new Error(
                    'Too many iterations. Most likely there is a bug causing an infinite loop.',
                );
            }
        }
    });

    return iterations > 0;
}
