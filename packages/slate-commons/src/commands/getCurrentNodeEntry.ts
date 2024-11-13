import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

import { isSelectionValid } from './isSelectionValid';

export function getCurrentNodeEntry(editor: SlateEditor): NodeEntry | null {
    if (!editor.selection || !isSelectionValid(editor)) {
        return null;
    }

    return editor.node(editor.selection, { depth: 1 });
}
