import type { Location } from 'slate';
import { Editor } from 'slate';

import type { ListsEditor } from '../types';

import { decreaseListItemDepth } from './decreaseListItemDepth';
import { getListItemsInRange } from './getListItemsInRange';
import { pickSubtreesRoots } from './pickSubtreesRoots';

/**
 * Decreases nesting depth of all "list-items" in the current selection.
 * All "list-items" in the root "list" will become "default" nodes.
 */
export function decreaseDepth(editor: ListsEditor, at: Location | null = editor.selection): void {
    if (!at) {
        return;
    }

    const listItems = getListItemsInRange(editor, at);

    // When calling `decreaseListItemDepth` the paths and references to "list-items"
    // can change, so we need a way of marking the "list-items" scheduled for transformation.
    const refs = pickSubtreesRoots(listItems).map(([_, path]) => Editor.pathRef(editor, path));

    refs.forEach((ref) => {
        if (ref.current) {
            decreaseListItemDepth(editor, ref.current);
        }

        ref.unref();
    });
}
