import type { NodeEntry } from 'slate';
import { Editor } from 'slate';

import isSelectionValid from './isSelectionValid';

function getCurrentNodeEntry(editor: Editor): NodeEntry | null {
    if (!editor.selection || !isSelectionValid(editor)) {
        return null;
    }

    return Editor.node(editor, editor.selection, { depth: 1 });
}

export default getCurrentNodeEntry;
