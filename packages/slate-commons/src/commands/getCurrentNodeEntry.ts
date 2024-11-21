import type { TNodeEntry} from '@udecode/plate-common';
import { getNodeEntry, type SlateEditor } from '@udecode/plate-common';

import { isSelectionValid } from './isSelectionValid';

export function getCurrentNodeEntry(editor: SlateEditor): TNodeEntry | null {
    if (!editor.selection || !isSelectionValid(editor)) {
        return null;
    }

    return getNodeEntry(editor, editor.selection, { depth: 1}) ?? null;
}
