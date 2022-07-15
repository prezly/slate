import type { Location } from 'slate';
import { Editor } from 'slate';

import type { ListsEditor } from '../types';

export function isInList(editor: ListsEditor, location: Location | null = editor.selection) {
    if (!location) {
        return false;
    }

    for (const [currentNode] of Editor.levels(editor, { at: location })) {
        if (editor.isListNode(currentNode)) {
            return true;
        }
    }

    return false;
}
