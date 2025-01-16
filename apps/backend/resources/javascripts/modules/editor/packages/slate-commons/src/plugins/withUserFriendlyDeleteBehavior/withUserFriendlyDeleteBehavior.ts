/* eslint-disable no-param-reassign */
import type { SlateEditor } from '@udecode/plate-common';

import { saveSelection } from '../../commands';

import { deleteCurrentNodeIfEmpty } from './lib';

export function withUserFriendlyDeleteBehavior<T extends SlateEditor>(editor: T): T {
    const { deleteBackward, deleteForward } = editor;

    editor.deleteBackward = (unit) => {
        const previousBlockSelection = saveSelection(
            editor,
            (location) => editor.before(location) ?? location,
        );

        const isRemoved = deleteCurrentNodeIfEmpty(editor, { reverse: true, unit });

        if (isRemoved) {
            previousBlockSelection.restore(editor);
        } else {
            // The custom delete could not be applied, fall back to the default editor action.
            deleteBackward(unit);
        }
    };

    editor.deleteForward = (unit) => {
        const selectionBeforeDeleting = saveSelection(editor);

        const isRemoved = deleteCurrentNodeIfEmpty(editor, { reverse: false, unit });
        if (!isRemoved) {
            // The custom delete could not be applied, fall back to the default editor action.
            deleteForward(unit);
        }

        /**
         * On `deleteForward` (e.g. Delete key), the editor will focus the end of block above.
         * The expected behavior to focus the block after.
         * Reported here: https://github.com/prezly/prezly/pull/8239#discussion_r460074901
         *
         * The fix is to store the selection before removing and then restoring it.
         * This will ensure the cursor stays in the same location.
         */
        selectionBeforeDeleting.restore(editor);
    };

    return editor;
}
