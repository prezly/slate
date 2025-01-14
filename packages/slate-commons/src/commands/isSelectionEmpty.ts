import type { SlateEditor } from '@udecode/plate-common';
import { Range } from 'slate';

import { isSelectionValid } from './isSelectionValid';

export function isSelectionEmpty(editor: SlateEditor): boolean {
    if (!editor.selection || !isSelectionValid(editor)) {
        return true;
    }

    return Range.isCollapsed(editor.selection) && editor.string(editor.selection) === '';
}
