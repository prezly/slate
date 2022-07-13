import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import type { ListsEditor } from '../types';

import { decreaseListItemDepth } from './decreaseListItemDepth';
import { getListItemsInRange } from './getListItemsInRange';

/**
 * Decreases nesting depth of all "list-items" in the current selection.
 * All "list-items" in the root "list" will become "default" nodes.
 */
export function decreaseDepth(editor: ListsEditor): void {
    if (!editor.selection) {
        return;
    }

    const listItemsInRange = getListItemsInRange(editor, editor.selection);

    // When calling `decreaseListItemDepth` the paths and references to "list-items"
    // can change, so we need a way of marking the "list-items" scheduled for transformation.
    const refs = EditorCommands.getUnreachableAncestors(listItemsInRange).map(([_, path]) =>
        Editor.pathRef(editor, path),
    );

    refs.forEach((ref) => {
        if (ref.current) {
            decreaseListItemDepth(editor, ref.current);
        }

        ref.unref();
    });
}
