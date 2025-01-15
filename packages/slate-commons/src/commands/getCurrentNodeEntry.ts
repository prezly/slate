import { type NodeEntry, type SlateEditor } from '@udecode/plate';

import { isSelectionValid } from './isSelectionValid';

export function getCurrentNodeEntry(editor: SlateEditor): NodeEntry | null {
    if (!editor.selection || !isSelectionValid(editor)) {
        return null;
    }

    return editor.api.node(editor.selection, { depth: 1 }) ?? null;
}
