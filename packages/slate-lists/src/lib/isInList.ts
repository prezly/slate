import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';

import type { ListsSchema } from '../types';

export function isInList(
    editor: SlateEditor,
    schema: ListsSchema,
    at: Location | null = editor.selection,
) {
    if (!at) {
        return false;
    }

    for (const [currentNode] of editor.levels({ at })) {
        if (schema.isListNode(currentNode)) {
            return true;
        }
    }

    return false;
}
