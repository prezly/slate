import type { Node } from 'slate';
import { Editor } from 'slate';

import { isSelectionValid } from './isSelectionValid';

export function getCurrentNode(editor: Editor): Node | null {
    if (!editor.selection || !isSelectionValid(editor)) {
        return null;
    }

    const entry = Editor.node(editor, editor.selection, { depth: 1 });

    return entry ? entry[0] : null;
}
