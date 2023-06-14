import type { Location } from 'slate';
import { Editor } from 'slate';

import type { ListsSchema } from '../types';

export function isInList(
    editor: Editor,
    schema: ListsSchema,
    location: Location | null = editor.selection,
) {
    if (!location) {
        return false;
    }

    for (const [currentNode] of Editor.levels(editor, { at: location })) {
        if (schema.isListNode(currentNode)) {
            return true;
        }
    }

    return false;
}
