import type { Location } from 'slate';
import { Editor } from 'slate';

import { getListItemsInRange, pickSubtreesRoots } from '../lib';
import type { ListsEditor } from '../types';

import { decreaseListItemDepth } from './decreaseListItemDepth';

/**
 * Decreases nesting depth of all "list-items" in the current selection.
 * All "list-items" in the root "list" will become "default" nodes.
 *
 * @returns {boolean} True, if the editor state has been changed.
 */
export function decreaseDepth(
    editor: ListsEditor,
    at: Location | null = editor.selection,
): boolean {
    if (!at) {
        return false;
    }

    const listItems = getListItemsInRange(editor, at);

    // When calling `decreaseListItemDepth` the paths and references to "list-items"
    // can change, so we need a way of marking the "list-items" scheduled for transformation.
    const refs = pickSubtreesRoots(listItems).map(([_, path]) => Editor.pathRef(editor, path));

    let handled = false;

    refs.forEach((ref) => {
        if (ref.current) {
            handled = decreaseListItemDepth(editor, ref.current) || handled;
        }

        ref.unref();
    });

    return handled;
}
